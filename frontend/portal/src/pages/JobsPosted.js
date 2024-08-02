import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const JobsPosted = ({ job }) => {    
    const { profileId, role } = useContext(AuthContext);

    const handleApply = async () => {
        try {
            await axios.post(`http://localhost:5000/api/internjobposts/${job._id}/apply`, {
                studentId: profileId
            });
            alert('Application submitted successfully');
        } catch (error) {
            console.error('Error applying for the job', error);
            alert('Error applying for the job');
        }
    };

    return (
        <div className="p-5 min-h-screen bg-gray-50">
            <h1 className="text-3xl mb-5">Job Details</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Field</th>
                            <th className="border px-4 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Opportunity Type</td>
                            <td className="border px-4 py-2">{job.opportunityType}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Profile</td>
                            <td className="border px-4 py-2">{job.profile}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Skills Required</td>
                            <td className="border px-4 py-2">
                                {Array.isArray(job.skillsRequired) ? job.skillsRequired.join(', ') : job.skillsRequired}
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Location</td>
                            <td className="border px-4 py-2">{job.location}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Number of Openings</td>
                            <td className="border px-4 py-2">{job.numberOfOpenings}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Starting Date</td>
                            <td className="border px-4 py-2">{new Date(job.startingDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Duration</td>
                            <td className="border px-4 py-2">{job.duration}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Responsibilities</td>
                            <td className="border px-4 py-2">
                                {Array.isArray(job.responsibilities) ? job.responsibilities.join(', ') : job.responsibilities}
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Additional Preferences</td>
                            <td className="border px-4 py-2">{job.additionalPreferences}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Stipend</td>
                            <td className="border px-4 py-2">{job.stipend}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Perks</td>
                            <td className="border px-4 py-2">
                                <ul className="list-disc list-inside">
                                    {Object.entries(job.perks).map(([key, value]) => (
                                        value && <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {role === 'student' && (
                <div className="flex justify-center mt-5">
                    <button 
                        onClick={handleApply} 
                        className="bg-customGreen text-white py-2 px-4 rounded"
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobsPosted;
