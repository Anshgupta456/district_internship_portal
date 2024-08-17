import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png';
import '../index.css';
import EditGovModal from '../components/Modal/EditGovModal';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase imports

const Dashboard = () => {
  const navigate = useNavigate();
  const { profileId } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = (updatedData) => {
    setProfileData(updatedData);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `gov_pfp/${profileId}.png`);

      try {
        // Upload the file
        await uploadBytes(storageRef, file);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        
        // Update the government's profile picture URL
        await axios.put(`http://localhost:5000/api/government/profile-image/${profileId}`, { profileImage: downloadURL });
        
        // Update the state
        setProfileData(prevState => ({
          ...prevState,
          profilePicture: downloadURL
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen my-5 px-5">
      <div className="w-1/3 dashboard-box flex flex-col items-center px-10 h-[35rem]">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute opacity-0"
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <img
                className="w-full h-full rounded-full cursor-pointer"
                src={profileData ? profileData.profilePicture : pfp}
                alt="Profile"
              />
            </label>
          </div>
          {profileData ? (
            <>
              <h2 className="text-2xl font-semibold mb-2 text-center text-[#FC5F0D]">{profileData.departmentName}</h2>
              <p className="text-center text-white">Officer Name: {profileData.name}</p>
              <p className="text-center text-white">Officer’s Designation: {profileData.designation}</p>
              <p className="text-center text-white">Contact Number: {profileData.phno}</p>
              <p className="text-center text-white">E-Mail ID: {profileData.user?.email}</p>
              <button onClick={handleOpenModal} className="mt-4 px-4 py-2 bg-[#FC5F0D] text-white rounded-lg">
                Edit Profile
              </button>
            </>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="w-3/4 pl-5">
        <div
          onClick={() => navigate('/jobs')}
          className="block p-5 mb-4 rounded-lg shadow-lg solid-button cursor-pointer"
        >
          <h3 className="text-2xl">Post Work Opportunity</h3>
        </div>
        <div
          onClick={() => navigate('/govrestracker')}
          className="block p-5 mb-4 rounded-lg shadow-lg solid-button cursor-pointer"
        >
          <h3 className="text-2xl">Track Responses of Current Opening</h3>
        </div>
        <div
          onClick={() => navigate('/viewjobs')}
          className="block p-5 mb-4 rounded-lg shadow-lg solid-button cursor-pointer"
        >
          <h3 className="text-2xl">View Your History</h3>
        </div>
        <div
          onClick={() => navigate('/workinghours')}
          className="block p-5 mb-4 rounded-lg shadow-lg solid-button cursor-pointer"
        >
          <h3 className="text-2xl">Manage Working Hours</h3>
        </div>
      </div>
      {/* Render the EditGovModal */}
      <EditGovModal
        profileData={profileData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default Dashboard;
