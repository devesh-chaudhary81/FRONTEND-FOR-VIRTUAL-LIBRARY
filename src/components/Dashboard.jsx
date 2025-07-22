import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const booksData = [
    { name: "Books in Shelf", value: 8 },
    { name: "Favourites", value: 3 },
  ];

  const interestData = [
    { name: "AI", value: 2 },
    { name: "Sci-Fi", value: 3 },
    { name: "History", value: 1 },
  ];

  const readingTracker = [
    { day: "July 18", pages: 25 },
    { day: "July 19", pages: 40 },
    { day: "July 20", pages: 10 },
    { day: "July 21", pages: 35 },
    { day: "July 22", pages: 50 },
  ];

  const recentActivity = [
    { date: "July 18", action: "Read: 'Atomic Habits'" },
    { date: "July 19", action: "Bookmarked: 'The Alchemist'" },
    { date: "July 20", action: "Completed: 'Deep Work'" },
    { date: "July 21", action: "Feedback: 'Loved the interface!'" },
    { date: "July 22", action: "Read: 'Hooked'" },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">📚 MyLibrary</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left w-full"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate('/books')}
          className="bg-gray-100 hover:bg-gray-200 text-blue-800 px-4 py-3 rounded-xl text-left w-full"
        >
          📖 My Books
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="bg-gray-100 hover:bg-gray-200 text-blue-800 px-4 py-3 rounded-xl text-left w-full"
        >
          👤 Profile
        </button>
      </aside>

      {/* Dashboard Main Content */}
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Books Breakdown</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={booksData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name }) => name}
              >
                {booksData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Your Interests</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={interestData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name }) => name}
              >
                {interestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📅 Last 5 Days Activity</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            {recentActivity.map((item, idx) => (
              <li key={idx}>
                <strong>{item.date}</strong>: {item.action}
              </li>
            ))}
          </ul>
        </div>

        {/* 📈 Reading Tracker */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📈 5-Day Reading Tracker (Pages)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={readingTracker}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pages" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-toastify';
// import Navbar from '../components/sidebar';
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const userId = storedUser?._id;

//   const [favourites, setFavourites] = useState([]);
//   const [shelf, setShelf] = useState([]);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const readingTracker = [
//     { day: 'Day 1', pages: 20 },
//     { day: 'Day 2', pages: 30 },
//     { day: 'Day 3', pages: 25 },
//     { day: 'Day 4', pages: 40 },
//     { day: 'Day 5', pages: 15 },
//   ];

//   const booksData = [
//     { name: "Books in Shelf", value: shelf.length },
//     { name: "Favourites", value: favourites.length },
//   ];

//   const interestData = [
//     { name: "AI", value: 2 },
//     { name: "Sci-Fi", value: 3 },
//     { name: "History", value: 1 },
//   ];

//   const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

//   const recentActivity = [
//     { date: "July 18", action: "Read: 'Atomic Habits'" },
//     { date: "July 19", action: "Bookmarked: 'The Alchemist'" },
//     { date: "July 20", action: "Completed: 'Deep Work'" },
//     { date: "July 21", action: "Feedback: 'Loved the interface!'" },
//     { date: "July 22", action: "Read: 'Hooked'" },
//   ];

//   const fetchFavourites = async () => {
//     try {
//       const res = await axios.get(`https://api-routes.onrender.com/api/users/favourites/${userId}`);
//       setFavourites(res.data);
//     } catch (error) {
//       console.error('Favourites error:', error);
//     }
//   };

//   const fetchMyShelf = async () => {
//     try {
//       const res = await axios.get(`https://api-routes.onrender.com/api/users/shelf/${userId}`);
//       setShelf(res.data);
//     } catch (error) {
//       console.error('Shelf error:', error);
//     }
//   };

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await axios.get(`https://api-routes.onrender.com/api/feedback`, { params: { userId } });
//       setFeedbacks(res.data);
//     } catch (error) {
//       console.error('Feedback fetch error:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('userToken');
//     toast.success("Logout Successfully");
//     navigate('/login');
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return (
//           <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <h1 className="text-3xl font-bold text-gray-800 mb-8">📊 Dashboard Overview</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-white rounded-xl p-4 shadow-lg">
//                 <h2 className="text-lg font-semibold mb-2">Books Breakdown</h2>
//                 <PieChart width={300} height={300}>
//                   <Pie data={booksData} cx={150} cy={150} labelLine={false} outerRadius={100} dataKey="value" label={({ name }) => name}>
//                     {booksData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>

//               <div className="bg-white rounded-xl p-4 shadow-lg">
//                 <h2 className="text-lg font-semibold mb-2">Your Interests</h2>
//                 <PieChart width={300} height={300}>
//                   <Pie data={interestData} cx={150} cy={150} labelLine={false} outerRadius={100} dataKey="value" label={({ name }) => name}>
//                     {interestData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
//               <h2 className="text-xl font-semibold mb-4">📅 Last 5 Days Activity</h2>
//               <ul className="list-disc ml-6 space-y-2 text-gray-700">
//                 {recentActivity.map((item, idx) => (
//                   <li key={idx}><strong>{item.date}</strong>: {item.action}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
//               <h2 className="text-xl font-semibold mb-4">📈 5-Day Reading Tracker (Pages)</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={readingTracker}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="pages" fill="#4F46E5" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </motion.div>
//         );

//       // keep other cases unchanged...

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
//       <div className="flex h-screen overflow-hidden">
//         <aside className="w-72 min-h-screen bg-blue-950 text-white px-6 py-8 shadow-xl border-r border-blue-800">
//           <h2 className="text-3xl font-extrabold mb-1 text-cyan-300">Antarix</h2>
//           <p className="text-sm mb-6 text-cyan-100 italic">Welcome back, <span className="font-semibold text-cyan-200">{storedUser?.name}</span> 👋</p>

//           <div className="flex flex-col gap-6">
//             <button onClick={() => navigate('/')} className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left">🏠 Home</button>
//             <button onClick={() => setActiveTab('dashboard')} className={`${activeTab === 'dashboard' ? 'text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>📊 Dashboard</button>
//             <button onClick={() => { setActiveTab('favourites'); fetchFavourites(); }} className={`${activeTab === 'favourites' ? 'text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>⛉ Favourites</button>
//             <button onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }} className={`${activeTab === 'myshelf' ? 'text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>𝄜 MyShelf</button>
//             <button onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }} className={`${activeTab === 'feedbacks' ? 'text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>🗁 Feedbacks</button>
//             <button onClick={() => navigate('/edit-profile')} className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left">⚙️ Edit-Profile</button>
//             <button onClick={handleLogout} className="bg-blue-800 hover:bg-red-600 text-white transition-all px-4 py-3 rounded-xl text-left mt-4">⏻ Logout</button>
//           </div>
//         </aside>

//         <main className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-10 overflow-y-auto drop-shadow-[0_0_4px_#00ffff]">
//           <AnimatePresence mode="wait">
//             {renderContent()}
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
