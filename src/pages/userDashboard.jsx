
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {toast} from 'react-toastify';
const UserDashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;

  // const [readingHours, setReadingHours] = useState(0);
  // const [stats, setStats] = useState({ hoursLastMonth: 0, booksViewed: 0 });
  const [favourites, setFavourites] = useState([]);
  const [shelf, setShelf] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');

  // useEffect(() => {
  //   if (!userId) navigate('/login');
  //   else fetchReadingTime();
  // }, [userId]);

  // const fetchReadingTime = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/api/users/reading-time/${userId}`);
  //     setReadingHours(res.data.hours);
  //   } catch (error) {
  //     console.error('Reading time error:', error);
  //   }
  // };

  // const fetchStats = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/api/users/stats/${userId}`);
  //     setStats(res.data);
  //   } catch (error) {
  //     console.error('Stats error:', error);
  //   }
  // };

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/favourites/${userId}`);
      setFavourites(res.data);
    } catch (error) {
      console.error('Favourites error:', error);
    }
  };

  const fetchMyShelf = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/shelf/${userId}`);
      setShelf(res.data);
    } catch (error) {
      console.error('Shelf error:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/feedback`, { params: { userId } });
      setFeedbacks(res.data);
    } catch (error) {
      console.error('Feedback fetch error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    toast.success("Logout Successfully")
    navigate('/login');
  };

  const baseStyle = 'block w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-600 transition';
  const activeStyle = 'block w-full text-left px-4 py-2 bg-indigo-800 font-bold rounded-lg shadow';

  const renderContent = () => {
    switch (activeTab) {
      // case 'stats':
      //   return (
      //     <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      //       <h3 className="text-xl font-bold text-indigo-700 mb-4">📊 Stats</h3>
      //       <p className="text-gray-700 mb-2">🕐 Hours Last Month: {stats.hoursLastMonth}</p>
      //       <p className="text-gray-700">📘 Books Viewed: {stats.booksViewed}</p>
      //     </motion.div>
      //   );
      case 'favourites':
        return (
          <motion.div key="favourites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-green-700 mb-4">💚 Favourite Books</h3>
            <ul className="list-disc pl-5 space-y-1">
              {favourites.map(book => (
                <li key={book._id}><a href={`/read/${book._id}`} className="text-green-700 hover:underline">{book.title}</a></li>
              ))}
            </ul>
          </motion.div>
        );
      case 'myshelf':
        return (
          <motion.div key="myshelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-purple-700 mb-4">📚 MyShelf</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shelf.map(({ bookId }) => (
                <div key={bookId._id} className="bg-white p-4 shadow rounded-xl border border-gray-200">
                  <img src={bookId.coverImageURL} alt={bookId.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h4 className="font-bold text-lg">{bookId.title}</h4>
                  <p className="text-sm text-gray-500">{bookId.author}</p>
                  <a href={`/read/${bookId._id}`} className="text-purple-600 hover:underline text-sm mt-1 inline-block">▶️ Read Book</a>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'feedbacks':
        return (
          <motion.div key="feedbacks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-yellow-700 mb-4">📝 Feedbacks</h3>
            {feedbacks.length > 0 ? feedbacks.map(fb => (
              <div key={fb._id} className="p-3 bg-white rounded-lg shadow-sm border mb-2">
                <p className="font-semibold text-gray-800">{fb.fullName}</p>
                <p className="text-gray-600">{fb.message}</p>
                <small className="text-gray-400">{new Date(fb.createdAt).toLocaleString()}</small>
              </div>
            )) : <p className="text-gray-500 italic">No feedbacks found.</p>}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-indigo-700 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">📚 Dashboard</h2>
         <p className="text-sm mb-3">👋 Welcome {storedUser?.name}</p>
       
        <button onClick={() => { setActiveTab('favourites'); fetchFavourites(); }} className={activeTab === 'favourites' ? activeStyle : baseStyle}>💚 Favourites</button>
        <button onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }} className={activeTab === 'myshelf' ? activeStyle : baseStyle}>📚 MyShelf</button>
        <button onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }} className={activeTab === 'feedbacks' ? activeStyle : baseStyle}>📝 Feedbacks</button>
        <button onClick={handleLogout} className="text-red-300 hover:text-red-500 font-semibold mt-4">🔓 Logout</button>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserDashboard;


