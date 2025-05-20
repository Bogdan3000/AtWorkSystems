const i18n = {
    lang: 'nob',
    translations: {},

    async loadLanguage(lang = 'nob') {
        this.lang = lang;
        localStorage.setItem('lang', lang);
        const res = await fetch(`/lang/${lang}.json`);
        if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
        this.translations = await res.json();
        this.applyTranslations();
    },

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.translations[key];
            if (text) el.innerHTML = text;
        });
    }
};
