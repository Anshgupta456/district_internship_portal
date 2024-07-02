import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Opportunities</h2>
      {jobs.map(job => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Eligibility: {job.eligibilityCriteria}</p>
          <p>Stipend: {job.stipend}</p>
          <p>Openings: {job.openings}</p>
          <p>Location: {job.location}</p>
          <button>Apply</button>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
