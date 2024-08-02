import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import '../styles/Register.css';

function Register({ history }) {
  const [formData, setFormData] = useState({
    universityId: '',
    universityName: '',
    phone: '',
    establishmentDate: '',
    country: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    faculty: {
      name: '',
      designation: '',
      department: '',
      contact: '',
      collegeEmail: '',
      femail: '',
      govID: '',
    },
  });

  const [user, setUser] = useState({
    role: 'university',
    email: '',
    password: '',
  });

  const [documents, setDocuments] = useState({
    govIDDocument: null,
    collegeIDDocument: null,
    signature: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in user) {
      setUser({ ...user, [name]: value });
    } else if (name in formData.faculty) {
      setFormData({ ...formData, faculty: { ...formData.faculty, [name]: value } });
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

    // Validate university ID format
    const universityIdPattern = /^[A-Za-z]{4}\d{4}$/;
    if (!universityIdPattern.test(formData.universityId)) {
      alert('University ID must be 4 alphabetic characters followed by 4 numeric characters (e.g., ABCD1234)');
      return;
    }

    const documentURLs = {};
    for (const key in documents) {
      if (documents[key]) {
        try {
          const url = await uploadImage(documents[key], `${formData.universityName}_${key}`);
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

    try {
      await axios.post('http://localhost:5000/api/universities/register', fullFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>University Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            University ID:
            <input
              type="text"
              name="universityId"
              value={formData.universityId}
              onChange={handleInputChange}
              required
              pattern="^[A-Za-z]{4}\d{4}$"
              title="University ID must be 4 alphabetic characters followed by 4 numeric characters (e.g., ABCD1234)"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            University Name:
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Establishment Date:
            <input
              type="date"
              name="establishmentDate"
              value={formData.establishmentDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            District:
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Pincode:
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <h2>Faculty Registration</h2>
          <label>
            Faculty Name:
            <input
              type="text"
              name="name"
              value={formData.faculty.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Designation:
            <input
              type="text"
              name="designation"
              value={formData.faculty.designation}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.faculty.department}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contact:
            <input
              type="text"
              name="contact"
              value={formData.faculty.contact}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            College Email:
            <input
              type="email"
              name="collegeEmail"
              value={formData.faculty.collegeEmail}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Faculty Email:
            <input
              type="email"
              name="femail"
              value={formData.faculty.femail}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Government ID:
            <input
              type="text"
              name="govID"
              value={formData.faculty.govID}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <h3>Documents</h3>
        <div className="form-group">
          <label>
            Government ID Document:
            <input
              type="file"
              name="govIDDocument"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            College ID Document:
            <input
              type="file"
              name="collegeIDDocument"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Signature:
            <input
              type="file"
              name="signature"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
