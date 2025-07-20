// import React, { useState } from 'react';

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     age: '',
//     city: '',
//     message: ''
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.id]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const user = JSON.parse(localStorage.getItem("user")); // get logged-in user
//   const userId = user?._id;

//   if (!userId) {
//     setError("User not logged in");
//     return;
//   }

//     try {
//       const response = await fetch("https://api-routes.onrender.com/api/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({...formData, userId})
//       });

//       if (!response.ok) throw new Error("Failed to submit feedback");

//       setSubmitted(true);
//       alert("Form submitted successfully!");
//       setFormData({ fullName: '', email: '', age: '', city: '', message: '' });
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4">
//       <div className="w-full max-w-4xl bg-[#2121215e] shadow-[0_4px_50px_rgba(0,0,0,0.968)] rounded-lg p-8">
//         <div className="text-center">
//           <h1 className="text-yellow-400 underline text-5xl md:text-6xl font-semibold drop-shadow-[2px_2px_4px_black] font-sans">
//             Feedback Form
//           </h1>
//           <h3 className="mt-2 text-white text-sm md:text-base">
//             Your words matter to us. Please write your feedback below
//           </h3>
//         </div>

//         {submitted && (
//           <p className="text-green-500 text-center mt-4">Thank you for your feedback!</p>
//         )}
//         {error && (
//           <p className="text-red-500 text-center mt-4">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="mt-12 w-full space-y-6">
//           <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
//             <div className="w-full md:w-1/2 text-yellow-400">
//               <label htmlFor="fullName" className="text-lg block">Full Name</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 className="w-full h-10 mt-1 rounded-md px-2 text-black"
//                 required
//               />
//             </div>
//             <div className="w-full md:w-1/2 text-yellow-400">
//               <label htmlFor="email" className="text-lg block">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="john@gmail.com"
//                 className="w-full h-10 mt-1 rounded-md px-2 text-black"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
//             <div className="w-full md:w-1/2 text-yellow-400">
//               <label htmlFor="age" className="text-lg block">Age</label>
//               <input
//                 type="number"
//                 id="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 placeholder="Enter your age"
//                 className="w-full h-10 mt-1 rounded-md px-2 text-black"
//                 min="1"
//                 required
//               />
//             </div>
//             <div className="w-full md:w-1/2 text-yellow-400">
//               <label htmlFor="city" className="text-lg block">City</label>
//               <input
//                 type="text"
//                 id="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="Enter your city"
//                 className="w-full h-10 mt-1 rounded-md px-2 text-black"
//                 required
//               />
//             </div>
//           </div>

//           <div className="text-yellow-400">
//             <label htmlFor="message" className="text-lg block">Message</label>
//             <textarea
//               id="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Write your message here..."
//               className="w-full mt-1 rounded-md px-2 py-2 h-32 resize-none text-black"
//               required
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeedbackForm;

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

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      setError("User not logged in");
      return;
    }

    try {
      const response = await fetch("https://api-routes.onrender.com/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, userId })
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 to-black p-4">
      <div className="w-full max-w-4xl bg-blue-950/40 border border-blue-700 rounded-2xl p-10 shadow-[0_0_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <div className="text-center mb-10">
          <h1 className="text-blue-400 text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_4px_black]">
            Feedback Form
          </h1>
          <p className="mt-3 text-blue-100 text-base md:text-lg">
            Your words matter to us. Please share your thoughts below.
          </p>
        </div>

        {submitted && (
          <p className="text-green-400 text-center mb-4 font-semibold">Thank you for your feedback!</p>
        )}
        {error && (
          <p className="text-red-400 text-center mb-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="w-full md:w-1/2">
              <label htmlFor="fullName" className="block text-blue-200 mb-1 text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="email" className="block text-blue-200 mb-1 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="w-full md:w-1/2">
              <label htmlFor="age" className="block text-blue-200 mb-1 text-sm font-semibold">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="1"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="city" className="block text-blue-200 mb-1 text-sm font-semibold">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-blue-200 mb-1 text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full h-36 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
