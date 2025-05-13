require('dotenv').config(); // Загружаем .env файл

const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();

// Настройка статики (исправленный путь)
app.use(express.static(path.join(__dirname, '../frontend')));

// Маршрут главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Маршрут API
app.get('/api/hello', (req, res) => {
    res.json({ message: "Hi, from API!" });
});

// Маршрут Webhook для Git
app.post('/webhook', express.json(), (req, res) => {
    const branch = req.body.ref;
    if (branch === 'refs/heads/master') {
        exec('git pull && npm install && pm2 restart app', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return res.status(500).json({ message: "Error executing command", error: error.message });
            }

            console.log(`Результат выполнения:\n${stdout}`);
            console.error(`Ошибки:\n${stderr}`);
            return res.status(200).json({ message: "Command completed", output: stdout, errors: stderr });
        });
    } else {
        res.status(200).json({ message: "Push not from master, skip" });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://0.0.0.0:${PORT}`);
});
