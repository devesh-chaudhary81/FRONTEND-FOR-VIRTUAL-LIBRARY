import React from 'react';
import deveshImg from '../assets/devesh.jpg';
import devanshImg from '../assets/devansh.jpg';
import divyanshImg from '../assets/divyansh.jpg'
import bhuvnesh from '../assets/bhuvnesh.jpg';
import deekshaImg from '../assets/deeksha.jpg';

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
    image:divyanshImg,
    linkedin: 'https://www.linkedin.com/in/devesh-chaudhary-987325312',
  },
  {
    name: 'Deeksha Gupta',
    role: 'Frontend Developer',
    image: deekshaImg,
    linkedin: 'https://www.linkedin.com/in/deeksha-gupta-7824682b3/',
  },
  {
    name: 'Bhuvnesh Vashishth',
    role: 'Backend Developer',
    image:bhuvnesh,
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
    <div className="bg-[rgb(1,1,18)] text-white font-[Poppins]">
      {teamMembers.map((member, index) => (
        <section
          key={index}
          className="flex flex-wrap justify-center items-center gap-8 px-4 py-12 max-w-6xl mx-auto"
        >
          {member.image && (
            <div className="rounded-xl overflow-hidden shadow-lg shadow-black/60 border border-[#7277c8]">
              <img
                src={member.image}
                alt={`${member.name} photo`}
                className="w-[300px] h-auto rounded-md shadow-xl"
              />
            </div>
          )}
          <div className="max-w-xl text-left space-y-4 px-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-md">{member.name}</h1>
            <h2 className="text-xl font-semibold">
              <span className="text-blue-400">{member.role}</span> & Problem Solver
            </h2>
            <p className="text-base leading-relaxed text-gray-300">
              I am a backend web developer. I can provide clean, efficient, and scalable server-side
              code to ensure your application runs smoothly and securely. I also make the backend
              more powerful & responsive with database management, API development, and performance
              optimization.
            </p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-md transition"
            >
              LinkedIn
            </a>
          </div>
        </section>
      ))}
    </div>
  );
};

export default OurTeam;

