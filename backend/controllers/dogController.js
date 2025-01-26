const DogName = require("../models/DogName");

// Get all funny dog names
const getDogNames = async (req, res) => {
  try {
    const names = await DogName.find();
    res.json(names);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new funny dog name
const addDogName = async (req, res) => {
  const { name, meaning } = req.body;
  try {
    const newDog = new DogName({ name, meaning });
    await newDog.save();
    res.status(201).json(newDog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getDogNames, addDogName };
