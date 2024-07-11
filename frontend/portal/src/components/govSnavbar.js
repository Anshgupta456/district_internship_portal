import React, { useState } from 'react';
import '../styles/govSnavbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><a href="/dashboard">Dashboard</a></li> {/*It will show View Profile Page*/}
        <li><a href="/post-internship-job">Post Internship/Job</a></li>
      </ul>
      <div className="navbar-profile">
        <div className="profile-icon" onClick={handleDropdownToggle}>
          <img src="/path/to/profile-icon.png" alt="Profile" />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <a href="/view-profile">View Profile</a>
            <a href="/edit-profile">Edit Profile</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
