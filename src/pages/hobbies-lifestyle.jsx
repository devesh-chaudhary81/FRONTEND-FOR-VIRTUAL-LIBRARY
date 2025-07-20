import React from "react";

// Import images
import cooking from "../assets/cooking.avif";
import gardening from "../assets/gardening.avif";
import home from "../assets/home.jpg";
import crafts from "../assets/crafts.jpg";
import fashion from "../assets/fasion.png";
import interior from "../assets/interior.avif";
import hacks from "../assets/hacks.jpeg";
import journal from "../assets/journal.webp";
import { useNavigate } from "react-router-dom";
const hobbyCategories = [
  { title: "Cooking & Recipes", image: cooking },
  { title: "Gardening", image: gardening },
  { title: "Home Science", image: home },
  { title: "Crafts & Origami", image: crafts },
  { title: "Fashion & Styling", image: fashion },
  { title: "Interior Design", image: interior },
  { title: "Life Hacks", image: hacks },
  { title: "Journaling", image: journal },
];

const HobbiesLifestyle = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-green-50 px-4 py-10 font-['Poppins']">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-green-700 underline decoration-green-400">
          DIY, Hobbies & Lifestyle
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {hobbyCategories.map((item, index) => (
          <div
            key={index}
             onClick={() => handleCardClick(item.title)}
            className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:bg-pink-50"
          >
            <div className="h-40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-700">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbiesLifestyle;
