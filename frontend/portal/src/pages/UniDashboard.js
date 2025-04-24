import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pfp from "../assets/pfp.png";
import { AuthContext } from "../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase imports
import "../index.css";

const UniDashboard = () => {
  const navigate = useNavigate();
  const { profileId } = useContext(AuthContext);
  const [university, setUniversity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUniversity, setUpdatedUniversity] = useState({
    universityName: "",
    establishmentDate: "",
    phone: "",
    address: "",
    faculty: {
      name: "",
      designation: "",
      department: "",
      contact: "",
      collegeEmail: "",
      govID: "",
    },
  });

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/universities/${profileId}`);
        setUniversity(response.data);
        setUpdatedUniversity(response.data); // Initialize updatedUniversity with fetched data
      } catch (error) {
        console.error("Error fetching university data:", error);
      }
    };

    if (profileId) {
      fetchUniversityData();
    }
  }, [profileId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("faculty.")) {
      const fieldName = name.split(".")[1];
      setUpdatedUniversity((prevState) => ({
        ...prevState,
        faculty: {
          ...prevState.faculty,
          [fieldName]: value,
        },
      }));
    } else {
      setUpdatedUniversity((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `university_pfp/${profileId}.png`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await axios.put(`http://localhost:5000/api/universities/profile-image/${profileId}`, {
          profileImage: downloadURL,
        });

        setUniversity((prevState) => ({
          ...prevState,
          profileImage: downloadURL,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/universities/${profileId}`, updatedUniversity);
      setUniversity(updatedUniversity); // Update state with new university data
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving university data:", error);
    }
  };

  if (!university) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen my-5 px-5">
      <div className="w-1/3 dashboard-box flex flex-col items-center px-10 h-[35rem]">
        {/* Profile Image Upload */}
        <div className="bg-[#0e0e0e] w-32 h-32 mb-2 flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute opacity-0"
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <img
              src={university?.profileImage || pfp}
              alt="Institute Logo"
              className="cursor-pointer w-32 h-32 rounded-full object-cover"
            />
          </label>
        </div>

        {/* University Details */}
        <h1 className="text-2xl font-bold mb-2 text-center text-[#FC5F0D]">
          {isEditing ? (
            <input
              type="text"
              name="universityName"
              value={updatedUniversity.universityName}
              onChange={handleInputChange}
              className="text-black text-center"
            />
          ) : (
            university.universityName
          )}
        </h1>
        <p className="text-center text-white">UID - {university._id}</p>
        <p className="text-center text-white">
          Established:{" "}
          {isEditing ? (
            <input
              type="date"
              name="establishmentDate"
              value={updatedUniversity.establishmentDate}
              onChange={handleInputChange}
              className="text-black"
            />
          ) : (
            new Date(university.establishmentDate).toLocaleDateString()
          )}
        </p>
        <p className="text-center text-white">
          Phone:{" "}
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={updatedUniversity.phone}
              onChange={handleInputChange}
              className="text-black"
            />
          ) : (
            university.phone
          )}
        </p>
        <p className="text-center text-white">
          Address:{" "}
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={updatedUniversity.address}
              onChange={handleInputChange}
              className="text-black"
            />
          ) : (
            `${university.address}, ${university.district}, ${university.state}, ${university.country}, ${university.pincode}`
          )}
        </p>
        {/* Faculty Information */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-[#FC5F0D]">Faculty Information</h2>
          {["name", "designation", "department", "contact", "collegeEmail", "govID"].map((field) => (
            <p key={field} className="text-center text-white">
              {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name={`faculty.${field}`}
                  value={updatedUniversity.faculty[field]}
                  onChange={handleInputChange}
                  className="text-black"
                />
              ) : (
                university.faculty[field]
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Buttons to Navigate or Edit Profile */}
      <div className="w-3/4 pl-5">
        {isEditing ? (
          <>
            <button onClick={handleSaveChanges} className="block solid-button p-5 mb-4 mt-2 rounded-lg shadow-lg cursor-pointer">
              Save Changes
            </button>
            <button onClick={toggleEditMode} className="block solid-button p-5 mb-4 mt-2 rounded-lg shadow-lg cursor-pointer">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={toggleEditMode} className="block solid-button p-5 mb-4 mt-2 rounded-lg shadow-lg cursor-pointer">
            Edit Profile
          </button>
        )}
        {/* Navigation Buttons */}
        <a
          onClick={() => navigate("/viewstdrecord")}
          className="block solid-button p-5 mb-4 mt-2 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">View Your Institute's Students Record</h3>
        </a>
        <a
          onClick={() => navigate("/viewstudent")}
          className="block solid-button p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">View Students</h3>
        </a>
        <a
          onClick={() => navigate("/stdregister")}
          className="block solid-button p-5 mb-4 rounded-lg shadow-lg cursor-pointer"
        >
          <h3 className="text-2xl">Add New Student</h3>
        </a>
      </div>
    </div>
  );
};

export default UniDashboard;

