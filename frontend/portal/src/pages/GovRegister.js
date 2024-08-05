// src/pages/GovRegister.js
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import TNC from '../components/TNC';
import { Context } from '../context/Context';

function GovRegister() {
  const { tncAccepted, setTncAccepted } = useContext(Context);
  const [GDepartment, setGDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showTNC, setShowTNC] = useState(false);
  const navigate = useNavigate();

  const handleTncClose = (accepted) => {
    setShowTNC(false);
    if (accepted) {
      setTncAccepted(true);
    } else {
      setTncAccepted(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setShowTNC(true);
  };

  useEffect(() => {
    const register = async () => {
      const user = {
        email: email,
        password: password,
        role: 'government',
      };

      try {
        await axios.post('http://localhost:5000/api/government/register', {
          user,
          name: name,
          departmentName: GDepartment,
          phno: phone,
          designation: designation,
        });
        setSuccess(true);
        navigate('/login');
      } catch (err) {
        setError(err.response.data.message || 'Registration failed');
      }
    };

    if (tncAccepted) {
      register();
    }
  }, [tncAccepted, email, password, name, GDepartment, phone, designation, navigate]);

  return (
    <div className="register-container">
      <TNC show={showTNC} onClose={handleTncClose} />
      <h2>Register</h2>
      {success && <div className="success-message">Registration successful!</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Department Name
            <input
              type="text"
              placeholder="Enter your Department's Name"
              value={GDepartment}
              onChange={(e) => setGDepartment(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Officer's Name
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Designation
            <input
              type="text"
              placeholder="Enter your Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            E-Mail ID
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contact Number
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default GovRegister;
