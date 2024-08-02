import React from 'react';
import { Link } from 'react-router-dom';
import Man from '../assets/Man.png';
import '../index.css'

function Home() {
  return (
    <div class="body flex-flex-col">
      <div class="description flex flex-row">
        <div class="text flex flex-col justify-center text-white px-12">
          <div class="heading text-8xl mb-3">Evolve with Government</div>
          <div class="about text-2xl w-1/2 ml-2">Connecting College Students with Government opportunities</div>
        </div>
        <div class="image px-40">
          <img src={Man} alt="Homepage introduction" class="w-auto" />
        </div>
      </div>

      {/* Register Box */}
      <div class="flex flex-col items-center p-16">
        <div className="box w-1/5 shadow-md">
          <h2 className="text-2xl font-semibold text-center text-[#FC5F0D] mb-10">Register Yourself</h2>
          <ul className="flex flex-col items-center my-4 space-y-6">
            <li>
              <Link
                to="/StdRegister"

                className="px-6 py-2 text-white transparent-button hover:bg-[#FC5F0D]"
              >
                As Student
              </Link>
            </li>
            <li>
              <Link
                to="/GovRegister"
                className="px-2 py-2 text-white transparent-button hover:bg-[#FC5F0D] w-9"
              >
                As Government
              </Link>
            </li>
            <li>
              <Link
                to="/UniRegister"
                className="px-4 py-2 text-white transparent-button hover:bg-[#FC5F0D]"
              >
                As University
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  );
}

export default Home;
