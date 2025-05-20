import { i18n } from './i18n.js';

const componentCache = {};

export async function loadComponent(file, targetSelector, elementTag) {
    if (componentCache[file]) {
        renderComponent(componentCache[file], targetSelector, elementTag);
        return;
    }

    const res = await fetch(file);
    const html = await res.text();
    componentCache[file] = html;
    renderComponent(html, targetSelector, elementTag);
}

function renderComponent(html, targetSelector, elementTag) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const element = temp.querySelector(elementTag);
    if (!element) return;

    document.querySelector(targetSelector).innerHTML = element.outerHTML;
    i18n.applyTranslations();

    if (elementTag === 'nav') {
        document.querySelectorAll('.language-select').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                i18n.loadLanguage(lang);
                localStorage.setItem('lang', lang);
                document.querySelectorAll('.language-select').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        const currentLang = localStorage.getItem('lang') || 'nob';
        document.querySelectorAll('.language-select').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-lang') === currentLang);
        });
    }
}
