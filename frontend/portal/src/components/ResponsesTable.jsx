import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GovResTracker.css';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const ResponsesTable = () => {
  const { id: jobId } = useParams();
  const { profileId } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const recipientEmail = localStorage.getItem('email');
  const subject = "Congrats on your ShortListing";
  const body = `Dear Student, you have been selected for the Job. Hoping you will be useful to us ;}`;

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    const fetchJobPostsAndStudents = async () => {
      try {
        // Fetch job posts for the government user
        const jobPostsResponse = await axios.get(`http://localhost:5000/api/government/${profileId}`);
        const jobPosts = jobPostsResponse.data.jobPosts;

        // Create a set to avoid duplicate student IDs
        const studentIds = new Set();

        // Fetch applied students for each job post
        const appliedStudentsResponse = await axios.get(`http://localhost:5000/api/internjobposts/${jobId}`);
        const appliedStudents = appliedStudentsResponse.data.appliedStudents;

        // Add each applied student's ID to the set
        appliedStudents.forEach(studentId => studentIds.add(studentId));

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
  }, [profileId, jobId]);

  const handleCheckboxChange = async (studentId, isChecked) => {
    if (isChecked) {
      try {
        await axios.post(`http://localhost:5000/api/internjobposts/${jobId}/select`, { studentId });
        setSelectedStudents([...selectedStudents, studentId]);
      } catch (err) {
        console.error('Error selecting student:', err);
      }
    } else {
      try {
        await axios.post(`http://localhost:5000/api/internjobposts/${jobId}/unselect`, { studentId });
        setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      } catch (err) {
        console.error('Error unselecting student:', err);
      }
    }
  };

  return (
    <div className="responses-table-container">
      <h2 className="text-2xl text-[#FC5F0D]">Responses Received</h2>
      {students.length === 0 ? (
        <p className='text-4xl font-bold'>No one applied yet</p>
      ) : (
        <table>
          <thead className="text-md text-[#FC5F0D]">
            <tr>
              <th>S. No.</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>College ID</th>
              <th>E-mail ID</th>
              <th>Contact Number</th>
              <th>Qualification</th>
              <th>Send Shortlisting Mail</th>
              <th>Selected (Y/N)</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.universityId}</td>
                <td>{student.user?.email}</td>
                <td>{student.contactNumber}</td>
                <td>{student.graduationCourse}</td>
                
                <td>
                  <a href={mailtoLink} className="link">Click Here</a>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={student.selectedJob === jobId || selectedStudents.includes(student._id)}
                    onChange={(e) => handleCheckboxChange(student._id, e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResponsesTable;
