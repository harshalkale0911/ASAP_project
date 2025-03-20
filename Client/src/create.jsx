import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./create.css";
import { Link } from 'react-router-dom';

export default function Create() {
  const [field, setField] = useState({
    firstName: "",
    lastName: "",
    email: "",
    user: localStorage.getItem("email"),
    created_by: ""
  });

  const [users, setUsers] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Filter Reviews by Selected User
  const handleUserChange = async (e) => {
    const selectedUser = e.target.value;
    setField({ ...field, created_by: selectedUser });

    try {
      const response = await axios.get(`http://localhost:3000/reviews/${selectedUser}`);
      setFilteredReviews(response.data);
    } catch (error) {
      console.error('Error fetching filtered reviews:', error);
      setFilteredReviews([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!field.firstName || !field.lastName || !field.email || !field.created_by) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:3000/reviews', {
        Movie_Name: field.firstName,
        Feedback: field.email,
        Rating: field.lastName,
        user: field.user,
        created_by: field.created_by
      });

      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Please login to add a review.');
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Review</h1>

        <input
          id="first-name"
          className="form-field"
          type="text"
          placeholder="Movie name"
          name="firstName"
          value={field.firstName}
          onChange={(e) => setField({ ...field, firstName: e.target.value })}
        />

        <input
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Rating"
          name="lastName"
          value={field.lastName}
          onChange={(e) => setField({ ...field, lastName: e.target.value })}
        />

        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Feedback"
          name="email"
          value={field.email}
          onChange={(e) => setField({ ...field, email: e.target.value })}
        />

        {/* Dropdown for Users */}
        <select
          id="created-by"
          className="form-field"
          value={field.created_by}
          onChange={handleUserChange}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        <button className="form-field" type="submit">
          Add Review
        </button>
      </form>

      {/* Filtered Reviews Display */}
      <div className="filtered-reviews">
        <h2>Reviews by Selected User:</h2>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3>{review.Movie_Name}</h3>
              <p>Rating: {review.Rating}</p>
              <p>Feedback: {review.Feedback}</p>
              <p>Created By: {review.created_by}</p>
            </div>
          ))
        ) : (
          <p>No reviews found for the selected user.</p>
        )}
      </div>

      <div>
        <Link to="/landing"><button id='goback'>Go back</button></Link>
      </div>
    </div>
  );
}
