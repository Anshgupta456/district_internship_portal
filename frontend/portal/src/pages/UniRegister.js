import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

function Register({ history }) {
  const [Uname, setUname] = useState('Uname');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [estDate, setestDate] = useState('');
  const [country, setcountry] = useState('');
  const [state, setstate] = useState('');
  const [district, setdistrict] = useState('');
  const [pincode, setpincode] = useState('');
  const [address, setaddress] = useState('');
  const [fname, setfname] = useState('');
  const [fdesignation, setfdesignation] = useState('');
  const [fdepartment, setfdepartment] = useState('');
  const [fcontact, setfcontact] = useState('');
  const [fclgemail, setfclgemail] = useState('');
  const [femail, setfemail] = useState('');
  const [fgovID, setfgovID] = useState('');
  const [fdocuments, setfdocuments] = useState('');
  const [fgIDdoc, setfgIDdoc] = useState('');
  const [fcIDdoc, setfcIDdoc] = useState('');
  const [fsign, setfsign] = useState('');


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      Uname,
      email,
      phone,
      estDate,
      country,
      state,
      district,
      pincode,
      address,
      fname,
      fdesignation,
      fdepartment,
      fcontact,
      fclgemail,
      femail,
      fgovID,
      fdocuments,
      fgIDdoc,
      fcIDdoc,
      fsign,
    };

    try {
      const response = await axios.post('/api/register', formData);
      console.log(response.data);
      // handle success (e.g., show a success message)
    } catch (error) {
      console.error(error);
      // handle error (e.g., show an error message)
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>University Registration</h2>
        <div className="form-group">
          <label>
            University Name:
            <input type="text" value={Uname} onChange={(e) => setUname(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone:
            <input type="text" value={phone} onChange={(e) => setphone(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Establishment Date:
            <input type="date" value={estDate} onChange={(e) => setestDate(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Country:
            <input type="text" value={country} onChange={(e) => setcountry(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            State:
            <input type="text" value={state} onChange={(e) => setstate(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            District:
            <input type="text" value={district} onChange={(e) => setdistrict(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Pincode:
            <input type="text" value={pincode} onChange={(e) => setpincode(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Address:
            <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <h2>Faculty Registration</h2>
          <label>
            Faculty Name:
            <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Designation:
            <input type="text" value={fdesignation} onChange={(e) => setfdesignation(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Department:
            <input type="text" value={fdepartment} onChange={(e) => setfdepartment(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contact:
            <input type="text" value={fcontact} onChange={(e) => setfcontact(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            College Email:
            <input type="email" value={fclgemail} onChange={(e) => setfclgemail(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" value={femail} onChange={(e) => setfemail(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Government ID:
            <input type="text" value={fgovID} onChange={(e) => setfgovID(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Documents:
            <input type="text" value={fdocuments} onChange={(e) => setfdocuments(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Government ID Document:
            <input type="text" value={fgIDdoc} onChange={(e) => setfgIDdoc(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            College ID Document:
            <input type="text" value={fcIDdoc} onChange={(e) => setfcIDdoc(e.target.value)} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Signature:
            <input type="text" value={fsign} onChange={(e) => setfsign(e.target.value)} />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;