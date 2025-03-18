import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Users from '../Users';
import './landing.css';
import Cookies from 'js-cookie';

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleReviewButtonClick = () => {
    setShowUsers(true);
  };

  const handleCloseUsers = () => {
    setShowUsers(false);
  };

  const handleUserSelect = (e) => {
    const selectedEmail = e.target.value;
    setSelectedUser(selectedEmail);

  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout');
      
      // Clear the email cookie
      Cookies.remove('email');
      localStorage.removeItem("email");
      window.location.reload();

      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='suii'>
      <div className="container1">
        <h1><b>DC Movies</b></h1>
        <div className="top-right">
          <div className='loginuser'>
            <select value={selectedUser} onChange={handleUserSelect}>
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user.email}>{user.email}</option>
              ))}
            </select>
          </div>
        </div>
        <button id='review1' onClick={handleReviewButtonClick}>View Reviews</button>
        <Link to='/create'><button id='review'>Review</button></Link>
        <Link to='/login'><button id='login1'>Login</button></Link>
        <button id='logout' onClick={handleLogout}>Logout</button>
        <Link to='/'><button id='superman'>Go back</button></Link>
        <div id="movieList" className="movieList">
          {movies.map((movie) => (
            <div key={movie._id} className="movieBox">
              <h2>{movie.Movie_Title}</h2>
              <p>Box (Office in millions): {movie.Box_Office}</p>
              <p>Rating (out of 10): {movie.Rating}</p>
            </div>
          ))}
        </div>

        {showUsers && <Users handleCloseUsers={handleCloseUsers} email={selectedUser} />}
      </div>
    </div>
  );
};

export default Landing;
