import React from 'react';
import '../styles/Header.css';
import logo from '../assets/Logo.svg';

function Header() {
  return (
    <header className="header bg-black">
      <div className="header-container bg-black">
        <div className="header-left">
          <img src={logo} alt="Satyameva Jayate Logo" className="gov-logo" />
          <div className="header-text">
            <h1 class="text-[#FC5F0D] text-2xl">Govolve</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
