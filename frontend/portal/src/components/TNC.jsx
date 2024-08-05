// src/components/TNC.js
import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';

const TNC = ({ show, onClose }) => {
  const { tncAccepted, setTncAccepted } = useContext(Context);
  const [isChecked, setIsChecked] = useState(tncAccepted);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClose = () => {
    if (isChecked) {
      setTncAccepted(true);
      onClose(true);
    } else {
      onClose(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
        <p className="mb-4">Please accept the terms and conditions to proceed.</p>
        <div className="flex items-center justify-center mb-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            className="mr-2"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheckbox" className="text-gray-700">
            I accept the terms and conditions
          </label>
        </div>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TNC;
