import React from 'react';
import resume from '../assets/resume.jpeg';
import hustle from '../assets/hustle.jpeg';
import business from '../assets/bussiness.png';
import invest from '../assets/invest.jpeg';
import sales from '../assets/sales.jpeg';
import leader from '../assets/leader.jpg';
import { useNavigate } from "react-router-dom";
const CareerProfessional = () => {

  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  const cards = [
    { image: resume, title: 'Resume & Interview Prep' },
    { image: hustle, title: 'Freelancing & Side Hustles' },
    { image: business, title: 'Business & Entrepreneurship' },
    { image: invest, title: 'Finance & Investment' },
    { image: sales, title: 'Sales & Marketing' },
    { image: leader, title: 'Leadership & Management' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] text-white font-['Poppins']">
      <div className="pt-24 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white drop-shadow-lg">
          Career & Professional
        </h1>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 p-8">
        {cards.map((card, index) => (
          <div
            key={index}
             onClick={() => handleCardClick(card.title)}
            className="w-60 bg-white text-black rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500  animate-fadeUp"
            style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
          >
            <div className="h-44">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4 font-semibold text-base">
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerProfessional;
