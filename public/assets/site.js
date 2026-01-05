document.addEventListener('DOMContentLoaded', () => {
    const LANG_KEY = 'lang';
    const THEME_KEY = 'theme';

    const uiTranslations = {
        en: {
            skip: 'Skip to main content',
            navAria: 'Site navigation',
            home: 'Home',
            back: 'Back',
            backAria: 'Go back',
            docs: 'Docs',
            docsAria: 'Open documentation',
            themeAria: 'Toggle theme',
            langAria: 'Language',
            light: 'Light',
            dark: 'Dark'
        },
        pl: {
            skip: 'Przejdź do treści',
            navAria: 'Nawigacja',
            home: 'Start',
            back: 'Wstecz',
            backAria: 'Wróć',
            docs: 'Dokumentacja',
            docsAria: 'Otwórz dokumentację',
            themeAria: 'Przełącz motyw',
            langAria: 'Język',
            light: 'Jasny',
            dark: 'Ciemny'
        },
        fr: {
            skip: 'Aller au contenu principal',
            navAria: 'Navigation du site',
            home: 'Accueil',
            back: 'Retour',
            backAria: 'Revenir',
            docs: 'Docs',
            docsAria: 'Ouvrir la documentation',
            themeAria: 'Basculer le thème',
            langAria: 'Langue',
            light: 'Clair',
            dark: 'Sombre'
        },
        es: {
            skip: 'Saltar al contenido principal',
            navAria: 'Navegación del sitio',
            home: 'Inicio',
            back: 'Atrás',
            backAria: 'Volver',
            docs: 'Docs',
            docsAria: 'Abrir documentación',
            themeAria: 'Cambiar tema',
            langAria: 'Idioma',
            light: 'Claro',
            dark: 'Oscuro'
        },
        pt: {
            skip: 'Ir para o conteúdo principal',
            navAria: 'Navegação do site',
            home: 'Início',
            back: 'Voltar',
            backAria: 'Voltar',
            docs: 'Docs',
            docsAria: 'Abrir documentação',
            themeAria: 'Alternar tema',
            langAria: 'Idioma',
            light: 'Claro',
            dark: 'Escuro'
        },
        de: {
            skip: 'Zum Hauptinhalt springen',
            navAria: 'Seitennavigation',
            home: 'Start',
            back: 'Zurück',
            backAria: 'Zurück gehen',
            docs: 'Docs',
            docsAria: 'Dokumentation öffnen',
            themeAria: 'Theme umschalten',
            langAria: 'Sprache',
            light: 'Hell',
            dark: 'Dunkel'
        },
        uk: {
            skip: 'Перейти до основного вмісту',
            navAria: 'Навігація сайту',
            home: 'Головна',
            back: 'Назад',
            backAria: 'Повернутися назад',
            docs: 'Документи',
            docsAria: 'Відкрити документацію',
            themeAria: 'Перемкнути тему',
            langAria: 'Мова',
            light: 'Світла',
            dark: 'Темна'
        }
    };

    const normalizeLang = (raw) => {
        const l = (raw || '').toLowerCase();
        if (l === 'ua') return 'uk';
        return uiTranslations[l] ? l : 'en';
    };

    let lang = normalizeLang(localStorage.getItem(LANG_KEY));
    const storedThemeRaw = localStorage.getItem(THEME_KEY);
    let theme = (storedThemeRaw || '').toLowerCase();
    if (theme !== 'dark' && theme !== 'light') {
        theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? 'dark'
            : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', lang);

    const body = document.body;
    const pageName = body.dataset.pageName || document.title || 'Control Lab';
    const guide = body.dataset.guide;
    const home = body.dataset.home || './index.html';
    const labName = body.dataset.labName || 'Control Lab';
    const tags = (body.dataset.tags || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

    const getT = () => uiTranslations[lang] || uiTranslations.en;

    const nameTranslations = {
        lab: {
            en: 'Control Lab',
            pl: 'Laboratorium Sterowania',
            fr: 'Lab de Commande',
            es: 'Laboratorio de Control',
            pt: 'Laboratório de Controle',
            de: 'Regelungslabor',
            uk: 'Лабораторія керування'
        },
        page: {
            'Control Lab': {
                en: 'Control Lab',
                pl: 'Laboratorium Sterowania',
                fr: 'Lab de Commande',
                es: 'Laboratorio de Control',
                pt: 'Laboratório de Controle',
                de: 'Regelungslabor',
                uk: 'Лабораторія керування'
            },
            'PID Auto-Tuner': {
                en: 'PID Auto-Tuner',
                pl: 'Auto-strojenie PID',
                fr: 'Auto-réglage PID',
                es: 'Autoajuste PID',
                pt: 'Autoajuste PID',
                de: 'PID-Autotuning',
                uk: 'Автоналаштування PID'
            },
            'MIMO Decoupling': {
                en: 'MIMO Decoupling',
                pl: 'Rozsprzęganie MIMO',
                fr: 'Découplage MIMO',
                es: 'Desacoplo MIMO',
                pt: 'Desacoplamento MIMO',
                de: 'MIMO-Entkopplung',
                uk: 'Розв’язування MIMO'
            },
            'Inverted Pendulum LQR': {
                en: 'Inverted Pendulum LQR',
                pl: 'LQR dla wahadła odwróconego',
                fr: 'LQR pour pendule inversé',
                es: 'LQR para péndulo invertido',
                pt: 'LQR para pêndulo invertido',
                de: 'LQR für invertiertes Pendel',
                uk: 'LQR для перевернутого маятника'
            },
            'Robust H∞ Control': {
                en: 'Robust H∞ Control',
                pl: 'Sterowanie odporne H∞',
                fr: 'Commande robuste H∞',
                es: 'Control robusto H∞',
                pt: 'Controle robusto H∞',
                de: 'Robuste H∞-Regelung',
                uk: 'Робастне керування H∞'
            },
            'Autonomous Path Tracking': {
                en: 'Autonomous Path Tracking',
                pl: 'Autonomiczne śledzenie toru',
                fr: 'Suivi de trajectoire autonome',
                es: 'Seguimiento de trayectoria autónomo',
                pt: 'Rastreamento autônomo de trajetória',
                de: 'Autonome Pfadverfolgung',
                uk: 'Автономне відстеження траєкторії'
            },
            'Microgrid AI Manager': {
                en: 'Microgrid AI Manager',
                pl: 'Menedżer AI mikrosieci',
                fr: 'Gestionnaire IA de micro-réseau',
                es: 'Gestor IA de microrred',
                pt: 'Gerente de IA da microrrede',
                de: 'KI-Manager für Microgrid',
                uk: 'AI-менеджер мікромережі'
            },
            'Kalman Filter Visualizer': {
                en: 'Kalman Filter Visualizer',
                pl: 'Wizualizacja Filtru Kalmana',
                fr: 'Visualiseur de Filtre de Kalman',
                es: 'Visualizador de Filtro de Kalman',
                pt: 'Visualizador de Filtro de Kalman',
                de: 'Kalman-Filter Visualisierung',
                uk: 'Візуалізація фільтра Калмана'
            },
            'Sliding Mode Control': {
                en: 'Sliding Mode Control',
                pl: 'Sterowanie Ślizgowe (SMC)',
                fr: 'Commande par Mode Glissant',
                es: 'Control por Modo Deslizante',
                pt: 'Controle por Modo Deslizante',
                de: 'Gleitmodenregelung',
                uk: 'Ковзний режим керування'
            },
            'Model Reference Adaptive Control': {
                en: 'Model Reference Adaptive Control',
                pl: 'Adaptacyjne Sterowanie Modelowe',
                fr: 'Commande Adaptative à Modèle de Référence',
                es: 'Control Adaptativo por Modelo de Referencia',
                pt: 'Controle Adaptativo por Modelo de Referência',
                de: 'Modellreferenz-Adaptive Regelung',
                uk: 'Адаптивне керування з еталонною моделлю'
            }
        }
    };

    const translateLabName = () => {
        if (labName !== 'Control Lab') return labName;
        return nameTranslations.lab[lang] || nameTranslations.lab.en || labName;
    };

    const translatePageName = () => {
        const dict = nameTranslations.page[pageName];
        const t = dict?.[lang] || dict?.en;
        return t || pageName;
    };

    const setTheme = (nextTheme) => {
        theme = nextTheme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);

        const icons = {
            light: `<svg class="theme-icon" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`,
            dark: `<svg class="theme-icon" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`
        };

        const targetIcon = theme === 'dark' ? icons.light : icons.dark; // Show what it WILL become OR show current state? Usually show "Switch to X"
        // Conventional toggle: if Dark, show Sun (switch to light). If Light, show Moon (switch to dark).
        // Let's stick to showing the icon of the TARGET theme or the CURRENT one?
        // Button usually represents the action. "Switch to Light Mode" -> Sun icon.

        document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
            btn.innerHTML = targetIcon;
            btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });

        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    const setLang = (nextLang) => {
        lang = normalizeLang(nextLang);
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.setAttribute('lang', lang);

        const t = getT();

        document.querySelectorAll('[data-lang-select]').forEach(select => {
            if (select.value !== lang) select.value = lang;
            select.setAttribute('aria-label', t.langAria);
        });

        document.querySelectorAll('[data-i18n-ui]').forEach(el => {
            const key = el.getAttribute('data-i18n-ui');
            if (!key) return;
            if (t[key]) el.textContent = t[key];
        });

        document.querySelectorAll('[data-i18n-name="lab"]').forEach(el => {
            el.textContent = translateLabName();
        });

        document.querySelectorAll('[data-i18n-name="page"]').forEach(el => {
            el.textContent = translatePageName();
        });

        document.querySelectorAll('[data-i18n-ui-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-ui-aria');
            if (!key) return;
            if (t[key]) el.setAttribute('aria-label', t[key]);
        });

        const pageTranslations = window.PAGE_TRANSLATIONS;
        const baseDict = (pageTranslations && pageTranslations.en) || {};
        const targetDict = (pageTranslations && pageTranslations[lang]) || {};
        const pageDict = { ...baseDict, ...targetDict };

        const setText = (el, value) => {
            if (value === undefined || value === null) return;
            el.textContent = String(value);
        };

        const setHtml = (el, value) => {
            if (value === undefined || value === null) return;
            el.innerHTML = String(value);
        };

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            setText(el, pageDict[key]);
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (!key) return;
            setHtml(el, pageDict[key]);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;
            const v = pageDict[key];
            if (v !== undefined && v !== null) el.setAttribute('placeholder', String(v));
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (!key) return;
            const v = pageDict[key];
            if (v !== undefined && v !== null) el.setAttribute('title', String(v));
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (!key) return;
            const v = pageDict[key];
            if (v !== undefined && v !== null) el.setAttribute('aria-label', String(v));
        });

        document.querySelectorAll('option[data-i18n-option]').forEach(opt => {
            const key = opt.getAttribute('data-i18n-option');
            if (!key) return;
            setText(opt, pageDict[key]);
        });

        const onChange = window.PAGE_I18N_ONCHANGE;
        if (typeof onChange === 'function') {
            try {
                onChange(lang, pageDict);
            } catch (e) {
                // no-op
            }
        }

        if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
            window.MathJax.typesetPromise();
        }

        setTheme(theme);
        window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
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
    skip.setAttribute('data-i18n-ui', 'skip');
    skip.textContent = getT().skip;
    document.body.prepend(skip);

    const nav = document.createElement('nav');
    nav.className = 'lab-nav';
    nav.setAttribute('aria-label', getT().navAria);
    nav.setAttribute('data-i18n-ui-aria', 'navAria');
    // REMOVED: Home and Back buttons
    nav.innerHTML = `
        <div class="lab-brand">
            <span class="dot"></span>
            <a class="lab-brand-name" href="${home}" data-i18n-name="lab">${translateLabName()}</a>
            <span class="lab-divider">/</span>
            <span class="lab-current" data-i18n-name="page">${translatePageName()}</span>
        </div>
        <div class="lab-actions">
            <div class="pill ghost select-wrapper">
                <select data-lang-select aria-label="${getT().langAria}">
                    <option value="en">EN</option>
                    <option value="pl">PL</option>
                    <option value="fr">FR</option>
                    <option value="es">ES</option>
                    <option value="pt">PT</option>
                    <option value="de">DE</option>
                    <option value="uk">UK</option>
                </select>
            </div>
            <button class="pill ghost" type="button" data-theme-toggle data-i18n-ui-aria="themeAria" style="padding: 0 10px;"></button>
            ${guide ? `<a class="pill" href="${guide}" target="_blank" rel="noreferrer" data-i18n-ui="docs" data-i18n-ui-aria="docsAria" aria-label="${getT().docsAria}">${getT().docs}</a>` : ''}
        </div>
    `;

    nav.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        });
    });

    nav.querySelectorAll('[data-lang-select]').forEach(select => {
        select.value = lang;
        select.addEventListener('change', (e) => {
            setLang(e.target.value);
        });
    });

    document.body.prepend(nav);

    if (tags.length) {
        const tagBar = document.createElement('div');
        tagBar.className = 'lab-tagbar';
        tagBar.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        nav.after(tagBar);
    }

    // --- Markup & Modal Logic ---

    // Load marked.js for markdown parsing
    const loadMarked = () => {
        if (window.marked) return Promise.resolve(window.marked);
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            s.onload = () => resolve(window.marked);
            s.onerror = () => reject(new Error('Failed to load marked.js'));
            document.head.appendChild(s);
        });
    };

    const createModal = () => {
        let modal = document.getElementById('docs-modal');
        if (modal) return modal;

        const backdrop = document.createElement('div');
        backdrop.id = 'docs-modal';
        backdrop.className = 'modal-backdrop';
        backdrop.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 data-i18n="docs">Documentation</h2>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body" id="docs-body">
                    <div style="text-align:center; padding: 20px;">Loading...</div>
                </div>
            </div>
        `;

        // Close logic
        const close = () => {
            backdrop.classList.remove('open');
            setTimeout(() => {
                backdrop.style.display = 'none'; // fully hide after transition
            }, 300);
        };

        backdrop.querySelector('.modal-close').addEventListener('click', close);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) close();
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
        });

        document.body.appendChild(backdrop);
        return backdrop;
    };

    const openDocs = async (url) => {
        const modal = createModal();
        const body = modal.querySelector('#docs-body');

        modal.style.display = 'flex';
        // Force reflow
        void modal.offsetWidth;
        modal.classList.add('open');
        body.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--text-light);">Loading documentation...</div>';

        let targetUrl = url;
        // Attempt localization if not English
        if (lang !== 'en') {
            const parts = url.split('.');
            if (parts.length > 1) {
                const ext = parts.pop();
                targetUrl = parts.join('.') + '.' + lang + '.' + ext;
            }
        }

        try {
            const [marked, response] = await Promise.all([
                loadMarked(),
                fetch(targetUrl).then(res => {
                    if (res.ok) return res;
                    // Fallback to default if localized fails and we tried a localized one
                    if (targetUrl !== url) {
                        console.warn(`Localized docs not found for ${targetUrl}, falling back to ${url}`);
                        return fetch(url);
                    }
                    throw new Error('Failed to load documentation');
                })
            ]);

            if (!response.ok) throw new Error('Failed to load documentation');
            const text = await response.text();

            // Basic Markdown Parsing
            body.innerHTML = marked.parse(text);

            // Trigger MathJax if present
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([body]);
            }
        } catch (err) {
            body.innerHTML = `<div style="color: var(--error); padding: 20px;">Error loading docs: ${err.message}</div>`;
        }
    };

    // Global listener for Docs links
    // Intercepts:
    // 1. data-i18n-ui="docs" (Nav button)
    // 2. data-i18n="readGuide" (Project index button)
    // 3. Any link ending in .md
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        const isDocsLink = anchor.getAttribute('data-i18n-ui') === 'docs'
            || anchor.getAttribute('data-i18n') === 'readGuide'
            || href.endsWith('.md');

        if (isDocsLink && !anchor.hasAttribute('data-no-modal')) {
            e.preventDefault();
            openDocs(href);
        }
    });

    // Sync labels and emit initial themechange.
    setTheme(theme);
    setLang(lang);
});
