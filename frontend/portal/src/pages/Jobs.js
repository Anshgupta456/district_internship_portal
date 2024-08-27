import React, { useContext, useState,useEffect } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OpportunityForm = () => {

    const {profileId,role} = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        opportunityType: '',
        profile: '',
        skillsRequired: '',
        location: '',
        numberOfOpenings: '',
        startingDate: '',
        duration: '',
        responsibilities: '',
        additionalPreferences: '',
        stipend: '',
        perks: [],
        governmentId : profileId
    });

    useEffect(() => {
        // Check the user role and navigate if not government
        if (role !== 'government') {
          navigate('/');
        }
      }, [role]);

    useEffect(() => {
        // Set the governmentId once profileId is available
        if (profileId) {
          setFormData((prevData) => ({
            ...prevData,
            governmentId: profileId
          }));
        }
      }, [profileId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePerksChange = (e) => {
        const { value, checked } = e.target;
        const newPerks = checked
            ? [...formData.perks, value]
            : formData.perks.filter(perk => perk !== value);
        setFormData({ ...formData, perks: newPerks });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://https://district-internship-portal-3.onrender.com/api/internJobPosts', formData);
            console.log(profileId)
            alert('Opportunity posted successfully');
        } catch (error) {
            console.log(profileId)
            alert('Error posting opportunity');
        }
    };

    return (
        <div className="register-container"> <h2 class="text-2xl text-[#FC5F0D] font-semibold">Post Internship/Volunteer Opportunity</h2>
            <form onSubmit={handleSubmit}>
                <div className="radio-group">
                    <label>Opportunity Type</label>
                    <input type="radio" name="opportunityType" value="Internship" onChange={handleChange} /> Internship
                    <input type="radio" name="opportunityType" value="Volunteer" onChange={handleChange} /> Volunteer
                </div>
                <div className="form-group">
                    <label>Profile</label>
                    <input type="text" name="profile" value={formData.profile} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Skills Required</label>
                    <input type="text" name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="radio" name="location" value="On-Site" onChange={handleChange} /> On-Site
                    <input type="radio" name="location" value="Hybrid" onChange={handleChange} /> Hybrid
                    <input type="radio" name="location" value="Remote" onChange={handleChange} /> Remote
                </div>
                <div className="form-group">
                    <label>Number of Openings</label>
                    <input type="number" name="numberOfOpenings" value={formData.numberOfOpenings} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Starting Date</label>
                    <input type="date" name="startingDate" value={formData.startingDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Duration</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Intern's/Volunteer's Responsibilities</label>
                    <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Additional Preferences (optional)</label>
                    <textarea name="additionalPreferences" value={formData.additionalPreferences} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Stipend</label>
                    <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Perks</label>
                    <div>
                        <input type="checkbox" value="Certificate" onChange={handlePerksChange} /> Certificate
                        <input type="checkbox" value="Letter of Recommendation" onChange={handlePerksChange} /> Letter of Recommendation
                        <input type="checkbox" value="Flexible Work Hours" onChange={handlePerksChange} /> Flexible Work Hours
                        <input type="checkbox" value="Free Food Facility" onChange={handlePerksChange} /> Free Food Facility
                        <input type="checkbox" value="Traveling Allowance" onChange={handlePerksChange} /> Traveling Allowance
                    </div>
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default OpportunityForm;
