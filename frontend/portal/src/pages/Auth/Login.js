import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Register.css';

function Login({ history }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { userId, password, captcha });
      localStorage.setItem('token', res.data.token);
      history.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID
            <input
              type="text"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">  
          <label>Password
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>  
        
        <div className="form-group">
          <label>Captcha
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
