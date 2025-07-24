import React from "react";
import kavita from "../assets/kavita.jpeg";
import kahani from "../assets/kahani.jpeg";
import upanyas from "../assets/upanyas.jpeg";
import nibandh from "../assets/nibandh.webp";
import dharmik from "../assets/dharmik.jpg";
import natak from "../assets/natak.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/sidebar';
const categories = [
  { title: "हिंदी कविता", image: kavita },
  { title: "हिंदी कहानियाँ", image: kahani },
  { title: "उपन्यास", image: upanyas },
  { title: "निबंध और लेख", image: nibandh },
  { title: "धार्मिक ग्रंथ", image: dharmik },
  { title: "नाटक और रंगमंच", image: natak },
];

const HindiSahitya = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] font-['Poppins'] px-6 py-10">
      <div><Navbar/></div>
      <h1 className="text-white mt-16 text-5xl font-bold text-center mb-12 drop-shadow-[2px_2px_2px_white]">
        Hindi Sahitya
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {categories.map((card, index) => (
          <div
            key={index}
             onClick={() => handleCardClick(card.title)}
            className="w-64 bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-[0_30px_60px_rgb(50,49,49),_0_0_20px_rgb(227,221,247)] transition-all duration-500 animate-fadeUp "
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "forwards",
            }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-44 object-cover transition-all duration-300"
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

export default HindiSahitya;
