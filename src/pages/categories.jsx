import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/sidebar";

import coding from "../assets/coding.jpg";
import education from "../assets/education.jpg";
import literature from "../assets/literature-fiction.jpg";
import currentAffairs from "../assets/news-currentAffairs.jpg";
import career from "../assets/career-professional.jpg";
import anime from "../assets/anime.jpg";
import creativity from "../assets/creativity.jpg";
import hindi from "../assets/hindi-sahitya.jpg";
import hobbies from "../assets/hobbies-lifestyle.jpg";
import kids from "../assets/kids.jpg";
import language from "../assets/language-culture.jpg";
import mythology from "../assets/mythology-history.jpg";
import religion from "../assets/religion-spirituality.jpg";
import science from "../assets/science-technology.png";
import selfHelp from "../assets/selfhelp-lifestyle.jpg";
import govtExam from "../assets/government-exam.jpg";
import Footer from "../components/footer";

const categories = [
  { title: "Coding and Computer Science", img: coding, link: "/coding-cse" },
  { title: "Education and Academics", img: education, link: "/education-academics" },
  { title: "Literature and Fiction", img: literature, link: "/literature-fiction" },
  { title: "Current affairs and news", img: currentAffairs, link: "/currentAffairs-news" },
  { title: "Career and Professional", img: career, link: "/career-professional" },
  { title: "Anime and Manga", img: anime, link: "/anime-manga" },
  { title: "Creativity and Entertainment", img: creativity, link: "/creativity-entertainment" },
  { title: "Hindi Sahitya", img: hindi, link: "/hindi-sahitya" },
  { title: "Diy Hobbies and Lifestyle", img: hobbies, link: "/hobbies-lifestyle" },
  { title: "For Kids", img: kids, link: "/for-kids" },
  { title: "Language and Culture", img: language, link: "/language-culture" },
  { title: "Mythology and History", img: mythology, link:"/mythology-history" },
  { title: "Religion and Spirituality", img: religion, link: "/spirituality-religion" },
  { title: "Science and Technology", img: science, link: "/science-technology" },
  { title: "Self-help and Lifestyle", img: selfHelp, link: "/selfhelp-lifestyle" },
  { title: "Government Exam Prep", img: govtExam, link: "/government-exam" },
];

const Categories = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white">
    <Navbar />

    <div className="pt-16 lg:flex">

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-8 md:px-12 py-8">
       
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-2">
            <BookOpen size={36} className="text-yellow-400 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold font-sans drop-shadow-md">
              Choose Your Category
            </h1>
          </div>
          <p className="text-blue-200 text-sm">
            Explore your favorite topics from our library
          </p>
        </div>

        {/* Centered category cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl">
            {categories.map((cat, idx) => (
              <Link
                to={cat.link}
                key={idx}
                className="rounded-xl bg-[#e5f1f1] text-blue-950 backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl"
              >
                <div className="w-full h-40 overflow-hidden rounded-t-xl">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-lg font-semibold">{cat.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
    <Footer/>
  </div>
  
);

};

export default Categories;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BookOpen } from 'lucide-react';
// import Sidebar from '../components/sidebar';

// import coding from '../assets/coding.jpg';
// import education from '../assets/education.jpg';
// import literature from '../assets/literature-fiction.jpg';
// import currentAffairs from '../assets/news-currentAffairs.jpg';
// import career from '../assets/career-professional.jpg';
// import anime from '../assets/anime.jpg';
// import creativity from '../assets/creativity.jpg';
// import hindi from '../assets/hindi-sahitya.jpg';
// import hobbies from '../assets/hobbies-lifestyle.jpg';
// import kids from '../assets/kids.jpg';
// import language from '../assets/language-culture.jpg';
// import mythology from '../assets/mythology-history.jpg';
// import religion from '../assets/religion-spirituality.jpg';
// import science from '../assets/science-technology.png';
// import selfHelp from '../assets/selfhelp-lifestyle.jpg';
// import govtExam from '../assets/government-exam.jpg';

// const categories = [
//   { title: "Coding and Computer Science", img: coding, link: "/coding-cse" },
//   { title: "Education and Academics", img: education, link: "/education-academics" },
//   { title: "Literature and Fiction", img: literature, link: "/literature-fiction" },
//   { title: "Current affairs and news", img: currentAffairs, link: "/currentAffairs-news" },
//   { title: "Career and Professional", img: career, link: "/career-professional" },
//   { title: "Anime and Manga", img: anime, link: "anime-manga" },
//   { title: "Creativity and Entertainment", img: creativity, link: "/creativity-entertainment" },
//   { title: "Hindi Sahitya", img: hindi, link: "/hindi-sahitya" },
//   { title: "Diy Hobbies and Lifestyle", img: hobbies, link: "/hobbies-lifestyle" },
//   { title: "For Kids", img: kids, link: "/for-kids" },
//   { title: "Language and Culture", img: language, link: "/language-culture" },
//   { title: "Mythology and History", img: mythology, link:"/mythology-history" },
//   { title: "Religion and Spirituality", img: religion, link: "/spirituality-religion" },
//   { title: "Science and Technology", img: science, link: "/science-technology" },
//   { title: "Self-help and Lifestyle", img: selfHelp, link: "/selfhelp-lifestyle" },
//   { title: "Government Exam Prep", img: govtExam, link: "/government-exam" },
// ];

// const Categories = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0c4a6e] text-white">
//       <div className="flex">
//         {/* Sidebar with fixed width on large screens */}
//         <div className="w-64 hidden lg:block sticky top-0 h-screen">
//           <Sidebar />
//         </div>

//         {/* Categories content */}
//         <div className="flex-grow py-10 px-4 md:px-8">
//           <div className="text-center mb-10">
//             <div className="flex justify-center items-center gap-3 mb-2">
//               <BookOpen size={36} className="text-yellow-400 drop-shadow-lg" />
//               <h1 className="text-4xl md:text-5xl font-bold font-sans drop-shadow-md">
//                 Choose Your Category
//               </h1>
//             </div>
//             <p className="text-blue-200 text-sm">Explore your favorite topics from our library</p>
//           </div>

//           <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
//             {categories.map((cat, idx) => (
//               <Link
//                 to={cat.link}
//                 key={idx}
//                 className="rounded-xl bg-[#e5f1f1] backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl"
//               >
//                 <div className="w-full h-40 overflow-hidden rounded-t-xl">
//                   <img
//                     src={cat.img}
//                     alt={cat.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4 text-center">
//                   <p className="text-lg font-semibold text-blue-950">{cat.title}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;


