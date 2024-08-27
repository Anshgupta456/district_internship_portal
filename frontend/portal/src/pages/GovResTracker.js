import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png'
import locationIcon from '../assets/location.svg'
import stipendIcon from '../assets/stipend.svg'
import dateIcon from '../assets/date.svg'

const GovResTracker = () => {
  const [jobs, setJobs] = useState([]);
  const { id, role } = useContext(AuthContext);

  useEffect(() => {
      const fetchJobData = async () => {
          try {
              if (role === 'government') {
                  const jobsResponse = await axios.get(`http://https://district-internship-portal-3.onrender.com/api/users/profile/government/${id}`);
                  const jobIds = jobsResponse.data.jobPosts;

                  // Fetch complete job details for each job ID
                  const jobDetailsPromises = jobIds.map(jobId => axios.get(`http://https://district-internship-portal-3.onrender.com/api/internJobPosts/${jobId}`));
                  const jobDetailsResponses = await Promise.all(jobDetailsPromises);
                  const completeJobDetails = jobDetailsResponses.map(response => response.data);

                  setJobs(completeJobDetails);
              } else if (role === 'student') {
                  const jobsResponse = await axios.get(`http://https://district-internship-portal-3.onrender.com/api/internJobPosts`);
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
          <h1 className="text-2xl mb-5 text-[#FC5F0D] text-center">Select Job to see Applicants</h1>
          <div className="space-y-5">
              {jobs.map((job, index) => (
                  <div key={index} className="dashboard-box p-9 h-40 pt-3 flex justify-between items-center shadow-md">
                      <div>
                          <h2 className="text-2xl font-semibold text-[#FC5F0D]">{job.profile}</h2>
                          <p className="text-white">{job.department}</p>
                          <div className="flex space-x-2 mt-7 text-white text-lg">
                              <div className="flex items-center space-x-1">
                                  <img src={locationIcon} alt="Location Icon" className="w-5 h-5" />
                                  <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                  <img src={stipendIcon} alt="Location Icon" className="w-5 h-5" />
                                  <span>{job.stipend}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                  <img src={dateIcon} alt="Location Icon" className="w-5 h-5" />
                                  <span>{new Date(job.startingDate).toLocaleDateString()}</span>
                              </div>
                          </div>
                      </div>
                      <div className="flex items-center">
                          <img src={job.logo?job.logo:pfp} alt="" className="w-16 h-16 rounded-full mr-7 mt-[1.25rem]" />
                          <Link to={`/response/${job._id}`} className="solid-button p-3 rounded-md mt-[1.25rem]">View Details</Link>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default GovResTracker;