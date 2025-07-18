import React from "react";

// Import your images
import news from "../assets/news.jpeg";
import internationalnews from "../assets/internationalnews.jpg";
import political from "../assets/polotical.avif";
import tech from "../assets/tech news.webp";
import sports from "../assets/sports.jpg";
import opinions from "../assets/opinions.webp";
import finance from "../assets/finance.jpg";
import climate from "../assets/climate.jpg";

const newsCategories = [
  { title: "National News", image: news },
  { title: "International News", image: internationalnews },
  { title: "Political Updates", image: political },
  { title: "Science & Tech News", image: tech },
  { title: "Sports News", image: sports },
  { title: "Editorials & Opinions", image: opinions },
  { title: "Business & Finance", image: finance },
  { title: "Environment & Climate", image: climate },
];

const CurrentAffairs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4 py-10 font-['Poppins']">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 underline decoration-blue-400">
          Current Affairs & News
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {newsCategories.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:bg-blue-50"
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

export default CurrentAffairs;
