const mongoose = require("mongoose");

const NutritionGoalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    daily_calories_target: {
        type: Number,
        required: true
    },
    protein_target: {
        type: Number,
    },
    carbs_target: {
        type: Number,
    },
    fats_target: {
        type: Number,
    },
    water_intake_target: { type: Number },
});
module.exports = mongoose.model("NutritionGoal", NutritionGoalSchema);