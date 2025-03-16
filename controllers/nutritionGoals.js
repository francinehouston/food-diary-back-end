const express = require("express");
const NutritionGoal = require('../models/NutritionGoal');  // Adjust the path as needed
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

// Set nutrition goals (Protected)

router.post("/", verifyToken, async (req, res) => {
    try {
      // The userId is now available as req.user.id
      const nutritionGoal = await NutritionGoal.create({
        ...req.body,
        userId: req.user.id, // Attach userId from the decoded token
      });
  
      res.status(201).json(nutritionGoal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  


// Get user's nutrition goals (Protected)
router.get("/", verifyToken, async (req, res) => {
    try {
      console.log(("User ID from Token:", req.user.id));

        const goals = await NutritionGoal.findOne({ userId: req.user.id });
       
        if (!goals) {
          console.log("No nutrition goals found for user:", req.user.id);
          return res.status(404).json({ error: "No nutrition goals set" });
      }

console.log("Goals found:", goals);
res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;