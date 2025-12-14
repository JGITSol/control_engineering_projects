import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.resolve(ROOT, 'audit', new Date().toISOString().slice(0, 10));

const PAGES = [
  { name: 'home', file: 'index.html' },
  { name: 'project1', file: 'project1/index.html' },
  { name: 'project2', file: 'project2/index.html' },
  { name: 'project3', file: 'project3/index.html' },
  { name: 'project4', file: 'project4/index.html' },
  { name: 'project5', file: 'project5/index.html' },
  { name: 'project6', file: 'project6/index.html' },
];

const MIME = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/plain; charset=utf-8'],
  ['.ico', 'image/x-icon'],
]);

function safePath(requestPath) {
  const decoded = decodeURIComponent(requestPath.split('?')[0]);
  const clean = decoded.replace(/^\/+/, '');
  const resolved = path.resolve(ROOT, clean);
  if (!resolved.startsWith(ROOT)) return null;
  return resolved;
}

function serveStatic() {
  const server = createServer((req, res) => {
    const reqUrl = req.url || '/';
    const filePath = safePath(reqUrl === '/' ? '/index.html' : reqUrl);
    if (!filePath) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME.get(ext) || 'application/octet-stream';
    try {
      const buf = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-store' });
      res.end(buf);
    } catch {
      res.writeHead(500);
      res.end('Server error');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({
        server,
        baseUrl: `http://127.0.0.1:${address.port}`,
      });
    });
  });
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function auditPage(page, { url: pageUrl, name, theme }) {
  await page.addInitScript(({ themeKey, themeValue }) => {
    localStorage.setItem(themeKey, themeValue);
  }, { themeKey: 'theme', themeValue: theme });

  await page.goto(pageUrl, { waitUntil: 'networkidle' });

  // Ensure theme applied.
  await page.waitForTimeout(150);

  const result = await page.evaluate(() => {
    const docTheme = document.documentElement.getAttribute('data-theme') || '';
    const bodyStyle = getComputedStyle(document.body);
    const rootStyle = getComputedStyle(document.documentElement);

    const pick = (prop) => rootStyle.getPropertyValue(prop).trim();

    // Quick heuristics: look for obvious inline hardcoded colors in computed styles.
    const suspicious = [];
    const nodes = Array.from(document.querySelectorAll('*'))
      .slice(0, 2000); // cap for speed

    for (const el of nodes) {
      const cs = getComputedStyle(el);
      const bg = cs.backgroundColor;
      const color = cs.color;
      // If background is pure white/near-white in dark theme, flag.
      // If text is very light in light theme, flag.
      // (Heuristic only.)
      if (docTheme === 'dark') {
        if (bg === 'rgb(255, 255, 255)' || bg === 'rgba(255, 255, 255, 1)') {
          suspicious.push({ type: 'white-bg-in-dark', tag: el.tagName.toLowerCase(), className: el.className || '' });
          if (suspicious.length > 20) break;
        }
      }
      if (docTheme === 'light') {
        if (color === 'rgb(226, 232, 240)' || color === 'rgb(229, 241, 255)') {
          suspicious.push({ type: 'light-text-in-light', tag: el.tagName.toLowerCase(), className: el.className || '' });
          if (suspicious.length > 20) break;
        }
      }
    }

    return {
      docTheme,
      body: {
        backgroundColor: bodyStyle.backgroundColor,
        backgroundImage: bodyStyle.backgroundImage,
        color: bodyStyle.color,
      },
      tokens: {
        surface: pick('--surface'),
        cardBg: pick('--card-bg'),
        textMain: pick('--text-main'),
        textLight: pick('--text-light'),
        border: pick('--border'),
      },
      suspicious,
    };
  });

  const screenshotPath = path.join(OUT_DIR, `${name}.${theme}.png`);
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.waitForTimeout(100);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return { name, theme, url: pageUrl, ...result, screenshot: screenshotPath };
}

async function main() {
  await ensureDir(OUT_DIR);

  const { server, baseUrl } = await serveStatic();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: 'en-US',
    colorScheme: 'light',
  });
  const page = await context.newPage();

  const results = [];
  for (const p of PAGES) {
    for (const theme of ['light', 'dark']) {
      const pageUrl = `${baseUrl}/${p.file}`;
      // eslint-disable-next-line no-console
      console.log(`Capturing ${p.name} (${theme}) -> ${pageUrl}`);
      results.push(await auditPage(page, { url: pageUrl, name: p.name, theme }));
    }
  }

  await browser.close();
  server.close();

  const reportPath = path.join(OUT_DIR, 'report.json');
  await mkdir(path.dirname(reportPath), { recursive: true });
  await import('node:fs/promises').then(fs => fs.writeFile(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    baseUrl,
    pages: results,
  }, null, 2), 'utf-8'));

  // Convenience: list outputs
  const files = await readdir(OUT_DIR);
  // eslint-disable-next-line no-console
  console.log(`\nSaved to: ${OUT_DIR}`);
  // eslint-disable-next-line no-console
  console.log(files.map(f => `- ${f}`).join('\n'));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
