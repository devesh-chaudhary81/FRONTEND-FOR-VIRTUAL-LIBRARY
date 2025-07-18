import React from "react";

// Import images
import moral from "../assets/moral.webp";
import fairy from "../assets/fairy.jpeg";
import abcd from "../assets/abcd.png";
import drawing from "../assets/drawing.jpeg";
import poems from "../assets/poems.jpeg";
import bedtime from "../assets/bedtime.png";
import puzzle from "../assets/puzzle.jpg";

const kidsCategories = [
  { title: "Moral Stories", image: moral },
  { title: "Fairy Tales", image: fairy },
  { title: "Learning Numbers & ABCs", image: abcd },
  { title: "Drawing & Coloring", image: drawing },
  { title: "Rhymes & Poems", image: poems },
  { title: "Short Bedtime Stories", image: bedtime },
  { title: "Activity & Puzzle Ebooks", image: puzzle },
];

const ForKids = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-yellow-100 px-4 py-10 font-['Poppins']">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 underline decoration-pink-400">
          For Kids
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {kidsCategories.map((item, index) => (
          <div
            key={index}
            className="bg-white hover:bg-yellow-50 border border-pink-200 shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="h-40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-pink-700">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForKids;
