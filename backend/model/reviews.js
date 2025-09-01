const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    Movie_Name: { type: String, required: true },
    Feedback: { type: String, required: true },
    Rating: { type: String, required: true },
    user: { type: String, required: true },
    created_by: { type: String, required: true }  // NEW PROPERTY ADDED
});

module.exports = mongoose.model('Review', reviewSchema);
