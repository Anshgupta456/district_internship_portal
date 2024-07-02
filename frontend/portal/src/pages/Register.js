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
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>User Type
          <select value={UserType} onChange={(e) => setUserType(e.target.value)}>
            <option value="student">Student</option>
            <option value="government">Government</option>
            <option value="university">University</option>
          </select>
        </label>
        
        <label>Name
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        
        <label>E-Mail ID
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        
        <label>Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Captcha
          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
