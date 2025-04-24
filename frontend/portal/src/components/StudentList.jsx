import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const universityId = localStorage.getItem('profileId');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/universities/students/${universityId}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (universityId) {
      fetchStudents();
    }
  }, [universityId]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Student List</h1>
      {students.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-3 border">Name</th>
              <th className="py-2 px-3 border">Contact Number</th>
              <th className="py-2 px-3 border">Student ID</th>
              <th className="py-2 px-3 border">Aadhar Number</th>
              <th className="py-2 px-3 border">Last Passed Course</th>
              <th className="py-2 px-3 border">Graduation Batch</th>
              <th className="py-2 px-3 border">Graduation Course</th>
              <th className="py-2 px-3 border">About</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="py-2 px-3 border">{student.name}</td>
                <td className="py-2 px-3 border">{student.contactNumber}</td>
                <td className="py-2 px-3 border">{student.studentId}</td>
                <td className="py-2 px-3 border">{student.aadharNumber}</td>
                <td className="py-2 px-3 border">{student.lastPassedCourse}</td>
                <td className="py-2 px-3 border">{student.graduationBatch}</td>
                <td className="py-2 px-3 border">{student.graduationCourse}</td>
                <td className="py-2 px-3 border">{student.about}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default StudentList;
