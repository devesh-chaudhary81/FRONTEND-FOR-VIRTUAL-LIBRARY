import React from "react";
import { useNavigate } from "react-router-dom";
import physicsImg from "../assets/physics.jpg";
import chemistryImg from "../assets/chemistry.jpg";
import bioImg from "../assets/bio.png";
import astroImg from "../assets/astro.png";
import envSciImg from "../assets/envirnmental.png";
import roboticsImg from "../assets/robotics.jpg";
import ecoImg from "../assets/eco.jpeg";
import Navbar from '../components/sidebar';

const categories = [
  { title: "Physics", image: physicsImg },
  { title: "Chemistry", image: chemistryImg },
  { title: "Biology", image: bioImg },
  { title: "Astronomy", image: astroImg },
  { title: "Environmental Science", image: envSciImg },
  { title: "Robotics", image: roboticsImg },
  { title: "Ecology", image: ecoImg },
];

const ScienceTechnology = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  return (
    <div className=" flex-col items-center min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] font-['Poppins'] px-6 py-10">
      <div><Navbar/></div>
      <h1 className="text-white mt-16 text-4xl sm:text-5xl font-bold text-center mb-12 drop-shadow-md">
        Science and Technology
      </h1>

      <div className="flex gap-10 flex-wrap w-[80%] justify-center mx-auto">
        {categories.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.title)}
            className="w-60 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <p className="font-semibold text-lg text-gray-800">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScienceTechnology;