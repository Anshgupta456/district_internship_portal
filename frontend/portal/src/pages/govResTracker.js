// src/ResponsesTable.js
import React from 'react';
import '../styles/govResTracker.css';

const ResponsesTable = () => {
  return (
    <div className="responses-table-congovResTrackertainer">
      <h2>Responses Received</h2>
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>College ID</th>
            <th>College Name</th>
            <th>E-mail ID</th>
            <th>Contact Number</th>
            <th>Qualification</th>
            <th>Skills</th>
            <th>Send Selection Mail</th>
            <th>View Universtiy Verification Letter</th>
            <th>Send Offer Letter</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row for demonstration; this will be dynamically generated */}
          <tr>
            <td>1</td>
            <td>THDC001</td>
            <td>Vishakha</td>
            <td>210970101007</td>
            <td>THDC-IHET</td>
            <td>anshikagupta@gmail.com</td>
            <td>+1234567890</td>
            <td>B.Tech Computer Science</td>
            <td><ul><li>React</li><li>React</li><li>Java</li></ul></td>
            <td className='link'>Click Here</td>
            <td className='link'>Click Here</td>
            <td className='link'>Click Here</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResponsesTable;
