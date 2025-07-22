import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;

  const [favourites, setFavourites] = useState([]);
  const [shelf, setShelf] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');

  const readingTracker = [
    { day: 'Day 1', pages: 20 },
    { day: 'Day 2', pages: 30 },
    { day: 'Day 3', pages: 25 },
    { day: 'Day 4', pages: 40 },
    { day: 'Day 5', pages: 15 },
  ];

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(`https://api-routes.onrender.com/api/users/favourites/${userId}`);
      setFavourites(res.data);
    } catch (error) {
      console.error('Favourites error:', error);
    }
  };

  const fetchMyShelf = async () => {
    try {
      const res = await axios.get(`https://api-routes.onrender.com/api/users/shelf/${userId}`);
      setShelf(res.data);
    } catch (error) {
      console.error('Shelf error:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`https://api-routes.onrender.com/api/feedback`, { params: { userId } });
      setFeedbacks(res.data);
    } catch (error) {
      console.error('Feedback fetch error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    toast.success("Logout Successfully");
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'favourites':
        return (
          <motion.div key="favourites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-bold mb-6 text-blue-950">📘 Favourite Books</h3>
            <div className="flex flex-col gap-3">
              {favourites.map(book => (
                <a key={book._id} href={`/read/${book._id}`} className="px-4 py-2 rounded-lg bg-blue-900 w-[300px] text-white hover:bg-cyan-600 transition-all shadow-md drop-shadow-[0_0_2px_#00ffff] hover:scale-[1.02] text-left">
                  {book.title}
                </a>
              ))}
            </div>
          </motion.div>
        );

      case 'myshelf':
        return (
          <motion.div key="myshelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-3xl font-bold text-[#0a1f44] mb-8 text-center">MyShelf</h3>
            <div className="flex flex-wrap gap-10 justify-center">
              {shelf.map(({ bookId }) => (
                <div key={bookId._id} className="w-[300px] bg-[#b3d5f4] border-t-[6px] border-[#0a1f44] rounded-xl shadow-md p-5 flex flex-col justify-center items-center transition-transform hover:scale-105">
                  <div>
                    <h4 className="text-lg font-semibold text-[#0a1f44] mb-1">{bookId.title}</h4>
                    <p className="text-sm text-[#1f3b56] mb-4">{bookId.author}</p>
                  </div>
                  <img src={bookId.coverImageURL} alt={bookId.title} className="w-full h-40 object-contain mb-4" />
                  <a href={`/read/${bookId._id}`} className="text-sm text-[#0a1f44] font-medium hover:underline mt-auto">▶️ Read Book</a>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'feedbacks':
        return (
          <motion.div key="feedbacks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-3xl font-extrabold text-blue-950 mb-6 text-center tracking-wide">Feedbacks</h3>
            {feedbacks.length > 0 ? feedbacks.map(fb => (
              <div key={fb._id} className="p-5 bg-gradient-to-br from-blue-100 to-blue-300 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 mb-4">
                <p className="font-semibold text-blue-900 text-lg mb-1">{fb.fullName}</p>
                <p className="text-[#1e3a5f] mb-2">{fb.message}</p>
                <small className="text-gray-500">{new Date(fb.createdAt).toLocaleString()}</small>
              </div>
            )) : (
              <p className="text-blue-500 italic text-center mt-4">No feedbacks found.</p>
            )}
          </motion.div>
        );

      case 'reading':
        return (
          <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-3xl font-bold text-blue-950 mb-6 text-center">📅 5-Day Reading Tracker</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {readingTracker.map((entry, index) => (
                <div key={index} className="bg-white shadow-md rounded-xl p-4 border border-blue-200">
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">{entry.day}</h4>
                  <p className="text-blue-800">Pages read: <span className="font-bold">{entry.pages}</span></p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen bg-blue-950 text-white px-6 py-8 shadow-xl border-r border-blue-800">
        <h2 className="text-3xl font-extrabold mb-1 text-cyan-300">Antarix</h2>
        <p className="text-sm mb-6 text-cyan-100 italic">
          Welcome back, <span className="font-semibold text-cyan-200">{storedUser?.name}</span> 👋
        </p>

        <div className="flex flex-col gap-6">
          <button onClick={() => navigate('/')} className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left">
            🏠 Home
          </button>

          <button onClick={() => navigate('/dashboard')} className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left">
            Dashboard
          </button>

          <button onClick={() => { setActiveTab('favourites'); fetchFavourites(); }}
            className={`${activeTab === 'favourites' ? ' text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>
            ⛉ Favourites
          </button>

          <button onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }}
            className={`${activeTab === 'myshelf' ? 'text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>
            𝄜 MyShelf
          </button>

          <button onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }}
            className={`${activeTab === 'feedbacks' ? 'text-white font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}>
            🗁 Feedbacks
          </button>

         

          <button onClick={() => navigate('/settings')} className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left">
            ⚙️ Settings
          </button>

          <button onClick={handleLogout} className="bg-blue-800 hover:bg-red-600 text-white transition-all px-4 py-3 rounded-xl text-left mt-4">
            ⏻ Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-10 overflow-y-auto drop-shadow-[0_0_4px_#00ffff]">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserDashboard;
