const express = require('express');
const path = require('path');
const app = express();

// Настройка статики (исправленный путь)
app.use(express.static(path.join(__dirname, '../frontend')));

// Маршрут главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
