import React from 'react';
import upsc from '../assets/upsc.jpg';
import ssc from '../assets/ssc.png';
import bank from '../assets/bank.png';
import rrb from '../assets/rrb.webp';
import neet from '../assets/neet.jpeg';
import jee from '../assets/jee.webp';
import cuet from '../assets/cuet.png';
import tet from '../assets/tet.jpeg';
import ugc from '../assets/ugc.jpeg';
import { useNavigate } from "react-router-dom";
const GovernmentExamPrep = () => {
  const navigate = useNavigate();
  const handleCardClick = (subcategory) => {
  // Navigate to SearchResult page with query
  navigate(`/search?q=${encodeURIComponent(subcategory)}`);
};
  const cards = [
    { image: upsc, title: 'UPSC' },
    { image: ssc, title: 'SSC' },
    { image: bank, title: 'Banking Exams (IBPS, SBI)' },
    { image: rrb, title: 'Railways (RRB)' },
    { image: neet, title: 'NEET' },
    { image: jee, title: 'JEE' },
    { image: cuet, title: 'CUET' },
    { image: tet, title: 'Teaching (CTET, TET)' },
    { image: ugc, title: 'UGC-NET' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] text-white font-['Poppins']">
      <div className="pt-24 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white drop-shadow-lg">
          Government & Exam Preparation
        </h1>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 p-8">
        {cards.map((card, index) => (
          <div
            key={index}
             onClick={() => handleCardClick(card.title)}
            className="w-60 bg-white text-black rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500  animate-fadeUp"
            style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
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

export default GovernmentExamPrep;
