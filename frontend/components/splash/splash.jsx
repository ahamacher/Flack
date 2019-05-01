import React from 'react';
import { Link } from 'react-router-dom';

const Splash = ({ currentUser, logout }) => {
  const links = () => (
    <div className="login-signup">
      <span>
        <Link to="/signup">Get Started</Link>
      </span>
      <span>
        Already using Flack?
        <Link to="/login">Sign in.</Link>
      </span>
    </div>
  );
  const greeting = () => (
    <div>
      <h5>Welcome {currentUser.email}</h5>
      <button onClick={logout}>Logout</button>
    </div>
  )
  return currentUser ? greeting() : links();
};

export default Splash;