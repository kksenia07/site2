const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/feedback', (req, res) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(req.body, null, 2));
        res.send('Данные сохранены в data.json');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при сохранении');
    }
});

app.get('/feedback', (req, res) => {
    try {
        const data = fs.readFileSync('data.json');
        res.type('json').send(data);
    } catch (err) {
        res.status(500).send('Нет данных или ошибка чтения');
    }
});

app.listen(process.env.PORT, () => console.log("Listening on", process.env.PORT));