import React from "react";
import { useNavigate } from "react-router-dom";
// ✅ Import all category images
import gita from "../assets/bhagwat_geeta.png";
import ramayana from "../assets/ramayana.jpg";
import quran from "../assets/quran.jpeg";
import bible from "../assets/bible.png";
import granth from "../assets/granth.jpg";
import vedas from "../assets/vedas.jpg";
import chalisa from "../assets/chalisa.jpg";
import philosophy from "../assets/philosophy.jpeg";

const categories = [
  { title: "Bhagavad Gita", image: gita },
  { title: "Ramayana & Mahabharata", image: ramayana },
  { title: "Quran", image: quran },
  { title: "Bible", image: bible },
  { title: "Guru Granth Sahi", image: granth },
  { title: "Upanishads & Vedas", image: vedas },
  { title: "Chalisa & Aartis", image: chalisa },
  { title: "Philosophy & Teachings", image: philosophy },
];

const SpiritualityReligion = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white px-4 py-10 font-['Poppins']">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-amber-700 underline decoration-amber-400">
          Spirituality & Religion
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.title)}
            className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:bg-amber-50"
          >
            <div className="h-40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-700">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiritualityReligion;
