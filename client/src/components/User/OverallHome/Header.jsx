import React from "react";
import './Header.css';  
import { Menu as MenuIcon } from "@mui/icons-material";
const Header = ({ showUpdatePopup }) => {
  return (
    <nav className="navbarrr navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span> <MenuIcon /></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#individual-section">
                Individual Plan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#combo-section">
                Combo Plan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact-section">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={showUpdatePopup}>
                Update
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
