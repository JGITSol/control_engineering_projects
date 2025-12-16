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

        const t = getT();
        const label = theme === 'dark' ? t.light : t.dark;
        document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
            btn.textContent = label;
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
        const pageDict = (pageTranslations && (pageTranslations[lang] || pageTranslations.en)) || {};

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
    nav.innerHTML = `
        <div class="lab-brand">
            <span class="dot"></span>
            <a class="lab-brand-name" href="${home}" data-i18n-name="lab">${translateLabName()}</a>
            <span class="lab-divider">/</span>
            <span class="lab-current" data-i18n-name="page">${translatePageName()}</span>
        </div>
        <div class="lab-actions">
            <a class="pill" href="${home}" data-i18n-ui="home">${getT().home}</a>
            <button class="pill ghost" type="button" data-nav-back data-i18n-ui="back" data-i18n-ui-aria="backAria" aria-label="${getT().backAria}">${getT().back}</button>
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
            <button class="pill ghost" type="button" data-theme-toggle data-i18n-ui-aria="themeAria" aria-label="${getT().themeAria}">${theme === 'dark' ? getT().light : getT().dark}</button>
            ${guide ? `<a class="pill" href="${guide}" target="_blank" rel="noreferrer" data-i18n-ui="docs" data-i18n-ui-aria="docsAria" aria-label="${getT().docsAria}">${getT().docs}</a>` : ''}
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

    // Sync labels and emit initial themechange.
    setTheme(theme);
    setLang(lang);
});
