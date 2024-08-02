import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const StudentList = () => {
  const { profileId } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the student IDs from the university endpoint
    axios.get(`http://localhost:5000/api/universities/${profileId}`)
      .then(response => {
        const studentIds = response.data.students;
        // Fetch the details for each student
        const studentDetailsPromises = studentIds.map(studentId =>
          axios.get(`http://localhost:5000/api/students/${studentId}`)
        );

        Promise.all(studentDetailsPromises)
          .then(responses => {
            const studentDetails = responses.map(res => res.data);
            setStudents(studentDetails);
          })
          .catch(error => {
            console.error('There was an error fetching the student details!', error);
          });
      })
      .catch(error => {
        console.error('There was an error fetching the student IDs!', error);
      });
  }, [profileId]);

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">View Student List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S. No.</th>
              <th className="px-4 py-2 border">Student ID (Enrollment Number)</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Batch</th>
              <th className="px-4 py-2 border">Branch</th>
              <th className="px-4 py-2 border">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{student.studentId}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.graduationBatch}</td>
                <td className="px-4 py-2 border">{student.graduationCourse}</td>
                <td className="px-4 py-2 border">{student.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
