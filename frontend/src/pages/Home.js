import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Doodle-Masti</h1>
      <p>Your collaborative doodling platform starts here!</p>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/signup" className="btn" style={{ marginLeft: '10px' }}>Sign Up</Link>
    </div>
  );
}

export default Home;
