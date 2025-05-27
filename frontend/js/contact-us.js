import { i18n } from './i18n.js';
import { loadComponent } from './components.js';
import { sections } from './sections.js';

// Initialize navbar and footer
async function initializeComponents() {
    try {
        await Promise.all([
            loadComponent('/components.html', '#navbar', 'nav'),
            loadComponent('/components.html', '#footer', 'footer')
        ]);
        i18n.applyTranslations();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Populate categories and subsections
function populateCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    const subcategoriesContainer = document.getElementById('subcategories-container');
    const selectedTopics = document.getElementById('selected-topics');

    // Store selected subsections to preserve state
    let selectedSubcategories = new Set();

    // Populate categories as toggleable buttons
    function renderCategories() {
        categoriesContainer.innerHTML = Object.entries(sections).map(([sectionKey, section]) => `
            <button type="button" class="category-button" data-section="${sectionKey}" data-i18n="${section.title}">
                ${i18n.translations[section.title] || section.title}
            </button>
        `).join('');
    }

    // Update subcategories based on selected categories
    function updateSubcategories() {
        const selectedCategories = Array.from(categoriesContainer.querySelectorAll('.category-button.active')).map(button => button.getAttribute('data-section'));

        // Preserve current selections
        const currentSelections = new Set();
        document.querySelectorAll('input[name="subcategories"]:checked').forEach(checkbox => {
            currentSelections.add(`${checkbox.getAttribute('data-section')}:${checkbox.getAttribute('data-subsection')}`);
        });
        selectedSubcategories = new Set([...selectedSubcategories, ...currentSelections]);

        subcategoriesContainer.innerHTML = selectedCategories.map(sectionKey => {
            const section = sections[sectionKey];
            return `
                <div class="subcategory-group">
                    <label class="subcategory-label" data-i18n="${section.title}">${i18n.translations[section.title] || section.title}</label>
                    <div class="subcategory-list">
                        ${Object.entries(section.subsections).map(([subKey, sub]) => {
                const isChecked = selectedSubcategories.has(`${sectionKey}:${subKey}`) ? 'checked' : '';
                return `
                                <label class="subcategory-item">
                                    <input type="checkbox" name="subcategories" value="${subKey}" class="subcategory-checkbox" data-section="${sectionKey}" data-subsection="${subKey}" ${isChecked}>
                                    <i class="fas ${sub.icon}"></i>
                                    <span data-i18n="${sub.title}">${i18n.translations[sub.title] || sub.title}</span>
                                </label>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }).join('');

        i18n.applyTranslations();
        updateSelectedTopics();
    }

    // Update selected topics display
    function updateSelectedTopics() {
        const selectedCategories = Array.from(categoriesContainer.querySelectorAll('.category-button.active')).map(button => i18n.translations[button.getAttribute('data-i18n')] || button.getAttribute('data-section'));
        const selectedSubcategoriesArray = Array.from(document.querySelectorAll('input[name="subcategories"]:checked')).map(checkbox => {
            const sectionKey = checkbox.getAttribute('data-section');
            const subKey = checkbox.getAttribute('data-subsection');
            return i18n.translations[sections[sectionKey].subsections[subKey].title] || subKey;
        });
        const allSelected = [...selectedCategories, ...selectedSubcategoriesArray];
        selectedTopics.innerHTML = allSelected.length > 0
            ? `<span data-i18n="contact.selectedTopics">Selected Topics:</span> ${allSelected.join(', ')}`
            : '';
    }

    // Event listeners for category buttons
    categoriesContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.category-button');
        if (!button) return;
        button.classList.toggle('active');
        updateSubcategories();
    });

    // Event listener for subcategory changes
    subcategoriesContainer.addEventListener('change', (e) => {
        const checkbox = e.target;
        const key = `${checkbox.getAttribute('data-section')}:${checkbox.getAttribute('data-subsection')}`;
        if (checkbox.checked) {
            selectedSubcategories.add(key);
        } else {
            selectedSubcategories.delete(key);
        }
        updateSelectedTopics();
    });

    // Initial render
    renderCategories();
    updateSubcategories();

    // Return refresh function for language changes
    return { refresh: () => {
            renderCategories();
            updateSubcategories();
        }};
}

// Form validation
function validateForm() {
    let isValid = true;
    const fields = [
        { id: 'first-name', errorId: 'first-name-error', condition: val => val.trim() === '' },
        { id: 'last-name', errorId: 'last-name-error', condition: val => val.trim() === '' },
        { id: 'email', errorId: 'email-error', condition: val => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
        { id: 'phone', errorId: 'phone-error', condition: val => val.trim() === '' },
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.errorId);
        if (field.condition(input.value)) {
            error.classList.remove('hidden');
            input.classList.add('form-input-error');
            isValid = false;
        } else {
            error.classList.add('hidden');
            input.classList.remove('form-input-error');
        }
    });

    const categoriesChecked = document.querySelectorAll('.category-button.active, input[name="subcategories"]:checked').length > 0;
    const categoriesError = document.getElementById('categories-error');
    if (!categoriesChecked) {
        categoriesError.classList.remove('hidden');
        isValid = false;
    } else {
        categoriesError.classList.add('hidden');
    }

    return isValid;
}

// Form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData(e.target);
    const selectedCategories = Array.from(document.querySelectorAll('.category-button.active')).map(button => button.getAttribute('data-section'));
    const data = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        categories: selectedCategories,
        subcategories: formData.getAll('subcategories'),
    };

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        e.target.reset();
        document.querySelectorAll('.category-button.active').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.form-input-error').forEach(el => el.classList.remove('form-input-error'));
        document.querySelectorAll('.form-error').forEach(el => el.classList.add('hidden'));
        document.getElementById('subcategories-container').innerHTML = '';
        document.getElementById('selected-topics').innerHTML = '';
        const successMessage = document.getElementById('form-success');
        successMessage.classList.remove('hidden');
        setTimeout(() => successMessage.classList.add('hidden'), 5000);
    } catch (error) {
        console.error('Form submission error:', error);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await i18n.loadLanguage(localStorage.getItem('lang') || 'nob');
        await initializeComponents();
        const { refresh } = populateCategories();

        // Listen for language changes
        document.addEventListener('click', async (e) => {
            const langSwitch = e.target.closest('.lang-switch');
            if (langSwitch) {
                const lang = langSwitch.getAttribute('data-lang');
                try {
                    await i18n.loadLanguage(lang);
                    i18n.applyTranslations();
                    refresh(); // Refresh categories and subsections with new language
                } catch (error) {
                    console.error('Error switching language:', error);
                }
            }
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});