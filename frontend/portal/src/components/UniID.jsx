// src/components/UniID.js
import React from 'react';

const UniID = ({ show, message, onClose }) => {
  const handleClose = () => {
    onClose(true);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{message}</h2>

        <button
          onClick={handleClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UniID;
