import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="backdrop-blur-sm mt-12 text-white relative font-poppins">
      {/* Diagonal Section */}
      

      {/* Footer Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-16 flex flex-wrap gap-10 justify-between">
        
        {/* Branding */}
        <div className="flex-1 min-w-[200px]">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/books.png" alt="Antarix Logo" className="w-12 mb-2 brightness-90" />
          <p className="text-sm text-gray-300">Simply the gateway to infinite knowledge.</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="mb-4 font-medium text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
           <li><Link to="/home">Home</Link></li> 
            <li><Link to="/userDashboard">My Profile</Link></li>
            <li><Link to="/about-us">About us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="mb-4 font-medium text-white">Contact Us</h4>
          <p className="text-sm text-gray-300 flex items-center gap-2"><FaMapMarkerAlt className="text-white" /> Antarix HQ, BookCity - 101010</p>
          <p className="text-sm text-gray-300 flex items-center gap-2"><FaPhoneAlt className="text-white" /> +91 98765 43210</p>
          <p className="text-sm text-gray-300 flex items-center gap-2"><FaEnvelope className="text-white" /> support@antarixlibrary.com</p>
        </div>

        {/* Newsletter */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="mb-4 font-medium text-white">Stay Informed</h4>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 bg-[#132d51] border border-[#274870] text-sm text-white placeholder-gray-400 rounded-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#ff8e72] text-white font-medium rounded-md hover:bg-[#ff6d4a] transition"
            >
              Join Now
            </button>
          </form>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 border-t border-[#1e3c67] py-4">
        © 2025 Antarix. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
