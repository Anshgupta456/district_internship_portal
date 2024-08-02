import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-24 bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold text-center text-blue-600">Welcome to the Portal</h1>
        <p className="mt-4 text-center text-gray-700">
          Connecting college students with government service opportunities.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Register Yourself as</h2>
          <ul className="flex flex-col items-center mt-4 space-y-4">
            <li>
              <Link 
                to="/GovRegister"
  
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Student
              </Link>
            </li>
            <li>
              <Link 
                to="/GovRegister" 
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Government
              </Link>
            </li>
            <li>
              <Link 
                to="/UniRegister" 
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                University
              </Link>
            </li>
          </ul>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">For Government</h2>
            <Link 
              to="/GovResTracker" 
              className="inline-block px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
            >
              View Student's Responses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
