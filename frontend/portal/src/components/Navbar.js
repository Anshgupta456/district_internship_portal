import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar bg-customGreen">
      <div className="navbar-container flex justify-between">
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          {role === 'government' && <li className="navbar-item"><Link to="/jobs">Jobs</Link></li>}
          {role === 'government' && <li className="navbar-item"><Link to="/govdashboard">GovDashboard</Link></li>}
          {role === 'student' && <li className="navbar-item"><Link to="/stddashboard">StdDashboard</Link></li>}
          {role === 'university' && <li className="navbar-item"><Link to="/unidashboard">UniDashboard</Link></li>}
        </ul>
        <div className="navbar-toggle">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/">Register</Link>
            </>
          )}
          {/* <div className="navbar-profile">
            <div className="profile-icon" onClick={handleDropdownToggle}>
              <img src="/path/to/profile-icon.png" alt="Profile" />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/">View Profile</Link>
                <Link to="/edit-profile">Edit Profile</Link>
              </div>
            )}
          </div> */}
          <a href="#toggle">English</a> | <a href="#toggle">हिंदी</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
