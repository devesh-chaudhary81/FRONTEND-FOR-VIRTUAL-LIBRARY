import React from "react";
import motivation from "../assets/motivation.webp";
import time from "../assets/time.avif";
import meditation from "../assets/meditation.jpeg";
import psychology from "../assets/psychology.jpeg";
import spirituality from "../assets/spirituality.webp";
import growth from "../assets/growth.png";
import health from "../assets/health.jpeg";
import { useNavigate } from "react-router-dom";
const categories = [
  { title: "Motivation & Habits", image: motivation },
  { title: "Time Management", image: time },
  { title: "Mindfulness & Meditation", image: meditation },
  { title: "Psychology", image: psychology },
  { title: "Spirituality", image: spirituality },
  { title: "Personal Growth", image: growth },
  { title: "Fitness & Nutrition", image: health },
];

const SelfHelpLifestyle = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] font-['Poppins'] px-6 py-10">
      <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-12 drop-shadow-[2px_2px_2px_white]">
        Self-Help & Lifestyle
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.title)}
            className="w-64 bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-[0_30px_60px_rgb(50,49,49),_0_0_20px_rgb(227,221,247)] transition-all duration-500"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-800">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfHelpLifestyle;
