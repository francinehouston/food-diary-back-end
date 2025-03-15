const express = require("express");
const path = require('path'); // Import path module
const Reminder = require(path.join(__dirname, '../models/Reminder.js'));
// const Reminder = require('../models/Reminder.js')// Import Reminder model
const { verify } = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

// Debugging line to log the model's path
console.log(path.join(__dirname, '../models/Reminder'));

// Create a reminder (Protected)
router.post("/", verifyToken, async (req, res) => {
    try {
        const newReminder = new Reminder({
            ...req.body,
            userId: req.user.id,
        });
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all reminders for the logged-in user (Protected)
router.get("/", verifyToken, async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user.id });
        res.status(200).json(reminders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
