import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png'

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { id, role } = useContext(AuthContext);

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                if (role === 'government') {
                    const jobsResponse = await axios.get(`http://localhost:5000/api/users/profile/government/${id}`);
                    const jobIds = jobsResponse.data.jobPosts;

                    // Fetch complete job details for each job ID
                    const jobDetailsPromises = jobIds.map(jobId => axios.get(`http://localhost:5000/api/internJobPosts/${jobId}`));
                    const jobDetailsResponses = await Promise.all(jobDetailsPromises);
                    const completeJobDetails = jobDetailsResponses.map(response => response.data);

                    setJobs(completeJobDetails);
                } else if (role === 'student') {
                    const jobsResponse = await axios.get(`http://localhost:5000/api/internJobPosts`);
                    setJobs(jobsResponse.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchJobData();
    }, [id, role]);

    return (
        <div className="p-5">
            <h1 className="text-2xl mb-5">View Jobs</h1>
            <div className="space-y-5">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-gray-100 p-5 flex justify-between items-center shadow-md">
                        <div>
                            <h2 className="text-xl font-bold">{job.profile}</h2>
                            <p className="text-gray-700">{job.department}</p>
                            <div className="flex space-x-2 mt-2 text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657A8 8 0 1116.657 17.657"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 13.263a9 9 0 01-.41 4.697l-.53 1.487a2.048 2.048 0 01-2.566 1.314L8.217 17.28a2.048 2.048 0 01-1.314-2.566l1.487-.53a9 9 0 014.697-.41z"></path>
                                    </svg>
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                                    </svg>
                                    <span>{job.stipend}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h4M8 11h4m-6 4h6M6 15h6m6 0h-6m-6 0H4m12-4h2M8 7h4"></path>
                                    </svg>
                                    <span>{new Date(job.startingDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src={job.logo?job.logo:pfp} alt="" className="w-16 h-16 rounded-full mr-5" />
                            <Link to={`/jobdescription/${job._id}`} className="bg-blue-500 text-white p-3 rounded-md">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewJobs;
