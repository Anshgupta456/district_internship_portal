import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <img src="https://i.pinimg.com/originals/e2/a0/c9/e2a0c97029dfefe1f7b376f3cba9cc18.jpg" alt="Satyameva Jayate Logo" className="gov-logo" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1PFj3V_WRAMhLCraRAZN2BuYPLcmCWiXDA&s" alt="government Logo" className="gov-logo" />
          <div className="header-text">
            <h1>Hamara Portal</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
