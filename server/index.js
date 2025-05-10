// server/index.js

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const { exec } = require("child_process");
require("dotenv").config(); // Поддержка .env файла

const app = express();
const PORT = process.env.PORT || 5000;
const PROJECT_PATH = process.env.PROJECT_PATH || path.resolve(__dirname, "../");

app.use(helmet());
app.use(express.json()); // Для обработки JSON данных из вебхука

// Обслуживание статических файлов React (после сборки)
app.use(express.static(path.resolve(PROJECT_PATH, "build")));

// Пример простого API маршрута
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from API" });
});

// Вебхук для автообновления
app.post("/webhook", (req, res) => {
    const payload = req.body;

    // Проверяем, что это push-эвент
    if (payload.ref === "refs/heads/main") {
        console.log("Получен push, выполняю обновление...");

        // Выполняем команды pull и перезапуск сервера
        exec(`cd ${PROJECT_PATH} && git pull && npm install && npm run start:prod`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Ошибка: ${error.message}`);
                res.status(500).send("Ошибка при выполнении команды.");
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                res.status(500).send("Ошибка при выполнении команды.");
                return;
            }

            console.log(`stdout: ${stdout}`);
            res.status(200).send("Обновление завершено.");
        });
    } else {
        res.status(200).send("Это не push на главную ветку.");
    }
});

// Универсальный маршрут (React Router)
app.use((req, res, next) => {
    res.sendFile(path.resolve(PROJECT_PATH, "build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
