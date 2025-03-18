const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
require("dotenv").config();
const cors = require('cors');
const Joi = require('joi');
const mongoose = require('mongoose');
const MovieModel = require("./model/movies");
const ReviewModel = require("./model/reviews");
const User = require('./model/login');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

async function Connection() {
  await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to DB");
}

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = await User.create({ email, password });

    const token = jwt.sign({ email: newUser.email }, process.env.ACCESS_TOKEN_SECRET);

    // Set cookies for token and email
    res.cookie("token", token);
    res.cookie("email", email);

    // Return user data and token in response
    res.json({ user: newUser, token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("email");
  res.status(200).json({ message: "Logout successful" });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email');  
    console.log('Retrieved all users:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await MovieModel.find();
    console.log('Retrieved movies:', movies);
    res.json(movies);
  } catch (err) {
    console.error('Error retrieving movies:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/reviews', async (req, res) => {
  try {
    const { Movie_Name, Feedback, Rating, user } = req.body; 
    console.log('Received review data:', { Movie_Name, Feedback, Rating, user });
    const review = new ReviewModel({ Movie_Name, Feedback, Rating, user }); 
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/allreviews', async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    console.log('Retrieved all reviews:', reviews);
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error retrieving reviews:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/updateReview/:id', async (req, res) => {
  console.log("review edited")
  try {
    const reviewId = req.params.id;
    const { Movie_Name, Feedback, Rating } = req.body;

    const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, { Movie_Name, Feedback, Rating }, { new: true });

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete("/review/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    await ReviewModel.findByIdAndDelete(id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Connection().then(() => {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
});

module.exports = app;
