/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const email = "";
  return (
    <>
      <div className="nav-links">
        <Link to="/" className="logo">
          Flack
        </Link>
        <ul>
          <li>
            <a href="#" className="navlink">
              Why Flack?
            </a>
          </li>
          <li>
            <a href="#" className="navlink">
              Solutions
            </a>
          </li>
          <li>
            <a href="#" className="navlink">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="navlink">
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div className="head-right">
        <ul>
          <li>
            <Link to="/login" className="navlink">
              Sign in
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/signup",
                state: {
                  email
                }
              }}
              className="signup"
            >
              Get started
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
