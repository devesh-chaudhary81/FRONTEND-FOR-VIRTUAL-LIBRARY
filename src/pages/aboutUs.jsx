import React from 'react';
import { Link } from 'react-router-dom';
import './aboutUs.css';
import bgVideo from '../assets/bg-vedio.mp4';

const AboutUs = () => {
  return (
    <div className="about-us">
      <video className='about-us-video' autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="about-us-main-heading">
        <h1>We are from Antarix</h1>
      </div>

      <div className="about-us-sub-heading">
        <p>
          Fueling curious minds through free, intelligent, and interactive reading experiences
        </p>
      </div>

      <div className="about-us-container">
        <div className="about-us-box">
          <h2>Diverse Content</h2>
          <div className="about-us-description">
            <p>
              Read across genres like Literature, Coding, Hindi Sahitya, Science, Anime, and more all in one place
            </p>
          </div>
        </div>

        <div className="about-us-box">
          <Link to="/our-team">
            <h2>Our Team</h2>
          </Link>
          <div className="about-us-description">
            <p>Know more about our enthusiastic team. Full of passionate people</p>
          </div>
        </div>

        <div className="about-us-box">
          <h2>Smart Reading Tools</h2>
          <div className="about-us-description">
            <p>
              Track your reading journey, resume books, rate content, and explore without limits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

