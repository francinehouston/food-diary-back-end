// models/Reminder.js

const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});


const Reminder = mongoose.model('Reminder', reminderSchema);



module.exports = Reminder;
