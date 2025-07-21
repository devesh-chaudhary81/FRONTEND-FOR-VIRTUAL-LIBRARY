import React, { useState } from 'react';
import bgImg from '../assets/signup-bg.png'; // your background
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.warn("Passwords don't match!");
    return;
  }

  try {
    const response = await axios.post(
      `https://api-routes.onrender.com/api/users/register`,
      {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      }
    );

    if (response.status === 200) {
      toast.success("Signup successful!");
      navigate("/login");
    }
  } catch (error) {
    console.error("Signup failed →", error.response?.data || error.message);
    toast.error(
      error.response?.data?.message || "Signup failed. Please try again later."
    );
  }
};

  return (
    <div className="relative w-full h-screen overflow-hidden font-['Urbanist']">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute w-[110%] h-[110%] object-cover filter blur-[2px] brightness-[0.85] contrast-[1.1] saturate-[1.2] z-0"
      />
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Signup Box */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        <div className="w-[90%] max-w-md bg-black/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-2 drop-shadow-md">
            <span className="text-white">Join</span>{' '}
            <span className="text-purple-300 animate-pulse">Antarix</span>
          </h2>
          <p className="text-center text-cyan-400 font-semibold mb-6 text-lg">
            Create your account
          </p>

          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="👤  Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="email"
              name="email"
              placeholder="📧  Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              name="username"
              placeholder="👤  Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="password"
              name="password"
              placeholder="🔒  Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="🔒  Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 rounded-md font-semibold text-white"
            >
              Signup
            </button>
          </form>

          <div className="mt-6 text-sm text-center space-y-1">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-[#4dd0e1] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

