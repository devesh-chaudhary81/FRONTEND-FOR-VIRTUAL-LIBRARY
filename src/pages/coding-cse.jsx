import React from "react";

// Import all images from assets
import webDev from "../assets/webdev.png";
import languages from "../assets/lang.jpg";
import dsa from "../assets/dsa.jpeg";
import ml from "../assets/ml.webp";
import cyber from "../assets/cyber.webp";
import cp from "../assets/cp.jpeg";
import game from "../assets/game.jpeg";
import cloud from "../assets/clo.jpg";
import system from "../assets/system.jpeg";

const categories = [
  { title: "Web Development", image: webDev },
  { title: "Programming Languages", image: languages },
  { title: "Data Structures and Algorithm", image: dsa },
  { title: "Machine Learning", image: ml },
  { title: "Cyber Security", image: cyber },
  { title: "Competitive Programming", image: cp },
  { title: "App and Game Development", image: game },
  { title: "Cloud Computing", image: cloud },
  { title: "System Design", image: system },
];

const CodingComputerScience = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-950 to-black px-4 py-8 font-['Poppins'] text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold underline decoration-cyan-400">
          Coding & Computer Science
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingComputerScience;
