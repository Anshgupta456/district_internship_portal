import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pfp from '../assets/pfp.png';
import { AuthContext } from '../context/AuthContext';
import '../index.css';

const UniDashboard = () => {
  const navigate = useNavigate();
  const { profileId } = useContext(AuthContext);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/universities/${profileId}`);
        setUniversity(response.data);
      } catch (error) {
        console.error('Error fetching university data:', error);
      }
    };

    if (profileId) {
      fetchUniversityData();
    }
  }, [profileId]);

  if (!university) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen my-5 px-5">
      <div className="w-1/3 dashboard-box flex flex-col items-center px-10 h-[35rem]">
        <div className="bg-[#0e0e0e] w-32 h-32 mb-2 flex items-center justify-center">
          <img src={pfp} alt="Institute Logo" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center text-[#FC5F0D]">
          {university.universityName}
        </h1>
        <p className="text-center text-white">UID - {university._id}</p>
        <p className="text-center text-white">Established: {new Date(university.establishmentDate).toLocaleDateString()}</p>
        <p className="text-center text-white">Phone: {university.phone}</p>
        <p className="text-center text-white">Address: {university.address}, {university.district}, {university.state}, {university.country}, {university.pincode}</p>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-[#FC5F0D]">Faculty Information</h2>
          <p className="text-center text-white">Name: {university.faculty.name}</p>
          <p className="text-center text-white">Designation: {university.faculty.designation}</p>
          <p className="text-center text-white">Department: {university.faculty.department}</p>
          <p className="text-center text-white">Contact: {university.faculty.contact}</p>
          <p className="text-center text-white">Email: {university.faculty.collegeEmail}</p>
          <p className="text-center text-white">Gov ID: {university.faculty.govID}</p>
        </div>
      </div>
      <div className="w-3/4 pl-5">
        <a
          onClick={() => navigate('/viewstdrecord')}
          className="block solid-button p-5 mb-4 mt-2 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">View Your Institute's Students Record</h3>
        </a>
        <a
          onClick={() => navigate('/viewstudent')}
          className="block solid-button p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">View Students</h3>
        </a>
        <a
          onClick={() => navigate('/stdregister')}
          className="block solid-button p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">Add New Student</h3>
        </a>
      </div>
    </div>
  );
};

export default UniDashboard;
