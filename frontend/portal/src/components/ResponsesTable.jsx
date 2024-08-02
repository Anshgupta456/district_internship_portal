import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GovResTracker.css';
import { AuthContext } from '../context/AuthContext';

const ResponsesTable = () => {
  const { profileId } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchJobPostsAndStudents = async () => {
      try {
        // Fetch job posts for the government user
        const jobPostsResponse = await axios.get(`http://localhost:5000/api/government/${profileId}`);
        const jobPosts = jobPostsResponse.data.jobPosts;

        // Create a set to avoid duplicate student IDs
        const studentIds = new Set();

        // Fetch applied students for each job post
        for (const jobId of jobPosts) {
          const appliedStudentsResponse = await axios.get(`http://localhost:5000/api/internjobposts/${jobId}/`);
          const appliedStudents = appliedStudentsResponse.data.appliedStudents;

          // Add each applied student's ID to the set
          appliedStudents.forEach(studentId => studentIds.add(studentId));
        }

        // Fetch details for each unique student
        const studentDataPromises = Array.from(studentIds).map(studentId => axios.get(`http://localhost:5000/api/students/${studentId}`));
        const studentDataResponses = await Promise.all(studentDataPromises);

        // Extract the student data from the responses
        const studentData = studentDataResponses.map(response => response.data);

        setStudents(studentData);
      } catch (err) {
        console.error('Error fetching job posts or student data:', err);
      }
    };

    fetchJobPostsAndStudents();
  }, [profileId]);

  return (
    <div className="responses-table-container">
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
            {/* <th>Skills</th> */}
            <th>Send Selection Mail</th>
            <th>View University Verification Letter</th>
            <th>Send Offer Letter</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.collegeId}</td>
              <td>{student.collegeName}</td>
              <td>{student.email}</td>
              <td>{student.contactNumber}</td>
              <td>{student.qualification}</td>
              {/* <td>
                <ul>
                  {student.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </td> */}
              <td className="link">Click Here</td>
              <td className="link">Click Here</td>
              <td className="link">Click Here</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsesTable;
