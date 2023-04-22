const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(express.json());

app.use(express.static(__dirname));

app.get('/api/flashcards', (req, res) => {
    fs.readFile('flashcards.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading flashcards');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/api/flashcards', (req, res) => {
    const newFlashcard = req.body;
    fs.readFile('flashcards.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading flashcards');
        } else {
            const flashcards = JSON.parse(data);
            flashcards.push(newFlashcard);
            fs.writeFile('flashcards.json', JSON.stringify(flashcards), (err) => {
                if (err) {
                    res.status(500).send('Error saving flashcard');
                } else {
                    res.status(201).send('Flashcard created');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
