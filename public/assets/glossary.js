/**
 * Control Engineering Glossary
 * Automatically highlights key terms and adds tooltips.
 */

const GLOSSARY = {
    'PID': {
        term: 'PID',
        def: 'Proportional-Integral-Derivative controller. The most common feedback mechanism.',
        link: 'https://en.wikipedia.org/wiki/PID_controller'
    },
    'LQR': {
        term: 'LQR',
        def: 'Linear-Quadratic Regulator. Optimal control minimizing a cost function of state error and energy.',
        link: 'https://en.wikipedia.org/wiki/Linear%E2%80%93quadratic_regulator'
    },
    'MPC': {
        term: 'MPC',
        def: 'Model Predictive Control. Optimizes future control inputs over a finite time horizon.',
        link: 'https://en.wikipedia.org/wiki/Model_predictive_control'
    },
    'MIMO': {
        term: 'MIMO',
        def: 'Multiple-Input Multiple-Output. Systems with multiple actuators and sensors.',
        link: 'https://en.wikipedia.org/wiki/MIMO'
    },
    'Siso': {
        term: 'SISO',
        def: 'Single-Input Single-Output. The simplest control loop structure.'
    },
    'H∞': {
        term: 'H∞',
        def: 'H-infinity methods. Robust control minimizing the worst-case effect of disturbances.'
    },
    'Robust Control': {
        term: 'Robust Control',
        def: 'Control design that works properly even if the system model is uncertain or has errors.'
    },
    'Kalman Filter': {
        term: 'Kalman Filter',
        def: 'Optimal estimator that infers parameters from indirect, noisy measurements.'
    },
    'State Space': {
        term: 'State Space',
        def: 'Mathematical model representing a system as a set of input, output and state variables.'
    },
    'Decoupling': {
        term: 'Decoupling',
        def: 'Technique to transform a MIMO system into independent SISO loops.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other content to load if needed
    setTimeout(applyGlossary, 500);
});

function applyGlossary() {
    const content = document.getElementById('main-content');
    if (!content) return;

    // We only want to touch text nodes inside paragraphs, lists, descriptions
    const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                // Skip if already inside a glossary link or script/style
                if (node.parentElement.closest('a, script, style, .glossary-term')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
        nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(node => {
        let text = node.nodeValue;
        let modified = false;

        // Simple check for terms
        // We sort keys by length descending to match "Robust Control" before "Control" (if we had it)
        const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

        // This is a naive replacement strategy. For production, use a more robust tokenizer.
        // We wrap matches in a special span.
        for (const key of keys) {
            const regex = new RegExp(`\\b(${key})\\b`, 'gi');
            if (regex.test(text)) {
                // We found a match, but we can't easily replace inside the text node repeatedly
                // without destroying the node. So we mark this node for replacement.
                // For simplicity in this static site, let's just replace the first occurrence per node
                // or all occurrences if we're careful.
                // Let's rely on a helper that splits the node.
                modified = true;
                break;
            }
        }

        if (modified) {
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;

            // Re-scan to find actual matches in order
            // This is complex for multiple terms. Let's try a simpler approach: 
            // Replace HTML of the parent element? No, too risky with event listeners.
            // Let's replace the text node with a span containing the HTML.

            const span = document.createElement('span');
            let html = text;

            keys.forEach(key => {
                const term = GLOSSARY[key];
                // Use a placeholder to avoid double replacement
                const uuid = 'GLOSS_' + Math.random().toString(36).substr(2, 9);
                const regex = new RegExp(`\\b(${key})\\b`, 'gi');

                html = html.replace(regex, (match) => {
                    return `<span class="glossary-term" data-term="${key}" tabindex="0">${match}</span>`;
                });
            });

            if (html !== text) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = html;
                node.parentNode.replaceChild(wrapper, node);
            }
        }
    });

    // Add tooltip container
    let tooltip = document.getElementById('glossary-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'glossary-tooltip';
        tooltip.className = 'glossary-tooltip';
        document.body.appendChild(tooltip);
    }

    // Event listeners
    document.querySelectorAll('.glossary-term').forEach(el => {
        el.addEventListener('mouseenter', (e) => showTooltip(e, tooltip));
        el.addEventListener('mouseleave', () => hideTooltip(tooltip));
        el.addEventListener('focus', (e) => showTooltip(e, tooltip)); // accessibility
        el.addEventListener('blur', () => hideTooltip(tooltip));
    });
}

function showTooltip(e, tooltip) {
    const key = Object.keys(GLOSSARY).find(k => k.toLowerCase() === e.target.getAttribute('data-term').toLowerCase());
    if (!key) return;

    const entry = GLOSSARY[key];
    tooltip.innerHTML = `<strong>${entry.term}</strong><p>${entry.def}</p>`;

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 5) + 'px';
    tooltip.classList.add('visible');
}

function hideTooltip(tooltip) {
    tooltip.classList.remove('visible');
}
