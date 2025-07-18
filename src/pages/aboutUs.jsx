import React from 'react';
import { Link } from 'react-router-dom';
import bgVideo from '../assets/bg-vedio.mp4';


const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden z-10 font-[Poppins]">
      <video className="fixed top-0 left-0 w-screen h-screen object-cover -z-10" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex items-center justify-center mt-10">
        <h1 className="text-4xl text-blue-600">We are from Antarix</h1>
      </div>

      <div className="flex items-center justify-center mt-4 px-4">
        <p className="text-white font-bold text-xl text-center">
          Fueling curious minds through free, intelligent, and interactive reading experiences
        </p>
      </div>

      <div className="flex justify-between flex-wrap mt-28 w-[60%] bg-white rounded-lg shadow-lg p-4 z-10">
        {/* Box 1 */}
        <div className="flex flex-col items-center bg-black h-72 w-60 m-4 rounded-lg shadow-xl">
          <h2 className="mt-4 text-2xl text-blue-600 text-center">Diverse Content</h2>
          <div className="flex justify-center items-center mt-5 px-2">
            <p className="text-center text-white text-lg">
              Read across genres like Literature, Coding, Hindi Sahitya, Science, Anime, and more all in one place
            </p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex flex-col items-center bg-black h-72 w-60 m-4 rounded-lg shadow-xl">
          <Link to="/our-team" className="no-underline">
            <h2 className="mt-4 text-2xl text-blue-600 text-center">Our Team</h2>
          </Link>
          <div className="flex justify-center items-center mt-5 px-2">
            <p className="text-center text-white text-lg">
              Know more about our enthusiastic team. Full of passionate people
            </p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="flex flex-col items-center bg-black h-72 w-60 m-4 rounded-lg shadow-xl">
          <h2 className="mt-4 text-2xl text-blue-600 text-center">Smart Reading Tools</h2>
          <div className="flex justify-center items-center mt-5 px-2">
            <p className="text-center text-white text-lg">
              Track your reading journey, resume books, rate content, and explore without limits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;




