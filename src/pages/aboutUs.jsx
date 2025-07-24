// import React from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '../components/sidebar';

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 to-black text-white font-[Poppins] flex">
//       {/* Sidebar on the left */}
//       <div className="w-64 min-h-screen border-r border-blue-800">
//         <Sidebar />
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 px-6 py-12 flex flex-col items-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-blue-400 text-center drop-shadow mb-6">
//           Welcome to Antarix 🚀
//         </h1>

//         <p className="text-center max-w-4xl text-lg md:text-xl text-blue-100 mb-12 leading-relaxed">
//           Antarix is a Virtual Library built for curious minds. We aim to make reading fun, intelligent, and interactive — for students, coders, hobbyists, and everyone in between.
//         </p>

//         {/* Section: Why Antarix */}
//         <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//           <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
//             <h2 className="text-xl font-semibold text-blue-300 mb-3 text-center">Diverse Content</h2>
//             <p className="text-blue-100 text-center">
//               Explore books across genres like Literature, Coding, Hindi Sahitya, Science, Anime, and more — all in one place.
//             </p>
//           </div>
//           <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
//             <h2 className="text-xl font-semibold text-blue-300 mb-3 text-center">Smart Reading Tools</h2>
//             <p className="text-blue-100 text-center">
//               Track your reading, resume where you left off, mark favourites, and add books to your shelf seamlessly.
//             </p>
//           </div>
//           <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
//             <h2 className="text-xl font-semibold text-blue-300 mb-3 text-center">Personalized Dashboard</h2>
//             <p className="text-blue-100 text-center">
//               Your dashboard shows reading stats, favourites, shelf books, and even your submitted feedback — all in one place.
//             </p>
//           </div>
//         </section>

//         {/* Section: What You Can Do */}
//         <section className="w-full max-w-5xl mb-20 text-center">
//           <h2 className="text-2xl md:text-3xl text-blue-400 font-bold mb-4">What Can You Do Here?</h2>
//           <ul className="text-blue-100 space-y-2 list-disc list-inside text-left md:text-center md:px-10">
//             <li>📚 Browse and read books online — no downloads needed</li>
//             <li>💾 Add books to your personal shelf to read later</li>
//             <li>⭐ Mark favourites and review them anytime</li>
//             <li>📝 Share feedback and improve the platform</li>
//             <li>🎯 Track how much time you’ve spent learning</li>
//           </ul>
//         </section>

//         {/* Section: Call to Action */}
//         <section className="w-full text-center">
//           <h2 className="text-2xl md:text-3xl text-blue-300 font-semibold mb-2">Meet Our Team</h2>
//           <p className="text-blue-100 mb-4">
//             Antarix is built by a passionate team of developers, designers, and learners like you.
//           </p>
//           <Link to="/our-team" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition">
//             See Our Team →
//           </Link>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;





import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/sidebar'; // ✅ Updated from Sidebar to Navbar
import Footer from '../components/footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 to-black text-white font-[Poppins]">
      {/* ✅ Top Navbar */}
      <Navbar />

      {/* ✅ Main content below navbar */}
      <div className="pt-24 px-4 md:px-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 text-center drop-shadow mb-6">
          Welcome to Antarix 🚀
        </h1>

        <p className="text-center max-w-4xl text-lg md:text-xl text-blue-100 mb-12 leading-relaxed">
          Antarix is a Virtual Library built for curious minds. We aim to make reading fun, intelligent, and interactive — for students, coders, hobbyists, and everyone in between.
        </p>

        {/* Section: Why Antarix */}
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
            <h2 className="text-xl font-semibold text-blue-300 mb-3 text-center">Diverse Content</h2>
            <p className="text-blue-100 text-center">
              Explore books across genres like Literature, Coding, Hindi Sahitya, Science, Anime, and more — all in one place.
            </p>
          </div>
          <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
            <h2 className="text-xl font-semibold text-blue-300 mb-3 text-center">Smart Reading Tools</h2>
            <p className="text-blue-100 text-center">
              Track your reading, resume where you left off, mark favourites, and add books to your shelf seamlessly.
            </p>
          </div>
          <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition">
            <h2 className="text-xl font-semibold text-blue-300 mb-3 text-center">Personalized Dashboard</h2>
            <p className="text-blue-100 text-center">
              Your dashboard shows reading stats, favourites, shelf books, and even your submitted feedback — all in one place.
            </p>
          </div>
        </section>

        {/* Section: What You Can Do */}
        <section className="w-full max-w-5xl mb-20 text-center">
          <h2 className="text-2xl md:text-3xl text-blue-400 font-bold mb-4">What Can You Do Here?</h2>
          <ul className="text-blue-100 space-y-2 list-disc list-inside text-left md:text-center md:px-10">
            <li>📚 Browse and read books online — no downloads needed</li>
            <li>💾 Add books to your personal shelf to read later</li>
            <li>⭐ Mark favourites and review them anytime</li>
            <li>📝 Share feedback and improve the platform</li>
            <li>🎯 Track how much time you’ve spent learning</li>
          </ul>
        </section>

        {/* Section: Call to Action */}
        <section className="w-full text-center">
          <h2 className="text-2xl md:text-3xl text-blue-300 font-semibold mb-2">Meet Our Team</h2>
          <p className="text-blue-100 mb-4">
            Antarix is built by a passionate team of developers, designers, and learners like you.
          </p>
          <Link
            to="/our-team"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            See Our Team →
          </Link>
        </section>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default AboutUs;
