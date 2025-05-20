// Объект для кэширования загруженных компонентов
const componentCache = {};

// Загружает компоненты при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("/components.html", "#navbar", "nav");
    loadComponent("/components.html", "#footer", "footer");
});

// Асинхронная функция для загрузки компонента
async function loadComponent(file, targetSelector, elementTag) {
    try {
        // Проверяем, есть ли компонент в кэше
        if (componentCache[file]) {
            renderComponent(componentCache[file], targetSelector, elementTag);
            return;
        }

        // Загружаем файл, если его нет в кэше
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const html = await response.text();

        // Кэшируем результат
        componentCache[file] = html;
        renderComponent(html, targetSelector, elementTag);
    } catch (error) {
        console.error(`Error loading component from ${file}:`, error);
    }
}

// Рендерит компонент в указанный элемент
function renderComponent(html, targetSelector, elementTag) {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const element = temp.querySelector(elementTag);
    if (element) {
        document.querySelector(targetSelector).innerHTML = element.outerHTML;
    } else {
        console.error(`Element <${elementTag}> not found`);
    }
}