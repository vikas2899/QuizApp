import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isActive, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!isActive);
  };

  return (
    <header>
      <nav className="navbar">
        <Link className="brand-title" to="/">
          Quizzer
        </Link>
        <Link to className="toggle-button" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </Link>
        <div className={`navbar-links ${isActive ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
