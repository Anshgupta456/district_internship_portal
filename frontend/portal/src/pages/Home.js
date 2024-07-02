import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Portal</h1>
      <p>Connecting college students with government service opportunities.</p>
      <div>
        <h2>Register Yourself as</h2>
        <ul>
          <li><Link to="./GovRegister">Student</Link></li>
          <li><Link to="./GovRegister">Government</Link></li>
          <li><Link to="./GovRegister">University</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
