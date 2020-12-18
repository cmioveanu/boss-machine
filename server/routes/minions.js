const express = require('express');
const minionsRouter = express.Router();
module.exports = minionsRouter;

const db = require('../db');






minionsRouter.get('/', (req, res) => {
    const minions = db.getAllFromDatabase('minions');
    res.send(minions);
});

minionsRouter.post('/', (req, res) => {
    const newMinion = req.body;
    newMinion.salary = Number(req.body.salary);

    const addedMinion = db.addToDatabase('minions', newMinion);
    res.status(201).send(addedMinion);
});

minionsRouter.get('/:minionId', (req, res) => {
    const id = req.params.minionId;
    if (Number.isNaN(Number(id))) {
        res.status(404).send("Invalid id.");
    } else {
        const minion = db.getFromDatabaseById('minions', id);
        if (minion == null) {
            res.status(404).send("Minion not found")
        } else {
            res.send(minion);
        }
    }
});

minionsRouter.put('/:minionId', (req, res) => {
    const id = req.params.minionId;
    if (Number.isNaN(Number(id))) {
        res.status(404).send("Invalid id.");
    } else {
        const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
        updatedMinion === null ? res.status(404).send("Invalid id - minion not found.") : res.send(updatedMinion);
    }
});

minionsRouter.delete('/:minionId', (req, res) => {
    const id = req.params.minionId;
    const deletedMinion = db.deleteFromDatabasebyId('minions', id);

    if (deletedMinion === false) {
        res.status(404).send("Minion not found.");
    } else {
        res.status(204).send();
    }
});

