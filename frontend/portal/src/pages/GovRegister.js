import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

function GovRegister() {
  const [GDepartment, setGDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  
  // const history = useHistory();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   await axios.post('/api/users/register', { GDepartment, name, designation, email, phone, password, captcha });
    //   history.push('/login');
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name
              <input
                  type="text"
                  placeholder="Enter your Department's Name"
                  value={GDepartment}
                  onChange={(e) => setGDepartment(e.target.value)}
              />
          </label>
        </div>

      <div className="form-group">  
        <label>Officer's Name
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group"> 
        <label>Designation
            <input
                type="text"
                placeholder="Enter your Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
            />
        </label>
      </div>
      <div className="form-group">
        <label>E-Mail ID
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>Contact Number
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Captcha
          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
        </label>
      </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default GovRegister;
