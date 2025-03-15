const express = require("express");
const WeightTracking = require("../models/WeightTracking");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

// Create a weight entry (Protected)
router.post("/", verifyToken, async (req, res) => {
    try {
        const newEntry = new WeightTracking({
            ...req.body,
            userId: req.user.id, // Attach logged-in user ID
        });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all weight tracking entries for logged-in user (Protected)
router.get("/", verifyToken, async (req, res) => {
    try {
        const entries = await WeightTracking.find({ userId: req.user.id }); // Fetch only user's data
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
