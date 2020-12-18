const express = require('express');
const ideasRouter = express.Router();
module.exports = ideasRouter;

const db = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');


ideasRouter.get('/', (req, res) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.send(ideas);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const idea = req.body;
    const sentIdea = db.addToDatabase('ideas', idea);
    res.status(201).send(sentIdea);
});

ideasRouter.get('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    if(Number.isNaN(Number(ideaId))) {
        res.status(404).send("Invalid idea id.");
    } else {
        const idea = db.getFromDatabaseById('ideas', ideaId);
        idea == null ? res.status(404).send("Invalid id - idea not found.") : res.send(idea);
    }
});

ideasRouter.put('/:ideaId', (req, res) => {
    const idea = req.body;
    if(Number.isNaN(Number(idea.id))) {
        res.status(404).send("Invalid idea id.");
    } else {
        const updatedIdea = db.updateInstanceInDatabase('ideas', idea);
        updatedIdea == null ? res.status(404).send("Invalid id - idea not found.") : res.send(updatedIdea);
    }
});

ideasRouter.delete('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const deletedIdea = db.deleteFromDatabasebyId('ideas', ideaId);

    if (deletedIdea === false) {
        res.status(404).send("Idea not found.");
    } else {
        res.status(204).send();
    }
});