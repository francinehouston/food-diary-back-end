const express = require("express");
const FoodItem = require("../models/FoodItem");
const verifyToken = require("../middleware/verify-token");

const router = express.Router();

// Add a new food item (Protected)
router.post("/", verifyToken, async (req, res) => {
    try {
      // Destructure fields from req.body
      const { name, quantity, unit, calories_per_serving, protein, carbohydrates, serving_size } = req.body;
  
      // Validate required fields
      if (!name || !quantity || !unit || !calories_per_serving || !protein || !carbohydrates || !serving_size) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Assign userId from the authenticated user
      req.body.userId = req.user._id;
  
      // Create a new food item
      const foodItem = await FoodItem.create(req.body);
  
      // Attach user info (optional, depending on frontend needs)
      foodItem._doc.user = req.user;
  
      // Send response
      res.status(201).json(foodItem);
    } catch (err) {
      console.error("Error creating food item:", err);
      res.status(500).json({ error: err.message });
    }
  });
  

// Get all food items added by the user (Protected)
router.get("/", verifyToken, async (req, res) => {
    try {
      const foodItems = await FoodItem.find({}); // The variable should be foodItems, not foodItem
      res.status(200).json(foodItems); // Send the correct variable in the response
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Get a specific food items by ID (protected)
router.get("/:id", verifyToken, async (req,res) => {
    try {
const foodItem = await FoodItem.findById(req.params.id);
if(!foodItem) {
    return res.status(404).json({error: "Food item not found"});
}
 // Ensure the food item belongs to the authenticated user
 if(foodItem.userId.equals(req.user.id)){
    return res.staus(403).json({error: "Not authorized to view this food item"});
 }
 res.status(200).json(foodItem);
    }  catch (err) {
        res.status(500).json({error: err.message});
    }
});


// PUT route to update a food item by its ID
router.put("/:foodItemId", verifyToken, async (req, res) => {
    try {
      // Find the food item by its ID
      const foodItem = await FoodItem.findById(req.params.foodItemId);
      
      // If food item does not exist, send a 404 error
      if (!foodItem) {
        return res.status(404).json({ error: "Food item not found" });
      }

      // Update the food item with the data from the request body
      const updatedFoodItem = await FoodItem.findByIdAndUpdate(
        req.params.foodItemId,
        req.body,
        { new: true } // This option returns the updated document
      );
  
      // Respond with the updated food item
      res.status(200).json(updatedFoodItem);
    } catch (err) {
      console.error("Error updating food item:", err); // Log the error for debugging
      res.status(500).json({ error: err.message });
    }
  });
  
  



// // Delete the food item  
router.delete("/:foodItemId", verifyToken, async (req, res) => {
    try {
      // Find the food item by its ID
      const foodItem = await FoodItem.findById(req.params.foodItemId);
  
      // If food item is not found, send a 404 error with a clear message
      if (!foodItem) {
        return res.status(404).json({ error: "Food item not found" });
      }

      // Delete the food item
      await FoodItem.findByIdAndDelete(req.params.foodItemId);
  
      // Send a success response with a custom message
      res.status(200).json({ message: "Food item deleted successfully", foodItem });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;