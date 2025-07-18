import React from "react";

// Import images
import english from "../assets/english.jpg";
import hindi from "../assets/hin lit.webp";
import sanskrit from "../assets/sans.webp";
import urdu from "../assets/urdu.jpeg";
import french from "../assets/french.webp";
import japanese from "../assets/japanese.jpg";
import translation from "../assets/translation.jpg";
import vocab from "../assets/vocab.jpeg";

const categories = [
  { title: "English Learning", image: english },
  { title: "Hindi Literature", image: hindi },
  { title: "Sanskrit", image: sanskrit },
  { title: "Urdu Shayari", image: urdu },
  { title: "French / German / Spanish", image: french },
  { title: "Japanese / Korean / Chinese", image: japanese },
  { title: "Translations", image: translation },
  { title: "Grammar & Vocabulary", image: vocab },
];

const LanguagesCulture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-950 to-black px-4 py-8 font-['Poppins'] text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold underline decoration-pink-400">
          Languages & Culture
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

export default LanguagesCulture;
