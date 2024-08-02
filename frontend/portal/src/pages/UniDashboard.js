import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pfp from '../assets/pfp.png';
import { AuthContext } from '../context/AuthContext';

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
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 flex flex-col items-center p-10">
        <div className="bg-gray-300 w-32 h-32 mb-4 flex items-center justify-center">
          <img src={pfp} alt="Institute Logo" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">
          {university.universityName}
        </h1>
        <p className="text-center">UID - {university._id}</p>
        <p className="text-center">Established: {new Date(university.establishmentDate).toLocaleDateString()}</p>
        <p className="text-center">Phone: {university.phone}</p>
        <p className="text-center">Address: {university.address}, {university.district}, {university.state}, {university.country}, {university.pincode}</p>
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">Faculty Information</h2>
          <p>Name: {university.faculty.name}</p>
          <p>Designation: {university.faculty.designation}</p>
          <p>Department: {university.faculty.department}</p>
          <p>Contact: {university.faculty.contact}</p>
          <p>Email: {university.faculty.collegeEmail}</p>
          <p>Gov ID: {university.faculty.govID}</p>
        </div>
      </div>
      <div className="w-3/4 pl-5">
        <a
          onClick={() => navigate('/viewstdrecord')}
          className="block bg-gray-100 p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">View Your Institute's Students Record</h3>
        </a>
        <a
          onClick={() => navigate('/stdregister')}
          className="block bg-gray-100 p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">Add New Student</h3>
        </a>
      </div>
    </div>
  );
};

export default UniDashboard;
