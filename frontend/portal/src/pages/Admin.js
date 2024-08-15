import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png';
import '../index.css';

const Admin = () => {
  const navigate = useNavigate();
  const { profileId } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (profileId) {
      axios.get(`http://localhost:5000/api/government/${profileId}`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the profile data!', error);
        });
    }
  }, [profileId]);

  return (
    <div className="flex h-screen my-5 px-5">
      {/* Profile Section */}
      <div className="w-1/3 dashboard-box flex flex-col items-center px-10 h-[35rem]">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full mb-2">
            <img
              className="w-full h-full rounded-full"
              src={profileData ? profileData.profilePicture : pfp}
              alt="Profile"
            />
          </div>
          {profileData ? (
            <>
              <h2 className="text-2xl font-semibold mb-2 text-center text-[#FC5F0D]">{profileData.departmentName}</h2>
              <p className="text-center text-white">Officer Name: {profileData.name}</p>
              <p className="text-center text-white">Officer’s Designation: {profileData.designation}</p>
              <p className="text-center text-white">Contact Number: {profileData.phno}</p>
              <p className="text-center text-white">E-Mail ID: {profileData.user.email}</p>
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
          <button className="mt-4 px-4 py-2 bg-[#FC5F0D] text-white rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Admin Content */}
      <div className="w-3/4 pl-5">
        <div
          onClick={() => navigate('/govregister')}
          className="block p-5 mb-4 text-center rounded-lg shadow-lg solid-button cursor-pointer"
        >
          <h3 className="text-2xl">Add Government Person</h3>
        </div>
      </div>
    </div>
  );
};

export default Admin;
