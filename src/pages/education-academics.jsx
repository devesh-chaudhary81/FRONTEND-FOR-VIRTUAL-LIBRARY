import React from "react";
import mathImg from "../assets/math.jpg";
import enggImg from "../assets/engg.jpg";
import medicalImg from "../assets/medical.jpg";
import socialImg from "../assets/social.png";
import politicalImg from "../assets/political.jpeg";
import ecoImg from "../assets/eco.jpeg";
import lawImg from "../assets/law.jpg";
import envImg from "../assets/env.jpg";

const categories = [
  { title: "Mathematics", image: mathImg },
  { title: "Engineering", image: enggImg },
  { title: "Medical & Health Sciences", image: medicalImg },
  { title: "Social Science", image: socialImg },
  { title: "Political Science", image: politicalImg },
  { title: "Economics", image: ecoImg },
  { title: "Law", image: lawImg },
  { title: "Environmental Studies", image: envImg },
];

const EducationAcademics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01000d] via-[#08062f] to-[#0c053e] font-[Poppins] px-4 py-8">
      <h1 className="text-white text-center text-4xl md:text-5xl font-semibold mb-10 drop-shadow-lg">
        Education & Academics
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="w-60 bg-white rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgb(50,49,49),0_0_20px_rgb(227,221,247)] animate-slideFade"
            style={{ animationDelay: `${0.1 * (idx + 1)}s`, animationFillMode: "forwards" }}
          >
            <img src={cat.image} alt={cat.title} className="w-full h-44 object-cover" />
            <div className="text-center py-4">
              <p className="text-lg font-bold text-gray-800">{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationAcademics;