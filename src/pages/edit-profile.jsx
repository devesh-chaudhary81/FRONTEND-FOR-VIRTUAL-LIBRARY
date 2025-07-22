import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/sidebar";

const EditProfile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // Prefill formData from storedUser
 useEffect(() => {
  const storedUserJSON = localStorage.getItem("user");
  if (storedUserJSON) {
    const storedUser = JSON.parse(storedUserJSON);
    setFormData({
      name: storedUser.name || "",
      email: storedUser.email || "",
      username: storedUser.username || "",
      password: "",
    });
  }
}, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
      };

      if (formData.password.trim() !== "") {
        updatedFields.password = formData.password;
      }

      const res = await axios.put(`http://localhost:3000/api/users/${userId}`, updatedFields);
      if (res.status === 200) {
  // ✅ Save updated user to localStorage
  localStorage.setItem("user", JSON.stringify(res.data));

  toast.success("Profile updated successfully");
  navigate("/userDashboard"); // or reload the page if needed
}

    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
        <div><Navbar/></div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">Edit Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          placeholder="New Password (optional)"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;


