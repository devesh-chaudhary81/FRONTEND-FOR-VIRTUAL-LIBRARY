// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import Sidebar from '../components/sidebar';

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     age: '',
//     city: '',
//     message: ''
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.id]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id;

//     if (!userId) {
//       toast.error("User not logged in");
//       return;
//     }

//     try {
//       const response = await fetch("https://api-routes.onrender.com/api/feedback", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, userId })
//       });

//       if (!response.ok) throw new Error("Failed to submit feedback");

//       setSubmitted(true);
//       toast.success("Feedback submitted!");
//       setFormData({ fullName: '', email: '', age: '', city: '', message: '' });
//     } catch (err) {
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-950 to-black text-white">
//       <Sidebar />
//       <div className="flex flex-1 items-center justify-center p-6">
//         <div className="w-full max-w-4xl bg-blue-950/40 border border-blue-700 rounded-2xl p-10 shadow-[0_0_30px_rgba(0,0,0,0.7)] backdrop-blur-lg">
//           <div className="text-center mb-8">
//             <h1 className="text-blue-400 text-5xl font-extrabold tracking-tight drop-shadow-md">
//               Feedback Form
//             </h1>
//             <p className="mt-2 text-blue-100 text-lg">We'd love to hear your thoughts!</p>
//           </div>

//           {submitted && (
//             <p className="text-green-400 text-center mb-4 font-semibold">
//               Thank you for your feedback!
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-semibold text-blue-200 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-semibold text-blue-200 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="john@example.com"
//                   className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="age" className="block text-sm font-semibold text-blue-200 mb-1">
//                   Age
//                 </label>
//                 <input
//                   type="number"
//                   id="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   placeholder="Your age"
//                   className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   min="1"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="city" className="block text-sm font-semibold text-blue-200 mb-1">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="Your city"
//                   className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="message" className="block text-sm font-semibold text-blue-200 mb-1">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Write your message here..."
//                 className="w-full h-36 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
//             >
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedbackForm;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../components/sidebar';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    city: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const response = await fetch("https://api-routes.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId })
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      setSubmitted(true);
      toast.success("Feedback submitted!");
      setFormData({ fullName: '', email: '', age: '', city: '', message: '' });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 to-black text-white">
      <Sidebar />
      <div className="flex flex-1 items-start justify-center px-4 sm:px-8 py-10 md:py-16">
        <div className="w-full max-w-4xl bg-blue-950/40 border border-blue-700 rounded-2xl p-8 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.7)] backdrop-blur-lg">
          
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-blue-400 text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
              Share Your Feedback ✨
            </h1>
            <p className="mt-2 text-blue-100 text-base md:text-lg">
              We value your thoughts! Let us know what you love, what could be better, or any features you'd like to see in Antarix.
            </p>
          </div>

          {submitted && (
            <p className="text-green-400 text-center mb-4 font-semibold">
              Thank you for your feedback!
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-blue-200 mb-1">
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

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-blue-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-blue-200 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="1"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-blue-200 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full h-11 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-blue-200 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full h-36 rounded-lg bg-blue-100/10 border border-blue-700 text-white placeholder-blue-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
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
    </div>
  );
};

export default FeedbackForm;


