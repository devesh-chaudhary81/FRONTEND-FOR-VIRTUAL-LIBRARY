import React from 'react';
import classic from '../assets/classic.webp';
import modern from '../assets/modern.jpeg';
import poetry from '../assets/poetry.jpg';
import drama from '../assets/drama.jpg';
import short from '../assets/short.png';
import fantasy from '../assets/fantasy.jpeg';
import horror from '../assets/horror.jpeg';
import romance from '../assets/romance.jpg';
import mystery from '../assets/mystry.avif';
import { useNavigate } from "react-router-dom";
const categories = [
  { title: 'Classic Literature', image: classic },
  { title: 'Modern Literature', image: modern },
  { title: 'Poetry', image: poetry },
  { title: 'Drama and Plays', image: drama },
  { title: 'Short Stories', image: short },
  { title: 'Fantasy & Sci-Fi', image: fantasy },
  { title: 'Horror and Thriller', image: horror },
  { title: 'Romance', image: romance },
  { title: 'Mystery and Cinema', image: mystery },
];

const LiteratureFiction = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] font-['Poppins'] flex flex-col items-center px-4 py-16">
      <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-12 drop-shadow-[2px_2px_5px_rgba(255,255,255,0.3)]">
        Literature and Fiction
      </h1>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {categories.map((card, index) => (
          <div
            key={index}
             onClick={() => handleCardClick(card.title)}
            className="w-60 bg-white rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-[0_20px_30px_rgba(255,255,255,0.2),_0_0_20px_rgba(227,221,247,0.3)]  animate-fadeUp"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
          >
            <div className="h-40 w-full overflow-hidden">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-800 font-semibold text-lg">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiteratureFiction;