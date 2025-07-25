
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
const location = useLocation();
const hideSearchBarRoutes = ['/', '/home', '/login', '/signup'];
const shouldHideSearchBar = hideSearchBarRoutes.includes(location.pathname);


const isLoggedIn = Boolean(localStorage.getItem('user'));

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
    <nav className="bg-[#5B88C4] shadow-[0_4px_12px_rgba(0,0,0,0.4)] z-50 w-full fixed top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h2 className="text-3xl font-extrabold tracking-wide text-white font-serif whitespace-nowrap">
          <span className="text-4xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-md tracking-tight">Antari</span>
          <span className="text-4xl sm:text-4xl font-extrabold text-indigo-900 drop-shadow-md tracking-tight">x</span>
          
        </h2>

        {/* Search Bar */}
        {!shouldHideSearchBar && (
          <form
          onSubmit={handleSearch}
          className="hidden lg:flex w-[30%] items-center h-[25px]  rounded-full px-3 bg-[#FAF7F3] py-1 w-64 shadow-md"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow text-gray-700 px-3 py-1 rounded-l-full bg-[#FAF7F3] h-[25px] outline-none text-sm"
            placeholder="Search books..."
          />
          <button type="submit" className="text-[#5B88C4] hover:text-blue-600 transition p-1">
            <FaSearch size={16} />
          </button>
        </form>
        )}
        

        {/* Desktop Menu */}
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex gap-8 items-center text-white font-sans font-semibold text-[17px]">
            <li>
              <Link to="/" className="flex items-center gap-1 hover:text-blue-200 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="flex items-center gap-1 hover:text-blue-200 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="flex items-center gap-1 hover:text-blue-200 transition">
               Feedback
              </Link>
            </li>
            <li>
              <Link to="/categories" className="flex items-center gap-1 hover:text-blue-200 transition">
              Categories
              </Link>
            </li>
             {isLoggedIn ? (
              <li>
                <Link to="/userDashboard" className="flex items-center gap-1 hover:text-blue-200 transition">
                  My Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="flex items-center gap-1 hover:text-blue-200 transition">
                  Login
                </Link>
              </li>
            )
          }
              
          </ul>

          {/* Hamburger */}
          <button className="text-white lg:hidden focus:outline-none" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#4F7BB0] px-6 pb-4 text-white font-serif">
          <ul className="flex flex-col gap-4 text-[17px] font-semibold">
            <li>
              <Link to="/" onClick={closeMenu} className="flex items-center gap-1 hover:text-blue-200 transition">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={closeMenu} className="flex items-center gap-1 hover:text-blue-200 transition">
                ℹ️ About Us
              </Link>
            </li>
            <li>
              <Link to="/feedback" onClick={closeMenu} className="flex items-center gap-1 hover:text-blue-200 transition">
                💬 Feedback
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={closeMenu} className="flex items-center gap-1 hover:text-blue-200 transition">
                📚 Categories
              </Link>
            </li>
            <li>
              <Link to="/userDashboard" onClick={closeMenu} className="flex items-center gap-1 hover:text-blue-200 transition">
                👤 My Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

