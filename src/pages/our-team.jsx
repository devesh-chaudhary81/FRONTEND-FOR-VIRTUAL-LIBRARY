import React from 'react';
import './our-team.css';

import deveshImg from '../assets/devesh.jpg';
// import divyanshImg from '../assets/divyansh.jpg';
// import deekshaImg from '../assets/deeksha.jpg';
// import bhuvneshImg from '../assets/bhuvnesh.jpg';
import devanshImg from '../assets/devansh.jpg';

const teamMembers = [
  {
    name: 'Devesh Chaudhary',
    role: 'Backend Developer',
    image: deveshImg,
    linkedin: 'https://www.linkedin.com/in/devesh-chaudhary-987325312',
  },
  {
    name: 'Divyansh Yadav',
    role: 'Frontend Developer',
    // image: divyanshImg,
    linkedin: 'https://www.linkedin.com/in/devesh-chaudhary-987325312',
  },
  {
    name: 'Deeksha Gupta',
    role: 'Frontend Developer',
    // image: deekshaImg,
    linkedin: 'https://www.linkedin.com/in/deeksha-gupta-7824682b3/',
  },
  {
    name: 'Bhuvnesh Vashishth',
    role: 'Backend Developer',
    // image: bhuvneshImg,
    linkedin: 'https://www.linkedin.com/in/devesh-chaudhary-987325312',
  },
  {
    name: 'Devansh Bansal',
    role: 'Backend Developer',
    image: devanshImg,
    linkedin: 'https://www.linkedin.com/in/devansh-bansal-77478a27b',
  },
];

const OurTeam = () => {
  return (
    <div className="our-team-page">
      {teamMembers.map((member, index) => (
        <section className="our-team-about-section" key={index}>
          <div className="our-team-about-image">
            <img src={member.image} alt={`${member.name} photo`} />
          </div>
          <div className="our-team-about-content">
            <h1>{member.name}</h1>
            <h2>
              <span className="our-team-highlight">{member.role}</span> & Problem Solver
            </h2>
            <p>
              I am a backend web developer. I can provide clean, efficient, and scalable server-side code to ensure your application runs smoothly and securely. I also make the backend more powerful & responsive with database management, API development, and performance optimization.
            </p>
            <button className="our-team-glow">
              <a
                href={member.linkedin}
                className="our-team-links"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default OurTeam;
