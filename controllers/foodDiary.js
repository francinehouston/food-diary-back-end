const express = require("express");
const mongoose = require("mongoose");
const FoodDiary = require("../models/FoodDiary");
const verifyToken = require('../middleware/verify-token.js')
const { verify } = require("jsonwebtoken");

const router = express.Router();

/// CREATE - Create a new food diary entry
router.post("/", verifyToken, async (req, res) => {
    try {
      // Associate the entry with the logged-in user
      req.body.user = req.user._id;
      const newEntry = await FoodDiary.create(req.body);
      res.status(201).json(newEntry);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

  router.get("/", verifyToken, async (req, res) => {
    try {
      const entries = await FoodDiary.find({});
      res.status(200).json(entries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  

  // show
  router.get("/:userId", verifyToken, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const entries = await FoodDiary.find({ userId });

        if (!entries || entries.length === 0) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
  
 
  
  // Update

  router.put("/:entryId", verifyToken, async (req, res) => {
    try {
const {entryId} = req.params;
// Validate ObjectId before querying
if (!mongoose.Types.ObjectId. isValid(entryId)) {
  return res.status(400).json({error: "Invalid entry ID format"});
}
// Find and update the entry
const updatedEntry = await FoodDiary.findByIdAndUpdate(
  entryId,
  req.body,
  {new: true, runValidators: true}
);

if (!updatedEntry) {
  return res.status(404).json({error: "Entry not found"});
}
res.status(200).json(updatedEntry);
    } catch (err) {

    }
  });

  
  
  // Delete
  router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid entry ID format" });
        }

        // Find the entry
        const entry = await FoodDiary.findById(id);
        if (!entry) {
            return res.status(404).json({ error: "Entry not found" });
        }

    

        await FoodDiary.findByIdAndDelete(id);
        res.status(200).json({ message: "Entry deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

  
  module.exports = router;