import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudentModal = ({ student, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        graduationCourse: '',
        graduationBatch: '',
        contactNumber: '',
        lastPassedCourse: '',
        about: '',
    });

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name || '',
                studentId: student.studentId || '',
                graduationCourse: student.graduationCourse || '',
                graduationBatch: student.graduationBatch || '',
                contactNumber: student.contactNumber || '',
                lastPassedCourse: student.lastPassedCourse || '',
                about: student.about || '',
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://https://district-internship-portal-3.onrender.com/api/students/${student._id}`, formData);
            onUpdate(formData);
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Student ID</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Course</label>
                        <input
                            type="text"
                            name="graduationCourse"
                            value={formData.graduationCourse}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Batch</label>
                        <input
                            type="text"
                            name="graduationBatch"
                            value={formData.graduationBatch}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Passed Course</label>
                        <input
                            type="text"
                            name="lastPassedCourse"
                            value={formData.lastPassedCourse}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">About</label>
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 mr-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudentModal;
