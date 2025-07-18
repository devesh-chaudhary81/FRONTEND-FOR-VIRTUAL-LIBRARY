import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    city: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://api-routes.onrender.com/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      setSubmitted(true);
      alert("Form submitted successfully!");
      setFormData({ fullName: '', email: '', age: '', city: '', message: '' });
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-4xl bg-[#2121215e] shadow-[0_4px_50px_rgba(0,0,0,0.968)] rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-yellow-400 underline text-5xl md:text-6xl font-semibold drop-shadow-[2px_2px_4px_black] font-sans">
            Feedback Form
          </h1>
          <h3 className="mt-2 text-white text-sm md:text-base">
            Your words matter to us. Please write your feedback below
          </h3>
        </div>

        {submitted && (
          <p className="text-green-500 text-center mt-4">Thank you for your feedback!</p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-12 w-full space-y-6">
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
            <div className="w-full md:w-1/2 text-yellow-400">
              <label htmlFor="fullName" className="text-lg block">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full h-10 mt-1 rounded-md px-2 text-black"
                required
              />
            </div>
            <div className="w-full md:w-1/2 text-yellow-400">
              <label htmlFor="email" className="text-lg block">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                className="w-full h-10 mt-1 rounded-md px-2 text-black"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
            <div className="w-full md:w-1/2 text-yellow-400">
              <label htmlFor="age" className="text-lg block">Age</label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full h-10 mt-1 rounded-md px-2 text-black"
                min="1"
                required
              />
            </div>
            <div className="w-full md:w-1/2 text-yellow-400">
              <label htmlFor="city" className="text-lg block">City</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full h-10 mt-1 rounded-md px-2 text-black"
                required
              />
            </div>
          </div>

          <div className="text-yellow-400">
            <label htmlFor="message" className="text-lg block">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full mt-1 rounded-md px-2 py-2 h-32 resize-none text-black"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

