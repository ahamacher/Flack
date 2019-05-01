import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/" className="logo">
        Flack
      </Link>
      <Link to="/login">Sign in</Link>
    </div>
  );
};

export default Header;
