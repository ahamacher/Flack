import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <div className="footer-logo">
      <Link to="/">
        <img
          src="https://i.imgur.com/HGKt24f.png"
          alt="flack"
          width="54px"
          height="54px"
        />
      </Link>
    </div>
    <div className="footer-links">
      <ul className="footer-flack-link">
        <li className="footer-title">Flack</li>
        <li>Why Flack?</li>
        <li>About Us</li>
        <li>News</li>
        <li>Pricing</li>
      </ul>
      <ul className="footer-page-link">
        <li className="footer-title">Using Flack</li>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
      <ul className="footer-about">
        <li className="footer-title">Useful Links</li>
        <li>
          <a href="https://github.com/ahamacher/">Git</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/andrew-hamacher-a7357536/">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  </>
);

export default Footer;
