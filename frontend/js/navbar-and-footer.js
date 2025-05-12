document.addEventListener("DOMContentLoaded", function() {
    loadHTML("#navbar", "/navbar.html");
    loadHTML("#footer", "/footer.html");
});

function loadHTML(selector, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch(error => console.error("Error loading HTML:", error));
}