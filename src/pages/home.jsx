// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import backgroundImage from "../assets/homebg.png";
// import Navbar from "../components/sidebar";

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     const handleStorageChange = () => {
//       const updatedUser = localStorage.getItem("user");
//       setUser(updatedUser ? JSON.parse(updatedUser) : null);
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   return (
//     <>
//       {/* Background */}
//       <div
//         className="fixed top-0 left-0 w-full min-h-screen bg-cover bg-center bg-no-repeat -z-10"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       ></div>
//       <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 -z-10"></div>

//       {/* Navbar */}
//       <Navbar />

//       {/* Content */}
//       <div className="relative z-10 w-full px-4 sm:px-8 font-[Inter] text-[#D1D9FF] min-h-screen pt-32">
//         {/* Hero Section */}
//         <div className="flex flex-col items-center text-center">
//           <h1 className="text-white text-5xl sm:text-6xl font-playfair drop-shadow-[2px_2px_5px_rgb(43,1,254)]">
//             Welcome to <span className="text-[#4A69E2]">Antarix</span>
//           </h1>
//           <p className="mt-6 text-white font-semibold text-lg max-w-xl">
//             Explore a universe of stories, knowledge, and imagination. Your next
//             great read is just a search away.
//           </p>

//           {/* Search */}
//           <form
//             onSubmit={handleSearch}
//             className="mt-8 flex flex-col items-center gap-4 w-full"
//           >
//             <input
//               type="search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for books, authors, or genres"
//               className="px-6 py-3 w-4/5 max-w-xl text-lg text-black rounded-full text-center bg-white/90 placeholder-black focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="px-8 py-3 bg-[#4A69E2] text-white font-bold rounded-full hover:bg-[#3B5BDB] transition transform hover:-translate-y-1"
//             >
//               Search Now
//             </button>
//           </form>

//           {/* Featured Headline */}
//           <div className="mt-44 text-center max-w-md">
//             <h2 className="text-yellow-300 text-3xl font-playfair">
//               Our Featured Collections
//             </h2>
//             <p className="text-white mt-4">
//               Discover curated collections from various genres and eras.
//               Handpicked by our librarians to spark your curiosity and
//               imagination.
//             </p>
//           </div>
//         </div>

//         {/* Featured Section */}
//         <section className="mt-16">
//           <div className="flex flex-wrap justify-center gap-8">
//             {[
//               "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
//               "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
//               "https://media.istockphoto.com/id/1218656325/photo/laptop-with-online-library-realistic-3d-rendering.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZwTbE90EDfj64GhZRRsqipTaa-kHlXbpDZKQ6fozpQA=",
//               "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=60",
//               "https://media.istockphoto.com/id/481209467/photo/youth-reading-books-in-library.webp?a=1&b=1&s=612x612&w=0&k=20&c=znfjoCoOJ778yCVjojhwCcnjApP7k3pJ8KRA6p0VaDU=",
//               "https://images.unsplash.com/photo-1749219466252-8eb6f6647fbc?w=600&auto=format&fit=crop&q=60",
//             ].map((url, index) => (
//               <div
//                 key={index}
//                 className="p-1 bg-gradient-to-br from-[#1C2341] via-[#10152B] to-[#090D1B] rounded-xl shadow-xl hover:shadow-blue-500/30 transition"
//               >
//                 <div className="p-1 bg-[#10152B] rounded-lg">
//                   <img
//                     src={url}
//                     alt="Library content"
//                     className="w-[300px] h-60 object-cover rounded-md"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Home;





import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo3.jpg";
import backgroundImage from "../assets/background2.png";
import Footer from "../components/footer";
import { Menu, X } from "lucide-react"; // OPTIONAL: if you have `lucide-react`, otherwise use plain SVG

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full min-h-screen h-full bg-cover bg-center opacity-1 -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="fixed top-0 backdrop-blur-sm left-0 w-full h-full bg-black bg-opacity-10 -z-10"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-[Inter] text-[#D1D9FF] min-h-screen">
        {/* Header */}
        <header className="top-0 z-50 py-4">
          <div className="flex justify-between items-center">
            <img
              src={logo}
              alt="logo"
              className="w-[220px] sm:w-[350px] h-[120px] sm:h-[200px] -translate-x-4 sm:-translate-x-24 -translate-y-6 sm:-translate-y-12"
            />

            {/* Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white p-2 focus:outline-none"
              >
                {menuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-8 -mt-24 ml-12">
              <Link to="/" className="text-white text-lg hover:underline hover:decoration-yellow-400 font-medium">Home</Link>
              <Link to="/about-us" className="text-white text-lg hover:underline hover:decoration-yellow-400 font-medium">About Us</Link>
              <Link to="/feedback" className="text-white text-lg hover:underline hover:decoration-yellow-400 font-medium">Feedback</Link>
              <Link to="/categories" className="text-white text-lg hover:underline hover:decoration-yellow-400 font-medium">Categories</Link>
              {user ? (
                <Link to="/userDashboard">
                  <button className="bg-blue-900 text-white px-5 py-1 rounded-lg text-sm hover:bg-white hover:text-blue-900 transition">
                    My_Profile
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="bg-blue-900 text-white px-5 py-1 rounded-lg text-sm hover:bg-white hover:text-blue-900 transition">
                    Login
                  </button>
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 bg-black/80 backdrop-blur-sm rounded-md p-4 text-center space-y-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white">Home</Link>
              <Link to="/about-us" onClick={() => setMenuOpen(false)} className="block text-white">About Us</Link>
              <Link to="/feedback" onClick={() => setMenuOpen(false)} className="block text-white">Feedback</Link>
              <Link to="/categories" onClick={() => setMenuOpen(false)} className="block text-white">Categories</Link>
              {user ? (
                <Link to="/userDashboard" onClick={() => setMenuOpen(false)}>
                  <button className="bg-blue-900 w-full text-white px-5 py-1 rounded-lg text-sm hover:bg-white hover:text-blue-900 transition">
                    My_Profile
                  </button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="bg-blue-900 w-full text-white px-5 py-1 rounded-lg text-sm hover:bg-white hover:text-blue-900 transition">
                    Login
                  </button>
                </Link>
              )}
            </div>
          )}
        </header>

        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-4xl sm:text-6xl font-playfair drop-shadow-[8px_4px_5px_rgb(43,1,254)]">
            Welcome to <span className="text-[#4A69E2]">Antarix</span>
          </h1>
          <p className="mt-6 text-white font-medium text-lg max-w-xl mx-auto px-6 py-3 rounded-md">
            Explore a universe of stories, knowledge, and imagination. Your next great read is just a search away.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex flex-col items-center gap-4 w-full px-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books, authors, or genres"
              className="px-6 py-3 w-full max-w-xl text-lg rounded-full text-center text-gray-900 bg-white/90 placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-[#4A69E2] focus:outline-none transition duration-300"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#4A69E2] text-white font-bold rounded-full hover:bg-[#3B5BDB] transition duration-300 transform hover:-translate-y-1 shadow-md"
            >
              Search Now
            </button>
          </form>

          <div className="self-center mt-32 text-center max-w-md px-4">
            <h2 className="text-yellow-300 text-3xl font-playfair">Our Featured Collections</h2>
            <p className="text-white mt-4 backdrop-blur-sm">
              Discover curated collections from various genres and eras.
              Handpicked by our librarians to spark your curiosity and imagination.
            </p>
          </div>
        </div>

        {/* Featured Section */}
        <section className="mt-16">
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {[
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
              "https://media.istockphoto.com/id/1218656325/photo/laptop-with-online-library-realistic-3d-rendering.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZwTbE90EDfj64GhZRRsqipTaa-kHlXbpDZKQ6fozpQA=",
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=60",
              "https://media.istockphoto.com/id/481209467/photo/youth-reading-books-in-library.webp?a=1&b=1&s=612x612&w=0&k=20&c=znfjoCoOJ778yCVjojhwCcnjApP7k3pJ8KRA6p0VaDU=",
              "https://images.unsplash.com/photo-1749219466252-8eb6f6647fbc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxpYnJhcnklMjBhbmQlMjBib29rcyUyMG1ldXNpdW1zfGVufDB8fDB8fHww",
            ].map((url, index) => (
              <div
                key={index}
                className="p-1 bg-gradient-to-br from-[#1C2341] via-[#10152B] to-[#090D1B] rounded-xl shadow-xl hover:shadow-blue-500/30 transition"
              >
                <div className="p-1 bg-[#10152B] rounded-lg">
                  <img
                    src={url}
                    alt="Library content"
                    className="w-[300px] h-60 object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
