import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/sidebar";
import { Search } from "lucide-react";
import bgImage from '../assets/bg-home.png';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Background Image */}
      <div className="fixed top-0 left-0 w-full h-screen z-0"
      style={{ backgroundImage: `url(${bgImage})` }}>
        
        <div className="absolute inset-0 bg-[#7A9CB3]/60 backdrop-blur-sm z-0" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-gray-800 min-h-screen mb-32">
        <Navbar />

        {/* Hero Section aligned right */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center mt-44 lg:mt-48">
          <div className="hidden lg:block "></div>

          <div className="w-full  text-center ">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 drop-shadow-md tracking-tight">
              Welcome to <span className="text-indigo-700">Antarix</span>
            </h1>
<h5 className="text-3xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-900 to-purple-800 drop-shadow-md tracking-tight mt-10 text-center ">
  A Virtual Library for Curious Souls
</h5>

            <form
              onSubmit={handleSearch}
              className="mt-8 w-full max-w-xl px-4 relative mx-auto lg:ml-auto"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, authors, or genres"
                className="w-full px-6 py-3 pr-12 rounded-full text-gray-800 bg-white placeholder-gray-500 border border-gray-300 
                  shadow-[0_4px_20px_rgba(0,0,0,0.4)] 
                  focus:ring-2 focus:ring-indigo-400 focus:outline-none 
                  transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>


 <section className="mt-16 px-4">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-md  tracking-tight mb-8">
            📖 What Awaits You Inside?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📘",
                title: "Explore Books",
                desc: "Browse a wide range of genres, from literature to science, anime, and more.",
              },
              {
                icon: "⭐",
                title: "Your Favourites",
                desc: "Save your favourite books to access them quickly any time.",
              },
              {
                icon: "👤",
                title: "Personal Dashboard",
                desc: "Track your reading time, shelves, feedback, and personal stats.",
              },
              {
                icon: "📝",
                title: "Get Book Notes",
                desc: "Upload PDFs and instantly get auto-generated summaries of each chapter.",
              },
              {
                icon: "📚",
                title: "Virtual Bookshelf",
                desc: "Organize books you're currently reading or planning to explore.",
              },
              {
                icon: "💬",
                title: "User Feedback",
                desc: "Share feedback and help us improve your reading experience.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl 
                  shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
                  hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] 
                  transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tagline and Intro */}
        <section className="mt-48 px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-md tracking-tight">
            Discover, read, and organize your favorite books — anytime, anywhere.
          </h2>
         
        </section>

        {/* Image Grid Section */}
        <section className="mt-10 px-4 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                alt: "Stack of books",
              },
              {
                src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
                alt: "Person reading",
              },
              {
                src: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
                alt: "Bookshelf",
              },
              {
                src: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
                alt: "Reading by the window",
              },
              {
                src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
                alt: "Notebook and coffee",
              },
              {
                src: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
                alt: "Person browsing library",
              },
            ].map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border-[2px]  shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transform hover:scale-105 transition duration-300"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Feature Info Boxes */}
       
      </div>

      <Footer className="mt-48"/>
    </>
  );
};

export default Home;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/footer";
// import Navbar from "../components/sidebar";
// import { Search, BookOpen, Star, User, Layers } from "lucide-react";

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));

//     const handleStorageChange = () => {
//       const updatedUser = localStorage.getItem("user");
//       setUser(updatedUser ? JSON.parse(updatedUser) : null);
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <>
//       {/* Gradient Background */}
//       <div className="fixed top-0 left-0 w-full min-h-screen bg-[#7A9CB3] -z-10"></div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-gray-800 min-h-screen">
//         <Navbar />

//         {/* Hero Section */}
//         <div className="flex flex-col justify-center items-center text-center mt-48">
//           <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 drop-shadow-md tracking-tight">
//             Welcome to <span className="text-indigo-700">Antarix</span>
//           </h1>

//           <form onSubmit={handleSearch} className="mt-8 w-full max-w-xl px-4 relative">
//             <input
//               type="search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for books, authors, or genres"
//               className="w-full px-6 py-3 pr-12 rounded-full text-gray-800 bg-white placeholder-gray-500 border border-gray-300 
//                          shadow-[0_4px_20px_rgba(0,0,0,0.4)] 
//                          focus:ring-2 focus:ring-indigo-400 focus:outline-none 
//                          transition-all duration-300"
//             />
//             <button
//               type="submit"
//               className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
//             >
//               <Search size={20} />
//             </button>
//           </form>
//         </div>

//         {/* Tagline and Section Intro */}
//         <section className="mt-24 px-4 text-center">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight">
//             📘 A Virtual Library for Curious Souls
//           </h2>
//           <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
//             Discover, read, and organize your favorite books — anytime, anywhere.
//           </p>
//         </section>

//         {/* Image Grid Section */}
//         <section className="mt-10 px-4 text-center">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 src: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//                 alt: "Stack of books",
//               },
//               {
//                 src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
//                 alt: "Person reading",
//               },
//               {
//                 src: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
//                 alt: "Bookshelf",
//               },
//               {
//                 src: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
//                 alt: "Reading by the window",
//               },
//               {
//                 src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
//                 alt: "Notebook and coffee",
//               },
//               {
//                 src: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
//                 alt: "Person browsing library",
//               },
//             ].map((img, index) => (
//               <div
//                 key={index}
//                 className="overflow-hidden rounded-2xl border border-indigo-400 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transform hover:scale-105 transition duration-300"
//               >
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-full h-64 object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Feature Info Boxes */}

//         <section className="mt-20 px-4">
//           <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
//             📖 What Awaits You Inside?
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "📘",
//                 title: "Explore Books",
//                 desc: "Browse a wide range of genres, from literature to science, anime, and more.",
//               },
//               {
//                 icon: "⭐",
//                 title: "Your Favourites",
//                 desc: "Save your favourite books to access them quickly any time.",
//               },
//               {
//                 icon: "👤",
//                 title: "Personal Dashboard",
//                 desc: "Track your reading time, shelves, feedback, and personal stats.",
//               },
//               {
//                 icon: "📝",
//                 title: "Get Book Notes",
//                 desc: "Upload PDFs and instantly get auto-generated summaries of each chapter.",
//               },
//               {
//                 icon: "📚",
//                 title: "Virtual Bookshelf",
//                 desc: "Organize books you're currently reading or planning to explore.",
//               },
//               {
//                 icon: "💬",
//                 title: "User Feedback",
//                 desc: "Share feedback and help us improve your reading experience.",
//               },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-2xl 
//                          shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
//                          hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] 
//                          transition-all duration-300 text-center"
//               >
//                 <div className="text-4xl mb-3">{item.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Home;


