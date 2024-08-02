import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png';
import { useNavigate } from 'react-router-dom';

const StdDashboard = () => {
    const [student, setStudent] = useState({});
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const { profileId } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch the student profile data
                const profileResponse = await axios.get(`http://localhost:5000/api/students/${profileId}`);
                const studentData = profileResponse.data;
                setStudent(studentData);

                // Fetch the jobs IDs associated with the student
                const appliedJobsResponse = await axios.get(`http://localhost:5000/api/students/${profileId}`);
                const jobIds = appliedJobsResponse.data.appliedJobs.map(job => job.jobId);

                // Fetch the jobs details using the job IDs
                const jobDetailsPromises = jobIds.map(jobId => axios.get(`http://localhost:5000/api/internjobposts/${jobId}`));
                const jobDetailsResponses = await Promise.all(jobDetailsPromises);
                const jobDetails = jobDetailsResponses.map(response => response.data);
                
                setJobs(jobDetails);
            } catch (err) {
                console.error('Error fetching profile data or jobs:', err);
            }
        };

        fetchProfileData();
    }, [profileId]);

    return (
        <div className="flex">
            <div className="bg-gray-100 p-5 w-72 shadow-md">
                <img src={student.profilePicture || pfp} alt="Profile" className="w-24 h-24 rounded-full mb-5" />
                <h2 className="text-2xl mb-2">{student.name}</h2>
                <p><strong>Student ID:</strong> {student.studentId}</p>
                <p><strong>Course:</strong> {student.graduationCourse}</p>
                <p><strong>Contact Number:</strong> {student.contactNumber}</p>
                
                <button className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">Edit Profile</button>
            </div>
            <div className="p-5 flex-grow">
                <section className="mb-5">
                    <h3 className="text-xl mb-2">About</h3>
                    <p>{student.about}</p>
                </section>
                <section className="mb-5">
                    <h3 className="text-xl mb-2">Applied In</h3>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">S. No</th>
                                <th className="border px-4 py-2">Opportunity Type</th>
                                <th className="border px-4 py-2">Profile</th>
                                <th className="border px-4 py-2">Location</th>
                                <th className="border px-4 py-2">Stipend</th>
                                <th className="border px-4 py-2">Selected (Y/N)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{job.opportunityType}</td>
                                    <td className="border px-4 py-2">{job.profile}</td>
                                    <td className="border px-4 py-2">{job.location}</td>
                                    <td className="border px-4 py-2">{job.stipend}</td>
                                    <td className="border px-4 py-2">{job.selected ? 'Y' : 'N'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <div className="w-3/4 pl-5">
                    <a onClick={() => navigate('/viewjobs')} className="block cursor-pointer bg-gray-100 p-5 mb-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl text-center">View Jobs</h3>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StdDashboard;
