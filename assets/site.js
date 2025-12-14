document.addEventListener('DOMContentLoaded', () => {
    const THEME_KEY = 'theme';
    const storedThemeRaw = localStorage.getItem(THEME_KEY);
    let theme = (storedThemeRaw || '').toLowerCase();
    if (theme !== 'dark' && theme !== 'light') {
        theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? 'dark'
            : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);

    const body = document.body;
    const pageName = body.dataset.pageName || document.title || 'Control Lab';
    const guide = body.dataset.guide;
    const home = body.dataset.home || './index.html';
    const labName = body.dataset.labName || 'Control Lab';
    const tags = (body.dataset.tags || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

    const setTheme = (nextTheme) => {
        theme = nextTheme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);

        const label = theme === 'dark' ? 'Light' : 'Dark';
        document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
            btn.textContent = label;
        });

        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    const ensureMainTarget = () => {
        const existing = document.getElementById('main-content');
        if (existing) return existing;

        const candidate = document.querySelector('main')
            || document.querySelector('.lab-shell')
            || document.querySelector('.container')
            || document.querySelector('body > *');

        if (!candidate) return null;

        candidate.id = 'main-content';
        if (candidate.tagName.toLowerCase() !== 'main') {
            candidate.setAttribute('role', 'main');
        }
        if (!candidate.hasAttribute('tabindex')) {
            candidate.setAttribute('tabindex', '-1');
        }
        return candidate;
    };

    ensureMainTarget();

    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    document.body.prepend(skip);

    const nav = document.createElement('nav');
    nav.className = 'lab-nav';
    nav.setAttribute('aria-label', 'Site navigation');
    nav.innerHTML = `
        <div class="lab-brand">
            <span class="dot"></span>
            <a class="lab-brand-name" href="${home}">${labName}</a>
            <span class="lab-divider">/</span>
            <span class="lab-current">${pageName}</span>
        </div>
        <div class="lab-actions">
            <a class="pill" href="${home}">Home</a>
            <button class="pill ghost" type="button" data-nav-back aria-label="Go back">Back</button>
            <button class="pill ghost" type="button" data-theme-toggle aria-label="Toggle theme">${theme === 'dark' ? 'Light' : 'Dark'}</button>
            ${guide ? `<a class="pill" href="${guide}" target="_blank" rel="noreferrer">Docs</a>` : ''}
        </div>
    `;

    const backButtons = nav.querySelectorAll('[data-nav-back]');
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = home;
            }
        });
    });

    nav.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        });
    });

    document.body.prepend(nav);

    if (tags.length) {
        const tagBar = document.createElement('div');
        tagBar.className = 'lab-tagbar';
        tagBar.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        nav.after(tagBar);
    }

    // Sync labels and emit initial themechange.
    setTheme(theme);
});
