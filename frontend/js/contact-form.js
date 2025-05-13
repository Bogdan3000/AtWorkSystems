document.addEventListener('DOMContentLoaded', () => {
    const categoriesSelect = document.getElementById('categories');
    const subcategoriesContainer = document.getElementById('subcategories');
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    let translations = {};
    let currentLang = 'en'; // Default language

    // Subcategories mapping to their translation keys
    const subcategoriesData = {
        salg: [
            { value: 'markedsforing', key: 'subsection_markedsforing' },
            { value: 'prospekter', key: 'subsection_prospekter' },
            { value: 'crm', key: 'subsection_crm' },
            { value: 'foresporsel', key: 'subsection_foresporsel' },
            { value: 'tilbud', key: 'subsection_tilbud' },
            { value: 'kpiSales', key: 'subsection_kpiSales' },
            { value: 'salgordre', key: 'subsection_salgordre' },
            { value: 'kundekontakt', key: 'subsection_kundekontakt' }
        ],
        innkjop: [
            { value: 'revisjoner', key: 'subsection_revisjoner' },
            { value: 'innkjopsordre', key: 'subsection_innkjopsordre' },
            { value: 'ordrebekreftelse', key: 'subsection_ordrebekreftelse' },
            { value: 'leverandorforhold', key: 'subsection_leverandorforhold' },
            { value: 'diversebilag', key: 'subsection_diversebilag' },
            { value: 'kpiInnkjoo', key: 'subsection_kpiInnkjoo' }
        ],
        produksjon: [
            { value: 'prosjekter', key: 'subsection_prosjekter' },
            { value: 'hms', key: 'subsection_hms' },
            { value: 'kpiProduksjon', key: 'subsection_kpiProduksjon' },
            { value: 'undersokelser', key: 'subsection_undersokelser' },
            { value: 'transport', key: 'subsection_transport' }
        ],
        ressurser: [
            { value: 'resourcePlanning', key: 'subsection_resourcePlanning' },
            { value: 'biler', key: 'subsection_biler' },
            { value: 'eiendommer', key: 'subsection_eiendommer' }
        ],
        lager: [
            { value: 'varer', key: 'subsection_varer' },
            { value: 'varemottak', key: 'subsection_varemottak' },
            { value: 'fraktbrev', key: 'subsection_fraktbrev' },
            { value: 'plukkliste', key: 'subsection_plukkliste' },
            { value: 'lager', key: 'subsection_lager' }
        ],
        personel: [
            { value: 'tidrapportering', key: 'subtitle_tidrapportering' },
            { value: 'kjorebok', key: 'subsection_kjorebok' },
            { value: 'ansatte', key: 'subsection_ansatte' },
            { value: 'kpiTid', key: 'subsection_kpiTid' },
            { value: 'todoList', key: 'subsection_todoList' }
        ]
    };

    // Load translations based on language
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/translations/${lang}.json`);
            translations = await response.json();
            currentLang = lang;
            applyTranslations();
            updateSubcategories();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Apply translations to elements with data-i18n
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        // Update tooltips for subcategories
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltip => {
            const key = tooltip.dataset.tooltipKey;
            if (translations[`${key}_description`]) {
                tooltip.setAttribute('data-bs-title', translations[`${key}_description`]);
            }
        });
    }

    // Update subcategories based on selected categories
    function updateSubcategories() {
        const selectedCategories = Array.from(categoriesSelect.selectedOptions).map(option => option.value);
        subcategoriesContainer.innerHTML = '';

        selectedCategories.forEach(category => {
            if (subcategoriesData[category]) {
                const div = document.createElement('div');
                div.className = 'mb-3 animate__animated animate__fadeIn';
                div.innerHTML = `
                    <label class="form-label" data-i18n="${category}_subcategories">${translations[`${category}_subcategories`] || category.charAt(0).toUpperCase() + category.slice(1)} Subcategories</label>
                    <select multiple class="form-control" name="${category}_subcategories">
                        ${subcategoriesData[category].map(sub => `
                            <option value="${sub.value}" data-i18n="${sub.key}" data-bs-toggle="tooltip" data-bs-title="${translations[`${sub.key}_description`] || ''}" data-tooltip-key="${sub.key}">
                                ${translations[sub.key] || sub.value}
                            </option>
                        `).join('')}
                    </select>
                `;
                subcategoriesContainer.appendChild(div);
            }
        });

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });

        applyTranslations();
    }

    // Form validation and submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            formMessage.innerHTML = `
                <div class="alert alert-success animate__animated animate__fadeIn" data-i18n="form_success">
                    ${translations.form_success || 'Form submitted successfully! We\'ll get back to you soon.'}
                </div>
            `;
            form.reset();
            subcategoriesContainer.innerHTML = '';
        } else {
            formMessage.innerHTML = `
                <div class="alert alert-danger animate__animated animate__fadeIn" data-i18n="form_error">
                    ${translations.form_error || 'Please fill out all required fields.'}
                </div>
            `;
        }
        form.classList.add('was-validated');
    });

    // Update subcategories when categories change
    categoriesSelect.addEventListener('change', updateSubcategories);

    // Handle language change
    document.querySelectorAll('.language-select').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.dataset.lang;
            document.querySelector('.language-select.active')?.classList.remove('active');
            link.classList.add('active');
            loadTranslations(lang);
        });
    });

    // Initial load of translations
    const activeLang = document.querySelector('.language-select.active')?.dataset.lang || 'en';
    loadTranslations(activeLang);
});