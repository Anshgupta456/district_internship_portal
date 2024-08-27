import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import TNC from '../components/TNC';
import UniID from '../components/UniID';
import '../styles/Register.css';
import '../styles/Loading.css';

function Register() {
  const [formData, setFormData] = useState({
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
  const navigate = useNavigate();
  const { tncAccepted, setTncAccepted } = useContext(Context);
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

  const [showTNC, setShowTNC] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const toggleModal = (accepted) => {
    setShowTNC(!showTNC);
    if (accepted) {
      setTncAccepted(true);
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTNC(true);
  };

  useEffect(() => {
    if (tncAccepted) {
      setTncAccepted(false)
      register();
    }
  }, [tncAccepted]);

  const register = async () => {

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
      const response = await axios.post('http://https://district-internship-portal-3.onrender.com/api/universities/register', fullFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponseMessage(response.data.message);
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Registration failed. Please try again.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="register-container"> <h2 class="text-2xl text-[#FC5F0D] font-semibold">University Registration</h2>
      <TNC show={showTNC} onClose={toggleModal} />
      <UniID show={showModal} message={responseMessage} onClose={handleCloseModal} />
      <form onSubmit={handleSubmit}>
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
