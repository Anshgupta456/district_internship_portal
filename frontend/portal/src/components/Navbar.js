import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className='navbar bg-customGreen'>
      <div className="navbar-container flex justify-between">
        {/* <div className="navbar-logo">
          <img src="path-to-logo" alt="Logo" />
          <span>Hamara Portal</span>
        </div> */}
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item"><Link to="/jobs">Jobs</Link></li>
          <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        <div className="navbar-toggle">
          <Link to="./Login">Login</Link>
          <Link to="./Register">Register</Link>
          <a href="#toggle">English</a> | <a href="#toggle">हिंदी</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
