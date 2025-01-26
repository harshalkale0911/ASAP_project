const mongoose = require("mongoose");

const dogNameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  meaning: { type: String },
});

module.exports = mongoose.model("DogName", dogNameSchema);
