import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', { email, password });
      console.log('Login successful:', response.data.user);

      // Set the email as a cookie named 'email'
      Cookies.set('email', response.data.user.email);
      localStorage.setItem('email', response.data.user.email);

     
      alert('successful!', response.data.user);

      
      window.location.href = '/landing';
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
    }
  };

  return (
    <div className="suiiii">
      <p><Link to="/landing"><button id='goback2'>Go back</button></Link></p>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <br />
        <button type="submit" id='submit1'>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
