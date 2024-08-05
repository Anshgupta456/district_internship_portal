// src/pages/StudentRegister.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import TNC from '../components/TNC';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

function StudentRegister() {
  const { profileId, role } = useContext(AuthContext);
  const { tncAccepted, setTncAccepted } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityId: role === 'university' ? profileId : '',
    name: '',
    contactNumber: '',
    studentId: '',
    aadharNumber: '',
    lastPassedCourse: '',
    graduationBatch: '',
    graduationCourse: '',
    about: '',
  });

  const [user, setUser] = useState({
    role: 'student',
    email: '',
    password: '',
  });

  const [documents, setDocuments] = useState({
    aadharCard: null,
    highSchoolCertificate: null,
    secondarySchoolCertificate: null,
    passportPhoto: null,
    signature: null,
  });

  const [showTNC, setShowTNC] = useState(false);

  const toggleModal = (accepted) => {
    setShowTNC(!showTNC);
    if (accepted) {
      setTncAccepted(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'password') {
      setUser({ ...user, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setDocuments({ ...documents, [name]: files[0] });
    }
  };

  const uploadImage = (file, name) => {
    const storageRef = ref(storage, `documents/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Add progress indicator
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tncAccepted) {
      register();
    } else {
      setShowTNC(true);
    }
  };

  const register = async () => {
    const documentURLs = {};
    for (const key in documents) {
      if (documents[key]) {
        try {
          const url = await uploadImage(documents[key], `${formData.studentId}_${key}`);
          documentURLs[key] = url;
        } catch (error) {
          console.error(`Error uploading ${key}:`, error);
        }
      }
    }

    const fullFormData = {
      ...formData,
      documents: documentURLs,
      user,
    };

    const endpoint = role === 'university'
      ? 'http://localhost:5000/api/universities/students/register'
      : 'http://localhost:5000/api/students/register';

    try {
      await axios.post(endpoint, fullFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="register-container">
      <TNC show={showTNC} onClose={toggleModal} />
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        {role !== 'university' ? (
          <div className="form-group">
            <label>
              University ID
              <input
                type="text"
                name="universityId"
                value={formData.universityId}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
        ) : (
          <div className="form-group">
            <label>
              University ID
              <input
                type="text"
                name="universityId"
                value={profileId}
                disabled
              />
            </label>
          </div>
        )}

        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Contact Number', name: 'contactNumber', type: 'text' },
          { label: 'Student ID (Enrollment Number)', name: 'studentId', type: 'text' },
          { label: 'Aadhar Number (Pattern **** **** ****)', name: 'aadharNumber', type: 'text' },
          { label: 'Last Passed Course', name: 'lastPassedCourse', type: 'text' },
          { label: 'Graduation Batch', name: 'graduationBatch', type: 'text' },
          { label: 'Graduation Course', name: 'graduationCourse', type: 'text' },
          { label: 'About You', name: 'about', type: 'textarea' },
        ].map(({ label, name, type }) => (
          <div className="form-group" key={name}>
            <label>{label}
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                />
              )}
            </label>
          </div>
        ))}

        {[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ].map(({ label, name, type }) => (
          <div className="form-group" key={name}>
            <label>{label}
              <input
                type={type}
                name={name}
                value={user[name]}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
        ))}

        {[
          { label: 'Aadhar Card', name: 'aadharCard' },
          { label: 'High School Certificate', name: 'highSchoolCertificate' },
          { label: 'Secondary School Certificate', name: 'secondarySchoolCertificate' },
          { label: 'Passport Size Photograph', name: 'passportPhoto' },
          { label: 'Signature', name: 'signature' },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}
              <input
                type="file"
                name={name}
                onChange={handleFileChange}
              />
            </label>
          </div>
        ))}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default StudentRegister;
