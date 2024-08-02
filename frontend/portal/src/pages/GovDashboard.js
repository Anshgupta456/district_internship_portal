import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png'

const Dashboard = () => {
  const navigate = useNavigate();
  const { profileId, role } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (profileId) {
      axios.get(`http://localhost:5000/api/government/${profileId}`)
        .then(response => {
          console.log(`http://localhost:5000/api/government/${profileId}`);
          console.log(response.data);
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the profile data!', error);
        });
    }
  }, [profileId]);

  return (
    <div className="flex p-5 min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-100 p-5 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4">
            <img
              className="w-full h-full rounded-full"
              src={profileData ? profileData.profilePicture : pfp}
              alt="Profile"
            />
          </div>
          {profileData ? (
            <>
              <h3 className="text-xl font-bold">{profileData.departmentName}</h3>
              <p className="mt-2">Officer Name: {profileData.name}</p>
              <p>Officer’s Designation: {profileData.designation}</p>
              <p>Contact Number: {profileData.phno}</p>
              <p>E-Mail ID: {profileData.user.email}</p>
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-3/4 pl-5">
        <div
          onClick={() => navigate('/jobs')}
          className="block bg-gray-100 p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">Post Work Opportunity</h3>
        </div>
        <div
          onClick={() => navigate('/govrestracker')}
          className="block bg-gray-100 p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">Track Responses of Current Opening</h3>
        </div>
        <div
          onClick={() => navigate('/viewjobs')}
          className="block bg-gray-100 p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">View Your History</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
