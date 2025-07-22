import React, { useEffect, useState } from 'react'
import backgroundImage from "../assets/background2.png";
import logo from "../assets/logo3.jpg";
import { Link } from "react-router-dom";

function Header() {
     const [user, setUser] = useState(null);
    
      // ✅ Load user from localStorage when component mounts
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    
        // Optional: listen for storage changes (e.g., other tabs logging in/out)
        const handleStorageChange = () => {
          const updatedUser = localStorage.getItem("user");
          setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };
    
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
      }, []);
  return (
    <>
    <div
        className="fixed top-0 left-0 w-full min-h-screen h-full bg-cover bg-center opacity-1 -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 -z-10"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-[Inter] text-[#D1D9FF] min-h-screen">
        {/* Header */}
        <header className="top-0 z-50 py-4">
          <div className="flex justify-between items-center">
            <img
              src={logo}
              alt="logo"
              className="w-[350px] h-[200px] -translate-x-24 -translate-y-12"
            />
            <nav className="flex gap-20  -mt-24 ml-12">
              <Link
                to="/"
                className="text-white text-lg w-24 text-center rounded-md hover:underline hover:decoration-yellow-400 font-medium"
              >
                Home
              </Link>
              {/* <Link
                to="#"
                className="text-white text-lg w-24 text-center rounded-md hover:underline hover:decoration-yellow-400 font-medium"
              >
                My Shelf
              </Link> */}
              <Link
                to="/about-us"
                className="text-white text-lg w-24 text-center rounded-md hover:underline hover:decoration-yellow-400 font-medium"
              >
                About Us
              </Link>
              <Link
                to="/feedback"
                className="text-white text-lg w-24 text-center rounded-md hover:underline hover:decoration-yellow-400 font-medium"
              >
                Feedback
              </Link>
              <Link
                to="/categories"
                className="text-white text-lg w-24 text-center rounded-md hover:underline hover:decoration-yellow-400 font-medium"
              >
                Categories
              </Link>
              {user ? (
                <Link to="/userDashboard">
                  <button className="bg-blue-900 text-white px-5 py-1 rounded-lg text-sm hover:bg-white hover:text-blue-900 transition">
                    Me
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
        </header>
        </div>
    </>
    
  )
}

export default Header;