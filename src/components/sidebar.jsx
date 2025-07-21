
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaCommentDots,
  FaThList,
  FaUserCircle,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Hamburger Icon - show only when sidebar is closed */}
      {!isOpen && (
        <button
          className="text-white bg-blue-600 p-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 fixed top-5 left-5 z-50"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-950 to-black text-white p-6 transition-transform duration-500 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl`}
      >
        {/* Close (X) Icon inside sidebar */}
        <button
          className="absolute top-5 right-5 text-white hover:text-blue-300 transition"
          onClick={toggleSidebar}
        >
          <FaTimes size={22} />
        </button>

        {/* Sidebar Title */}
        <h2 className="text-2xl font-bold mb-8 border-b pb-3">Antarix</h2>

        {/* Sidebar Links */}
        <ul className="space-y-5">
          <li>
            <Link
              to="/"
              onClick={handleLinkClick}
              className="w-full flex items-center gap-4 px-4 py-3  bg-gradient-to-br from-blue-950 to-black hover:bg-blue-400 rounded-xl shadow-lg drop-shadow-[0_0_4px_#00ffff] transition duration-300 hover:scale-[1.02]"
            >
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className="w-full flex items-center gap-4 px-4 drop-shadow-[0_0_4px_#00ffff] py-3 bg-gradient-to-br from-blue-950 to-black hover:bg-blue-400 rounded-xl shadow-lg transition duration-300 hover:scale-[1.02]"
            >
              <FaInfoCircle /> <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              onClick={handleLinkClick}
              className="w-full flex items-center gap-4 drop-shadow-[0_0_4px_#00ffff] px-4 py-3 bg-gradient-to-br from-blue-950 to-black hover:bg-blue-400 rounded-xl shadow-lg transition duration-300 hover:scale-[1.02]"
            >
              <FaCommentDots /> <span>Feedback</span>
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              onClick={handleLinkClick}
              className="w-full flex items-center drop-shadow-[0_0_4px_#00ffff] gap-4 px-4 py-3 bg-gradient-to-br from-blue-950 to-black hover:bg-blue-400 rounded-xl shadow-lg transition duration-300 hover:scale-[1.02]"
            >
              <FaThList /> <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to="/userDashboard"
              onClick={handleLinkClick}
              className="w-full flex items-center gap-4 px-4 py-3 bg-gradient-to-br from-blue-950 to-black drop-shadow-[0_0_4px_#00ffff] hover:bg-blue-400 rounded-xl shadow-lg transition duration-300 hover:scale-[1.02]"
            >
              <FaUserCircle /> <span>My Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
