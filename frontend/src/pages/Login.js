import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';


function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
}

export default Login;
