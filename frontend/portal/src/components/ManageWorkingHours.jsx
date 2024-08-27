import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ManageWorkingHours = () => {
  const [students, setStudents] = useState([]);
  const {profileId} = useContext(AuthContext)
  useEffect(() => {
    const fetchSelectedStudents = async () => {
      try {
        if(!profileId){
            return;
        }
        const response = await axios.get(`http://https://district-internship-portal-3.onrender.com/api/government/selected-students/${profileId}`);
        setStudents(response.data.jobPosts.flatMap(jobPost => jobPost.selectedStudents));
      } catch (error) {
        console.error('Error fetching selected students:', error);
      }
    };

    fetchSelectedStudents();
  }, [profileId]);

  const updateWorkingHours = async (studentId, newHours) => {
    try {
      await axios.patch(`http://https://district-internship-portal-3.onrender.com/api/students/working-hours/${studentId}`, { workingHours: newHours });
      setStudents(students.map(student => student._id === studentId ? { ...student, workingHours: newHours } : student));
    } catch (error) {
      console.error('Error updating working hours:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-semibold mb-4">Manage Working Hours</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Student ID</th>
            <th className="px-4 py-2">Current Working Hours</th>
            <th className="px-4 py-2">Update Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.studentId}</td>
              <td className="border px-4 py-2">{student.workingHours}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  defaultValue={student.workingHours}
                  onBlur={e => updateWorkingHours(student._id, e.target.value)}
                  className="border rounded px-2 py-1 text-black"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWorkingHours;
