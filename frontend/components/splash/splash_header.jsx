/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const email = "";
  return (
    <header>
      <Link to="/" className="logo">
        Flack
      </Link>
      <div className="nav-links">
        <ul>
          <li>
            <a href="#">Why Flack?</a>
          </li>
          <li>
            <a href="#">Solutions</a>
          </li>
          <li>
            <a href="#">Resources</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
        </ul>
      </div>
      <div className="login">
        <Link to="/login">Sign in</Link>
      </div>
      <Link
        to={{
          pathname: "/signup",
          state: {
            email
          }
        }}
      >
        Get started
      </Link>
    </header>
  );
};

export default Header;
