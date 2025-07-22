import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Navbar from '../components/sidebar'; // make sure the path is correct
import { Home, Heart, Book, MessageCircle, Settings, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;
  const [favourites, setFavourites] = useState([]);
  const [shelf, setShelf] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');

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
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-blue-950 text-center">📘 Favourite Books</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {favourites.map(book => (
                <a
                  key={book._id}
                  href={`/read/${book._id}`}
                  className="px-5 py-3 rounded-xl bg-blue-900 w-[280px] text-white hover:bg-cyan-600 transition-all shadow-md drop-shadow-[0_0_3px_#00ffff] hover:scale-[1.03]"
                >
                  {book.title}
                </a>
              ))}
            </div>
          </motion.div>
        );

      case 'myshelf':
        return (
          <motion.div key="myshelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-8 text-center">📚 MyShelf</h3>
            <div className="flex flex-wrap gap-8 justify-center">
              {shelf.map(({ bookId }) => (
                <div
                  key={bookId._id}
                  className="w-[280px] bg-blue-100 border-t-4 border-blue-800 rounded-xl shadow p-4 transition hover:scale-105"
                >
                  <h4 className="text-lg font-semibold text-blue-900">{bookId.title}</h4>
                  <p className="text-sm text-blue-700 mb-3">{bookId.author}</p>
                  <img
                    src={bookId.coverImageURL}
                    alt={bookId.title}
                    className="w-full h-40 object-contain mb-3"
                  />
                  <a
                    href={`/read/${bookId._id}`}
                    className="text-sm font-medium text-blue-900 hover:underline"
                  >
                    ▶️ Read Book
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'feedbacks':
        return (
          <motion.div key="feedbacks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-6 text-center">🗣️ Feedbacks</h3>
            {feedbacks.length > 0 ? feedbacks.map(fb => (
              <div
                key={fb._id}
                className="bg-blue-100 to-blue-200 p-5 rounded-xl shadow-md mb-4 hover:shadow-lg"
              >
                <p className="font-semibold text-blue-900 text-lg">{fb.fullName}</p>
                <p className="text-blue-700">{fb.message}</p>
                <small className="text-gray-500">{new Date(fb.createdAt).toLocaleString()}</small>
              </div>
            )) : (
              <p className="text-blue-500 italic text-center mt-6">No feedbacks found.</p>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
      <Navbar />

      <div className="flex flex-col md:flex-row pt-14">
        {/* Sidebar */}
        <aside className="md:w-72 w-full md:min-h-screen bg-blue-950 text-white px-6 py-8 shadow-md pt-4 md:pt-4 flex flex-col items-center">

  {/* Centered Welcome */}
  <p className="text-lg md:text-xl mb-8 text-cyan-100 italic font-medium text-center">
    ✨ <span className="font-semibold text-cyan-300 text-xl">Welcome, {storedUser?.name}</span>
  </p>

  {/* Sidebar Buttons */}
  <div className="flex flex-col gap-4 w-full">
    <button
      onClick={() => navigate('/')}
      className="bg-blue-800 hover:bg-blue-700 px-4 py-3 rounded-xl text-left"
    >
      🏠 Home
    </button>

    <button
      onClick={() => { setActiveTab('favourites'); fetchFavourites(); }}
      className={`px-4 py-3 rounded-xl text-left ${activeTab === 'favourites'
        ? 'bg-cyan-600 font-bold shadow-md'
        : 'bg-blue-800 hover:bg-blue-700'}`}
    >
      ❤️ Favourites
    </button>

    <button
      onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }}
      className={`px-4 py-3 rounded-xl text-left ${activeTab === 'myshelf'
        ? 'bg-cyan-600 font-bold shadow-md'
        : 'bg-blue-800 hover:bg-blue-700'}`}
    >
      📚 My Shelf
    </button>

    <button
      onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }}
      className={`px-4 py-3 rounded-xl text-left ${activeTab === 'feedbacks'
        ? 'bg-cyan-600 font-bold shadow-md'
        : 'bg-blue-800 hover:bg-blue-700'}`}
    >
      💬 Feedbacks
    </button>

    <button
      onClick={() => navigate('/edit-profile')}
      className="bg-blue-800 hover:bg-blue-700 px-4 py-3 rounded-xl text-left"
    >
      ⚙️ Edit-Profile
    </button>

    <button
      onClick={handleLogout}
      className="bg-blue-800 hover:bg-red-600 px-4 py-3 rounded-xl text-left mt-6"
    >
      🚪 Logout
    </button>
  </div>
</aside>



        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {toast} from 'react-toastify';

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const userId = storedUser?._id;
//   const [favourites, setFavourites] = useState([]);
//   const [shelf, setShelf] = useState([]);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [activeTab, setActiveTab] = useState('stats');

  
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
//     toast.success("Logout Successfully")
//     navigate('/login');
//   };

//   const baseStyle = 'block w-full text-left px-4 py-2 rounded-lg hover:bg-white hover:text-indigo-600 transition';
//   const activeStyle = 'block w-full text-left px-4 py-2 bg-white text-blue-950 font-bold rounded-lg shadow';

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'favourites':
//         return (
//           <motion.div key="favourites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//   <h3 className="text-xl font-bold mb-6 text-blue-950">
//     📘 Favourite Books
//   </h3>

//   <div className="flex flex-col gap-3">
//     {favourites.map(book => (
//       <a
//         key={book._id}
//         href={`/read/${book._id}`}
//         className="px-4 py-2 rounded-lg bg-blue-900 w-[300px] text-white hover:bg-cyan-600 transition-all shadow-md drop-shadow-[0_0_2px_#00ffff] hover:scale-[1.02] text-left"
//       >
//         {book.title}
//       </a>
//     ))}
//   </div>
// </motion.div>

//         );
//       case 'myshelf':
//         return (
//     <motion.div key="myshelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//   <h3 className="text-3xl font-bold text-[#0a1f44] mb-8 text-center">MyShelf</h3>
//   <div className="flex flex-wrap gap-10 justify-center">
//     {shelf.map(({ bookId }) => (
//       <div
//         key={bookId._id}
//         className="w-[300px] bg-[#b3d5f4] border-t-[6px] border-[#0a1f44] rounded-xl shadow-md p-5 flex flex-col justify-center items-center transition-transform hover:scale-105"
//       >
//         <div>
//           <h4 className="text-lg font-semibold text-[#0a1f44] mb-1">{bookId.title}</h4>
//           <p className="text-sm text-[#1f3b56] mb-4">{bookId.author}</p>
//         </div>
//         <img
//           src={bookId.coverImageURL}
//           alt={bookId.title}
//           className="w-full h-40 object-contain mb-4"
//         />
//         <a
//           href={`/read/${bookId._id}`}
//           className="text-sm text-[#0a1f44] font-medium hover:underline mt-auto"
//         >
//           ▶️ Read Book
//         </a>
//       </div>
//     ))}
//   </div>
// </motion.div>

//         );

//         case 'feedbacks':
//         return (
//          <motion.div key="feedbacks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//   <h3 className="text-3xl font-extrabold text-blue-950 mb-6 text-center tracking-wide">Feedbacks</h3>

//   {feedbacks.length > 0 ? feedbacks.map(fb => (
//     <div
//       key={fb._id}
//       className="p-5 bg-gradient-to-br from-blue-100 to-blue-300 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 mb-4"
//     >
//       <p className="font-semibold text-blue-900 text-lg mb-1">{fb.fullName}</p>
//       <p className="text-[#1e3a5f] mb-2">{fb.message}</p>
//       <small className="text-gray-500">{new Date(fb.createdAt).toLocaleString()}</small>
//     </div>
//   )) : (
//     <p className="text-blue-500 italic text-center mt-4">No feedbacks found.</p>
//   )}
// </motion.div>

//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <aside className="w-72 min-h-screen bg-blue-950 text-white px-6 py-8 shadow-xl border-r border-blue-800">
//   {/* Header */}
//   <h2 className="text-3xl font-extrabold mb-1 text-cyan-300">Antarix</h2>
//   <p className="text-sm mb-6 text-cyan-100 italic">
//     Welcome back, <span className="font-semibold text-cyan-200">{storedUser?.name}</span> 👋
//   </p>

//   {/* Navigation Buttons */}
//   <div className="flex flex-col gap-6">
//     <button
//       onClick={() => navigate('/')}
//       className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left"
//     >
//       🏠 Home
//     </button>

//     <button
//       onClick={() => { setActiveTab('favourites'); fetchFavourites(); }}
//       className={`${activeTab === 'favourites'
//         ? ' text-white font-bold shadow-md  shadow-cyan-300'
//         : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}
//     >
//       ⛉ Favourites
//     </button>

//     <button
//       onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }}
//       className={`${activeTab === 'myshelf'
//         ? 'text-white font-bold shadow-md  shadow-cyan-300'
//         : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}
//     >
//       𝄜 MyShelf
//     </button>

//     <button
//       onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }}
//       className={`${activeTab === 'feedbacks'
//         ? 'text-white font-bold shadow-md  shadow-cyan-300'
//         : 'bg-blue-800 hover:bg-blue-700 text-white'} transition-all px-4 py-3 rounded-xl text-left`}
//     >
//       🗁 Feedbacks
//     </button>

//     <button
//       onClick={() => navigate('/settings')}
//       className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left"
//     >
//       ⚙️ Settings
//     </button>

//     <button
//       onClick={handleLogout}
//       className="bg-blue-800 hover:bg-red-600 text-white transition-all px-4 py-3 rounded-xl text-left mt-4"
//     >
//       ⏻ Logout
//     </button>
//   </div>
// </aside>






//       <main className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-10 overflow-y-auto drop-shadow-[0_0_4px_#00ffff]">
//         <AnimatePresence mode="wait">
//           {renderContent()}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;


