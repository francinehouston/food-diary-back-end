const mongoose = require("mongoose");

const WeightTrackingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required: false,
    },
    date: {type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
    }
});

module.exports = mongoose.model("WeightTracking", WeightTrackingSchema);