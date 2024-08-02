import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GovNavbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar flex justify-between items-center px-7 py-9 shadow-md bg-white">
      <ul className="navbar-links">
        <li><a className='cursor-pointer' onClick={() => navigate('/govdashboard')}>Dashboard</a></li>
        <li><a className='cursor-pointer' onClick={() => navigate('/jobs')}>Post Opportunity</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
