import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="form-head">
      <Link to="/" className="form-logo">
        <img
          src="https://i.imgur.com/HGKt24f.png"
          width="30px"
          height="30px"
          alt=""
        />{" "}
        Flack
      </Link>
      <Link to="/login" className="header-sign-in">Sign in</Link>
    </header>
  );
};

export default Header;
