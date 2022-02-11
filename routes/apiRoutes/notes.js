const router = require('express').Router();
const fs = require("fs");
const path = require("path");
const generateUniqueId = require('generate-unique-id');
const {notes} = require('../../db/db.json')

require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = generateUniqueId()

    if (!req.body.title || !req.body.text) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        notes.push(req.body);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes }, null, 2)
        );
        res.json({
            message: 'success',
            data: req.body
        });
    }
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const index = notes.findIndex(note => note.id === id);
    notes.splice(index, 1)

    res.json({
        message: "success",
    })

})

module.exports  = router;
