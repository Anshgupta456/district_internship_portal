import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

function Register({ history }) {
  const [UserType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { name, email, password, UserType });
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };
    return (
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Type</label>
            <select value={UserType} onChange={(e) => setUserType(e.target.value)}>
              <option value="student">Student</option>
              <option value="government">Government</option>
              <option value="university">University</option>
            </select>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>E-Mail ID</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Captcha</label>
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }

  export default Register;
