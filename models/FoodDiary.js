const mongoose = require('mongoose');


const mealSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
});

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number },
    carbs: { type: Number },
    fat: { type: Number }
})

const foodDiarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    meals: [mealSchema],


    calories: {
        type: Number,
        required: true,
    },
    notes: {
        type: String
    },
});
module.exports = mongoose.model('FoodDiary', foodDiarySchema);