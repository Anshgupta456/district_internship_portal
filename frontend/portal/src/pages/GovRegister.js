import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

function Register({ history }) {
  const [GDepartment, setGDepartment] = useState('GDepartment');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [designation, setdesignation] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { GDepartment,name, designation, email, phone, password, captcha });
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Department Name
            <input
                type="text"
                placeholder="Enter your Department's Name"
                value={designation}
                onChange={(e) => setdesignation(e.target.value)}
            />
        </label>
        
        <label>Officer's Name
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        
        <label>Designation
            <input
                type="text"
                placeholder="Enter your Designation"
                value={designation}
                onChange={(e) => setGDepartment(e.target.value)}
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

        <label>Contact Number
          <input
            type="number"
            placeholder="Email"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
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
