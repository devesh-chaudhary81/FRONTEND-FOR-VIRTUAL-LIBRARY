import React from "react";
import shonen from "../assets/shonen.jpg";
import shojo from "../assets/shjojo.jpg";
import josei from "../assets/josei.webp";
import light from "../assets/light.jpg";
import manga from "../assets/manga scans.jpg";

const categories = [
  { title: "Shonen", image: shonen },
  { title: "Shojo", image: shojo },
  { title: "Seinen/Josei", image: josei },
  { title: "Light Novels", image: light },
  { title: "Manga Scans", image: manga },
];

const AnimeManga = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] font-['Poppins'] px-6 py-10">
      <h1 className="text-white text-5xl font-bold text-center mb-12 drop-shadow-[2px_2px_2px_white] pt-24">
        Anime and Manga
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="w-64 bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.05] hover:shadow-[0_30px_60px_rgb(50,49,49),_0_0_20px_rgb(227,221,247)] transition-all duration-500 animate-fadeUp"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-44 object-cover transition-all duration-300"
            />
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-800">{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeManga;
