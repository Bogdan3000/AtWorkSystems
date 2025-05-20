import { i18n } from './i18n.js';
import { loadComponent } from './components.js';

window.i18n = i18n;
window.loadComponent = loadComponent;

import { sections } from './sections.js'; // можно вынести sections отдельно

function updateSidebarAndContent(sectionKey) {
    const section = sections[sectionKey];
    if (!section) return;

    const sidebarContent = document.getElementById('sidebar-content');
    const mainContent = document.getElementById('main-content-area');

    sidebarContent.innerHTML = `
    <h4 data-i18n="${section.title}"></h4>
    <div class="d-flex flex-column gap-1">
      ${Object.entries(section.subsections).map(([key, val]) => `
        <button class="btn btn-subsection d-flex align-items-center gap-2" data-subsection="${key}">
          <i class="fas ${val.icon}"></i>
          <span data-i18n="${val.title}"></span>
        </button>
      `).join('')}
    </div>
  `;

    mainContent.innerHTML = `
    <div class="row animate__animated animate__fadeIn" id="${sectionKey}-content">
      <div class="col-md-12">
        <h2 data-i18n="${section.title}"></h2>
        <p>Select a subsection to view details.</p>
      </div>
    </div>
  `;

    i18n.applyTranslations();

    const buttons = sidebarContent.querySelectorAll('.btn-subsection');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-subsection');
            const subsection = section.subsections[key];

            fetch(subsection.file)
                .then(res => res.text())
                .then(html => {
                    mainContent.innerHTML = `
            <div class="row animate__animated animate__fadeIn">
              <div class="col-md-12">
                <h2 data-i18n="${subsection.title}"></h2>
                ${html}
              </div>
            </div>
          `;
                    i18n.applyTranslations();
                });

            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'nob';

    i18n.loadLanguage(lang).then(() => {
        return Promise.all([
            loadComponent('/components.html', '#navbar', 'nav'),
            loadComponent('/components.html', '#footer', 'footer')
        ]);
    }).then(() => {
        i18n.applyTranslations();

        const navCards = document.querySelectorAll('.nav-card');
        navCards.forEach(card => {
            card.addEventListener('click', () => {
                const section = card.getAttribute('data-section');
                updateSidebarAndContent(section);
                navCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });

        if (navCards.length > 0) {
            navCards[0].click(); // Load default
        }
    });
});
