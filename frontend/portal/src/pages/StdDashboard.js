import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import pfp from '../assets/pfp.png';
import { useNavigate } from 'react-router-dom';
import EditStudentModal from '../components/Modal/EditStudentModal';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../index.css';

const StdDashboard = () => {
    const [student, setStudent] = useState({});
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { profileId } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileResponse = await axios.get(`http://https://district-internship-portal-3.onrender.com/api/students/${profileId}`);
                const studentData = profileResponse.data;
                setStudent(studentData);

                const appliedJobsResponse = await axios.get(`http://https://district-internship-portal-3.onrender.com/api/students/${profileId}`);
                const jobIds = appliedJobsResponse.data.appliedJobs.map(job => job.jobId);

                const jobDetailsPromises = jobIds.map(jobId => axios.get(`http://https://district-internship-portal-3.onrender.com/api/internjobposts/${jobId}`));
                const jobDetailsResponses = await Promise.all(jobDetailsPromises);
                const jobDetails = jobDetailsResponses.map(response => response.data);
                
                setJobs(jobDetails);
            } catch (err) {
                console.error('Error fetching profile data or jobs:', err);
            }
        };

        fetchProfileData();
    }, [profileId]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdateProfile = (updatedData) => {
        setStudent(updatedData);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, `pfp/${profileId}.png`);

            try {
                // Upload the file
                await uploadBytes(storageRef, file);
                
                // Get the download URL
                const downloadURL = await getDownloadURL(storageRef);
                
                // Update the student's profile picture URL
                await axios.put(`http://https://district-internship-portal-3.onrender.com/api/
                /pfp/${profileId}`, { profileImage: downloadURL });
                
                // Update the state
                setStudent(prevState => ({
                    ...prevState,
                    profileImage: downloadURL
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="flex h-screen my-5 px-5">
            <div className="w-1/3 dashboard-box flex flex-col items-center px-10 h-[35rem]">
                <div className="bg-[#0e0e0e] w-32 h-32 mb-2 flex items-center justify-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute opacity-0"
                        id="upload-button"
                    />
                    <label htmlFor="upload-button">
                        <img
                            src={student.profileImage || pfp}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-5 cursor-pointer"
                        />
                    </label>
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center text-[#FC5F0D]">{student.name}</h2>
                <p className="text-center text-white"><strong>Student ID:</strong> {student.studentId}</p>
                <p className="text-center text-white"><strong>University ID:</strong> {student.universityId}</p>
                <p className="text-center text-white"><strong>Course:</strong> {student.graduationCourse}</p>
                <p className="text-center text-white"><strong>Batch:</strong> {student.graduationBatch}</p>
                <p className="text-center text-white"><strong>Last Passed Course:</strong> {student.lastPassedCourse}</p>
                <p className="text-center text-white"><strong>Contact Number:</strong> {student.contactNumber}</p>
                <p className="text-center text-white"><strong>Working Hours:</strong> {student.workingHours}</p>
                <button onClick={handleOpenModal} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">Edit Profile</button>
            </div>
            <div className="w-3/4 pl-5">
                <section className="dashboard-box px-5 pb-4">
                    <h3 className="text-3xl mb-2 text-left text-[#FC5F0D]">About</h3>
                    <p className="text-white text-lg">{student.about}</p>
                </section>
                <section>
                    <h2 className="text-xl text-[#FC5F0D] pt-4 pb-2">Applied In</h2>
                    <table>
                        <thead className="text-md text-[#FC5F0D]">
                            <tr>
                                <th className="border px-4 py-2">S. No</th>
                                <th className="border px-4 py-2">Opportunity Type</th>
                                <th className="border px-4 py-2">Profile</th>
                                <th className="border px-4 py-2">Location</th>
                                <th className="border px-4 py-2">Stipend</th>
                                <th className="border px-4 py-2">Selected (Y/N)</th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {jobs.map((job, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{job.opportunityType}</td>
                                    <td className="border px-4 py-2">{job.profile}</td>
                                    <td className="border px-4 py-2">{job.location}</td>
                                    <td className="border px-4 py-2">{job.stipend}</td>
                                    <td className="border px-4 py-2">{student.selectedJob === job._id ? 'Y' : 'N'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section>
                    <div>
                        <a onClick={() => navigate('/viewjobs')} className="block cursor-pointer solid-button px-5 py-3 mt-6 rounded-lg shadow-lg w-auto">
                            <h3 className="text-2xl text-center">View Jobs</h3>
                        </a>
                    </div>
                </section>
            </div>

            {/* Render the EditStudentModal */}
            <EditStudentModal
                student={student}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onUpdate={handleUpdateProfile}
            />
        </div>
    );
};

export default StdDashboard;
