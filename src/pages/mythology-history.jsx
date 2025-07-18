import React from "react";

// Import images
import mythology from "../assets/mythology.jpeg";
import greek from "../assets/greek.jpeg";
import norse from "../assets/norse.jpg";
import ancient from "../assets/ancient.jpeg";
import freedom from "../assets/freedom.webp";
import war from "../assets/war.jpg";
import cultural from "../assets/cultural.jpg";

const categories = [
  { title: "Indian Mythology", image: mythology },
  { title: "Greek & Roman Mythology", image: greek },
  { title: "Norse & Other Mythologies", image: norse },
  { title: "Ancient Civilizations", image: ancient },
  { title: "Freedom Fighters & Movements", image: freedom },
  { title: "World Wars", image: war },
  { title: "Cultural History", image: cultural },
];

const MythologyHistory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-stone-900 to-black px-4 py-8 font-['Poppins'] text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold underline decoration-orange-500">
          Mythology & History
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

export default MythologyHistory;
