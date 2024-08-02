import React, { useContext, useState } from 'react';
import axios from 'axios';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';
import { AuthContext } from '../../context/AuthContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const {login} = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debugging statement
    console.log('Email:', email); // Debugging statement
    console.log('Password:', password); // Debugging statement
    // if (!captchaToken) {
    //   alert('Please complete the CAPTCHA');
    //   return;
    // }
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log('Response:', res); // Debugging statement
      login(res.data.token,res.data.role,res.data.id,res.data.profileId);
      if (res.data.role === 'student') {
        navigate('/stddashboard');
      } else if (res.data.role === 'government') {
        navigate('/govdashboard');
      } else if (res.data.role === 'university') {
        navigate('/unidashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error:', err); // Debugging statement
    }
  };

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email
            <input
              type="text"
              placeholder="Enter your User ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

        {/* <div className="form-group">
          <HCaptcha
            sitekey="94365676-5074-46b6-9354-3266097075f8"
            onVerify={onCaptchaChange}
          />
        </div> */}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
