import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaCommentDots,
  FaThList,
  FaUserCircle,
  FaSearch,
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-gradient-to-br from-blue-950 to-black text-white shadow-lg z-50 w-full fixed top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side: Logo */}
        <h2
          className="text-3xl font-extrabold tracking-wide font-serif whitespace-nowrap"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Antari<span className="text-cyan-400 italic">x</span>
        </h2>

        {/* Center: Search bar (only visible on large screens) */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center bg-[#E9E3DF]  rounded-full px-3 py-1 w-64"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-black px-2 py-1 rounded-l-full bg-[#E9E3DF] outline-none text-sm"
            placeholder="Search books..."
          />
          <button
            type="submit"
            className="text-blue-900 hover:text-cyan-600 transition p-1"
          >
            <FaSearch size={14} />
          </button>
        </form>

        {/* Right side: Desktop links + Hamburger */}
        <div className="flex items-center gap-6">
          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-10 items-center text-md font-medium">
            <li>
              <Link to="/" className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaInfoCircle /> About Us
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaCommentDots /> Feedback
              </Link>
            </li>
            <li>
              <Link to="/categories" className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaThList /> Categories
              </Link>
            </li>
            <li>
              <Link to="/userDashboard" className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaUserCircle /> My Profile
              </Link>
            </li>
          </ul>

          {/* Hamburger Button - Mobile only */}
          <button
            className="text-white lg:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-br from-blue-950 to-black px-6 pb-4">
          <ul className="flex flex-col gap-4 text-md font-medium">
            <li>
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaInfoCircle /> About Us
              </Link>
            </li>
            <li>
              <Link to="/feedback" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaCommentDots /> Feedback
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaThList /> Categories
              </Link>
            </li>
            <li>
              <Link to="/userDashboard" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
                <FaUserCircle /> My Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FaBars,
//   FaTimes,
//   FaHome,
//   FaInfoCircle,
//   FaCommentDots,
//   FaThList,
//   FaUserCircle,
// } from 'react-icons/fa';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const closeMenu = () => setIsOpen(false);

//   return (
//     <nav className="bg-gradient-to-br from-blue-950 to-black text-white shadow-lg z-50 w-full fixed top-0 left-0">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h2
//   className="text-3xl font-extrabold tracking-wide font-serif"
//   style={{ fontFamily: 'Cinzel, serif' }}
// >
//   Antari<span className="text-cyan-400 italic">x</span>
// </h2>

//         {/* Desktop Links */}
//         <ul className="hidden lg:flex gap-16 items-center text-md font-medium">
//           <li>
//             <Link to="/" className="flex items-center gap-2 hover:text-cyan-400 transition">
//               <FaHome /> Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about-us" className="flex items-center gap-2 hover:text-cyan-400 transition">
//               <FaInfoCircle /> About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/feedback" className="flex items-center gap-2 hover:text-cyan-400 transition">
//               <FaCommentDots /> Feedback
//             </Link>
//           </li>
//           <li>
//             <Link to="/categories" className="flex items-center gap-2 hover:text-cyan-400 transition">
//               <FaThList /> Categories
//             </Link>
//           </li>
//           <li>
//             <Link to="/userDashboard" className="flex items-center gap-2 hover:text-cyan-400 transition">
//               <FaUserCircle /> My Profile
//             </Link>
//           </li>
//         </ul>

//         {/* Hamburger Button - Mobile only */}
//         <button
//           className="text-white lg:hidden focus:outline-none"
//           onClick={toggleMenu}
//         >
//           {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="lg:hidden bg-gradient-to-br from-blue-950 to-black px-6 pb-4">
//           <ul className="flex flex-col gap-4 text-md font-medium">
//             <li>
//               <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
//                 <FaHome /> Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/about-us" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
//                 <FaInfoCircle /> About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/feedback" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
//                 <FaCommentDots /> Feedback
//               </Link>
//             </li>
//             <li>
//               <Link to="/categories" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
//                 <FaThList /> Categories
//               </Link>
//             </li>
//             <li>
//               <Link to="/userDashboard" onClick={closeMenu} className="flex items-center gap-2 hover:text-cyan-400 transition">
//                 <FaUserCircle /> My Profile
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
