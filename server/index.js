const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

// Обслуживание статических файлов React (после сборки)
app.use(express.static(path.resolve(__dirname, "../build")));


// Пример простого API маршрута
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from API" });
});

// Универсальный маршрут (React Router)
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
