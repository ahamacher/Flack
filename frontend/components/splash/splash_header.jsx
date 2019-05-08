/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const email = "";

  const handleClick = () => {
    debugger;
    props.login({ email: "test@user.com", password: "password" });
  };

  return (
    <>
      <div className="nav-links">
        <Link to="/" className="logo">
          <img
            src="https://s3-us-west-1.amazonaws.com/flack-app/img/flack-logo.png"
            width="25px"
            height="25px"
            alt=""
          />{" "}
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
          <li>
            <button
              type="button"
              className="signup"
              id="demo"
              onClick={handleClick}
            >
              Demo User
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
