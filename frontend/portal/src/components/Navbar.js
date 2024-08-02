import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import '../styles/Navbar.css';

function Navbar() {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  // const handleDropdownToggle = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar bg-black text-orange-700 flex py-8 font-serif">
      <div className="container flex justify-start px-4 mx-4 font-serif">
        <ul className="navbar-menu flex space-x-3">
          <li className="navbar-item font-bold text-lg mr-5">Govolve</li>
          <li className="navbar-item"><Link to="/">Home</Link></li>
          {role === 'government' && <li className="navbar-item"><Link to="/jobs">Jobs</Link></li>}
          {role === 'government' && <li className="navbar-item"><Link to="/govdashboard">Dashboard</Link></li>}
          {role === 'student' && <li className="navbar-item"><Link to="/stddashboard">Dashboard</Link></li>}
          {role === 'university' && <li className="navbar-item"><Link to="/unidashboard">Dashboard</Link></li>}
        </ul>
      </div>
      <div className="navbar-toggle container flex justify-end px-4 space-x-3">
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
        {/* <a href="#toggle">English</a> | <a href="#toggle">हिंदी</a> */}
      </div>
    </nav>
  );
}

export default Navbar;
