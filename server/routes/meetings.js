const express = require('express');
const meetingsRouter = express.Router();
module.exports = meetingsRouter;

const db = require('../db');


meetingsRouter.get('/', (req, res) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
});

meetingsRouter.post('/', (req, res) => {
    const meeting = db.createMeeting();
    const addedMeeting = db.addToDatabase('meetings', meeting);
    res.status(201).send(addedMeeting);
});

meetingsRouter.delete('/', (req, res) => {
    const deletedMeetings = db.deleteAllFromDatabase('meetings');
    if(deletedMeetings.length === 0) {
        res.status(204).send();
    } else {
        res.status(404).send("Delete request failed.");
    }
});