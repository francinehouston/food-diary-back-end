const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: { 
        type: Number, 
        required: true },

    unit: { 
        type: String,
         required: true },

    calories_per_serving: {
        type: Number,
        required: true,
    },
    protein: { 
        type: Number ,
        required: true,
    },

    carbohydrates: { 
        type: Number,
        required: true, 
    },

    serving_size: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
});

module.exports = mongoose.model("FoodItem", foodItemSchema);