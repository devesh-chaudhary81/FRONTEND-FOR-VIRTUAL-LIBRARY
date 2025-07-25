

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Navbar from '../components/sidebar';
import { Link } from 'react-router-dom';
import  Footer from '../components/footer'
import { FaTrashAlt } from 'react-icons/fa';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const UserDashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;

  const [favourites, setFavourites] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [BookReadData,setBookReadData]=useState([]);
  const [shelf, setShelf] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const readingTracker = [
    { day: 'Day 1', pages: 20 },
    { day: 'Day 2', pages: 30 },
    { day: 'Day 3', pages: 25 },
    { day: 'Day 4', pages: 40 },
    { day: 'Day 5', pages: 15 },
  ];


 

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

  const recentActivity = [
    { date: "July 18", action: "Read: 'Atomic Habits'" },
    { date: "July 19", action: "Bookmarked: 'The Alchemist'" },
    { date: "July 20", action: "Completed: 'Deep Work'" },
    { date: "July 21", action: "Feedback: 'Loved the interface!'" },
    { date: "July 22", action: "Read: 'Hooked'" },
  ];

  const fetchFavourites = async () => {
  try {
    const res = await axios.get(`https://api-routes.onrender.com/api/users/favourites/${userId}`);
    setFavourites(res.data);
  } catch (error) {
    console.error('❌ Favourites fetch error:', error?.response?.data || error.message);
    toast.error("Failed to fetch favourites");
  }
};

const fetchMyShelf = async () => {
  try {
    const res = await axios.get(`https://api-routes.onrender.com/api/users/shelf/${userId}`);
    setShelf(res.data);
  } catch (error) {
    console.error('❌ Shelf fetch error:', error?.response?.data || error.message);
    toast.error("Failed to fetch shelf");
  }
};

const fetchDashboardData = async () => {
  try {
    const res = await axios.get(`https://api-routes.onrender.com/api/users/stats/${userId}`);
    console.log(res);
    const response = await axios.get(`https://api-routes.onrender.com/api/books/reading-stats?userId=${userId}`);

    setBooksData([
      { name: "Books in Shelf", value: res.data?.shelfCount || 0 },
      { name: "Favourites", value: res.data?.favouriteCount || 0 },
    ]);

    setBookReadData(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error('❌ Dashboard fetch error:', error?.response?.data || error.message);
    toast.error("Failed to load dashboard data");
  }
};

const fetchFeedbacks = async () => {
  try {
    const res = await axios.get(`https://api-routes.onrender.com/api/feedback`, {
      params: { userId },
    });
    setFeedbacks(res.data);
  } catch (error) {
    console.error('❌ Feedback fetch error:', error?.response?.data || error.message);
    toast.error("Failed to fetch feedbacks");
  }
};

  const handleRemoveFromShelf = async (bookId) => {
  try {
    await axios.delete(`https://api-routes.onrender.com/api/users/shelf/${userId}/${bookId}`);
    // Update local shelf state
    await fetchMyShelf();
    setShelf(prev => prev.filter(({ bookId }) => bookId._id !== bookId));
    toast.success("Book removed from shelf!");

  } catch (error) {
    console.error('Error removing from shelf:', error);
    toast.error("Failed to remove book.");
  }
};

  const handleRemoveFromFavourites = async (bookIdToRemove) => {
  try {
    await axios.delete(`https://api-routes.onrender.com/api/users/favourites/${userId}/${bookIdToRemove}`);
    
    // ✅ Instantly update frontend
    await fetchFavourites();
    setFavourites(prev => prev.filter(book => book._id !== bookIdToRemove));

    toast.success("Removed from favourites!");
  } catch (error) {
    console.error("Error removing from favourites:", error);
    toast.error("Failed to remove from favourites");
  }
};

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userToken');
  toast.success("Logout Successfully");
  navigate('/login');
};

useEffect(() => {
  if (userId) {
    fetchDashboardData();
    fetchFavourites();
    fetchMyShelf();
    fetchFeedbacks();
  }
}, [userId]);


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">📊 Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 shadow-lg w-full flex flex-col items-center">
                <span className='text-black text-extrabold'>Top 10 Books By reading Time(in minutes)</span>
                <PieChart width={400} height={300}>
                  
  <Pie
  
    data={BookReadData}
    cx="35%"
    cy="35%"
    outerRadius={70}
    dataKey="value"
    labelLine={true}
    label="top 10 books by readingTime(in minutes)"
  >
    
    {BookReadData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  
  <Legend
    layout="vertical"
    align="left"
    verticalAlign="bottom"
    iconSize={10}
    wrapperStyle={{
      paddingTop: 10,
      fontSize: 12,
      lineHeight: '16px',
      maxWidth: 180,
      textAlign: "center"
    }}
  />
</PieChart>

              </div>
               <div className="bg-white rounded-xl p-4 shadow-lg w-full  flex justify-center">
                <PieChart width={300} height={300}>
                  <Pie data={booksData} cx="50%" cy="50%" outerRadius={70} dataKey="value" >
                    {booksData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mt-6 md:mt-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4">📅 Last 5 Days Activity</h2>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm md:text-base">
                {recentActivity.map((item, idx) => (
                  <li key={idx}><strong>{item.date}</strong>: {item.action}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mt-6 md:mt-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4">📈 Reading Tracker</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={readingTracker}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pages" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        );

      case 'favourites':
        return (
          <motion.div key="favourites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex flex-wrap gap-4 justify-center">       {favourites.map(book => (
          <div
            key={book._id}
            className="relative px-4 py-2 rounded-lg bg-blue-900 w-[90%] sm:w-[300px] text-white hover:bg-cyan-600 transition-all shadow-md"
          >
            {/* 🗑️ Delete Icon */}
            <button
              onClick={() => handleRemoveFromFavourites(book._id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              title="Remove from favourites"
            >
              <FaTrashAlt size={16} />
            </button>

            <Link to={`/read/${book._id}`} className="block text-left">
              {book.title}
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
        );


       

      case 'myshelf':
        return (
              <motion.div key="myshelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h3 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-6 text-center">📚 MyShelf</h3>
      <div className="flex flex-wrap gap-6 justify-center">
        {shelf.map(({ bookId }) => (
          <div key={bookId._id} className="w-[90%] sm:w-[300px] bg-[#b3d5f4] border-t-[6px] border-[#0a1f44] rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform relative">
            {/* 🗑️ Delete Icon in top-right */}
            <button
              onClick={() => handleRemoveFromShelf(bookId._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Remove from MyShelf"
            >
              <FaTrashAlt size={18} />
            </button>

            <h4 className="text-lg font-semibold text-[#0a1f44] mb-1">{bookId.title}</h4>
            <p className="text-sm text-[#1f3b56] mb-4">{bookId.author}</p>
            <img src={bookId.coverImageURL} alt={bookId.title} className="w-full h-40 object-contain mb-4" />
            <Link
              to={`/read/${bookId._id}`}
              className="text-sm text-[#0a1f44] font-medium hover:underline"
            >
              ▶️ Read Book
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
        );

      case 'feedbacks':
        return (
          <motion.div key="feedbacks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-6 text-center">🗣️ Feedbacks</h3>
            <div className="space-y-4">
              {feedbacks.length > 0 ? feedbacks.map(fb => (
                <div key={fb._id} className="p-4 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl border shadow hover:shadow-blue-300 transition-all duration-300">
                  {/* <p className="font-semibold text-blue-900">{fb.fullName}</p> */}
                  <p className="text-[#1e3a5f]">{fb.message}</p>
                  <small className="text-gray-500">{new Date(fb.createdAt).toLocaleString()}</small>
                </div>
              )) : (
                <p className="text-blue-500 italic text-center">No feedbacks found.</p>
              )}
            </div>
          </motion.div>
        );

      case 'reading':
        return (
          <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-6 text-center">📅 5-Day Reading Tracker</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {readingTracker.map((entry, index) => (
                <div key={index} className="bg-white shadow-md rounded-xl p-4 border text-blue-800">
                  <h4 className="text-lg font-semibold mb-1">{entry.day}</h4>
                  <p>Pages read: <span className="font-bold">{entry.pages}</span></p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="flex flex-col md:flex-row h-full">
        <aside className="w-full md:w-72 bg-blue-950 text-white px-6 py-8 min-h-screen shadow-xl border-b md:border-r border-blue-800">
          <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-300">Antarix</h2>
          <p className="text-sm mb-6 text-cyan-100 italic">Welcome back, <span className="font-semibold text-cyan-200">{storedUser?.name}</span> 👋</p>
          <div className="flex flex-col gap-4">
            <button onClick={() => navigate('/')} className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">🏠 Home</button>
            <button onClick={() => setActiveTab('dashboard')} className={`${activeTab === 'dashboard' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 py-2 rounded-xl`}>📊 Dashboard</button>
            <button onClick={() => { setActiveTab('favourites'); fetchFavourites(); }} className={`${activeTab === 'favourites' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 py-2 rounded-xl `}>❤️ Favourites</button>
            <button onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }} className={`${activeTab === 'myshelf' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 py-2 rounded-xl`}>📘 MyShelf</button>
            <button onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }} className={`${activeTab === 'feedbacks' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 py-2 rounded-xl`}>📝 Feedbacks</button>
            <button onClick={() => navigate('/edit-profile')} className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-xl">⚙️ Edit Profile</button>
            <button onClick={handleLogout} className="bg-blue-800 hover:bg-red-600 px-4 py-2 rounded-xl mt-4">⏻ Logout</button>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
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
// import { toast } from 'react-toastify';
// import Navbar from '../components/sidebar';
// import { Link } from 'react-router-dom';
// import  Footer from '../components/footer'
// import { FaTrashAlt } from 'react-icons/fa'; // 👈 Add this at top if not already imported

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";



// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [booksData, setBooksData] = useState([]);
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
//       const res = await axios.get(`http://localhost:3000/api/users/favourites/${userId}`);
//       setFavourites(res.data);
//     } catch (error) {
//       console.error('Favourites error:', error);
//     }
//   };

//   const handleRemoveFromFavourites = async (bookIdToRemove) => {
//   try {
//     await axios.delete(`http://localhost:3000/api/users/favourites/${userId}/${bookIdToRemove}`);
    
//     // ✅ Instantly update frontend
//     await fetchFavourites();
//     setFavourites(prev => prev.filter(book => book._id !== bookIdToRemove));

//     toast.success("Removed from favourites!");
//   } catch (error) {
//     console.error("Error removing from favourites:", error);
//     toast.error("Failed to remove from favourites");
//   }
// };


//   const fetchMyShelf = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/users/shelf/${userId}`);
//       setShelf(res.data);
//     } catch (error) {
//       console.error('Shelf error:', error);
//     }
//   };

//   const handleRemoveFromShelf = async (bookId) => {
//   try {
//     await axios.delete(`http://localhost:3000/api/users/shelf/${userId}/${bookId}`);
//     // Update local shelf state
//     await fetchMyShelf();
//     setShelf(prev => prev.filter(({ bookId }) => bookId._id !== bookId));
//     toast.success("Book removed from shelf!");

//   } catch (error) {
//     console.error('Error removing from shelf:', error);
//     toast.error("Failed to remove book.");
//   }
// };

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await axios.get(`https://api-routes.onrender.com/api/feedback`, { params: { userId } });
//       setFeedbacks(res.data);
//     } catch (error) {
//       console.error('Feedback fetch error:', error);
//     }
//   };


//   const fetchDashboardData = async () => {
//   try {
//     const res = await axios.get(`http://localhost:3000/api/users/stats/${userId}`);
//     // const response = await axios.get(`http://localhost:3000/api/books/reading-stats?userId=${userId}`);

//     setBooksData([
//       { name: "Books in Shelf", value: res.data?.shelfCount || 0 },
//       { name: "Favourites", value: res.data?.favouriteCount || 0 },
//     ]);
//   } catch (error) {
//     console.error('❌ Dashboard fetch error:', error?.response?.data || error.message);
//     toast.error("Failed to load dashboard data");
//   }
// };

// useEffect(() => {
//   if (userId) {
//     fetchDashboardData();
//     fetchFavourites();
//     fetchMyShelf();
//     fetchFeedbacks();
//   }
// }, [userId]);

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
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">📊 Dashboard Overview</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white rounded-xl p-4 shadow-lg w-full flex justify-center">
//                 <PieChart width={250} height={250}>
//                   <Pie data={booksData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name }) => name}>
//                     {booksData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>
//               <div className="bg-white rounded-xl p-4 shadow-lg w-full flex justify-center">
//                 <PieChart width={250} height={250}>
//                   <Pie data={interestData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name }) => name}>
//                     {interestData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>
//             </div>

//             <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mt-6 md:mt-8">
//               <h2 className="text-lg md:text-xl font-semibold mb-4">📅 Last 5 Days Activity</h2>
//               <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm md:text-base">
//                 {recentActivity.map((item, idx) => (
//                   <li key={idx}><strong>{item.date}</strong>: {item.action}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mt-6 md:mt-8">
//               <h2 className="text-lg md:text-xl font-semibold mb-4">📈 Reading Tracker</h2>
//               <div className="w-full h-[300px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={readingTracker}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="day" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="pages" fill="#4F46E5" radius={[6, 6, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </motion.div>
//         );

//      case 'favourites':
//   return (
//     <motion.div key="favourites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <h3 className="text-2xl md:text-3xl font-bold mb-6 text-blue-950 text-center">📘 Favourite Books</h3>
//       <div className="flex flex-wrap gap-4 justify-center">
//         {favourites.map(book => (
//           <div
//             key={book._id}
//             className="relative px-4 py-2 rounded-lg bg-blue-900 w-[90%] sm:w-[300px] text-white hover:bg-cyan-600 transition-all shadow-md"
//           >
//             {/* 🗑️ Delete Icon */}
//             <button
//               onClick={() => handleRemoveFromFavourites(book._id)}
//               className="absolute top-2 right-2 text-red-400 hover:text-red-600"
//               title="Remove from favourites"
//             >
//               <FaTrashAlt size={16} />
//             </button>

//             <Link to={`/read/${book._id}`} className="block text-left">
//               {book.title}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );


//      case 'myshelf':
//   return (
    // <motion.div key="myshelf" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    //   <h3 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-6 text-center">📚 MyShelf</h3>
    //   <div className="flex flex-wrap gap-6 justify-center">
    //     {shelf.map(({ bookId }) => (
    //       <div key={bookId._id} className="w-[90%] sm:w-[300px] bg-[#b3d5f4] border-t-[6px] border-[#0a1f44] rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform relative">
    //         {/* 🗑️ Delete Icon in top-right */}
    //         <button
    //           onClick={() => handleRemoveFromShelf(bookId._id)}
    //           className="absolute top-2 right-2 text-red-600 hover:text-red-800"
    //           title="Remove from MyShelf"
    //         >
    //           <FaTrashAlt size={18} />
    //         </button>

    //         <h4 className="text-lg font-semibold text-[#0a1f44] mb-1">{bookId.title}</h4>
    //         <p className="text-sm text-[#1f3b56] mb-4">{bookId.author}</p>
    //         <img src={bookId.coverImageURL} alt={bookId.title} className="w-full h-40 object-contain mb-4" />
    //         <Link
    //           to={`/read/${bookId._id}`}
    //           className="text-sm text-[#0a1f44] font-medium hover:underline"
    //         >
    //           ▶️ Read Book
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </motion.div>
//   );


//       case 'feedbacks':
//         return (
//           <motion.div key="feedbacks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <h3 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-6 text-center">🗣️ Feedbacks</h3>
//             <div className="space-y-4">
//               {feedbacks.length > 0 ? feedbacks.map(fb => (
//                 <div key={fb._id} className="p-4 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl border shadow hover:shadow-blue-300 transition-all duration-300">
//                   {/* <p className="font-semibold text-blue-900">{fb.fullName}</p> */}
//                   <p className="text-[#1e3a5f]">{fb.message}</p>
//                   <small className="text-gray-500">{new Date(fb.createdAt).toLocaleString()}</small>
//                 </div>
//               )) : (
//                 <p className="text-blue-500 italic text-center">No feedbacks found.</p>
//               )}
//             </div>
//           </motion.div>
//         );

//       case 'reading':
//         return (
//           <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-6 text-center">📅 5-Day Reading Tracker</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {readingTracker.map((entry, index) => (
//                 <div key={index} className="bg-white shadow-md rounded-xl p-4 border text-blue-800">
//                   <h4 className="text-lg font-semibold mb-1">{entry.day}</h4>
//                   <p>Pages read: <span className="font-bold">{entry.pages}</span></p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
//       <div className="flex flex-col md:flex-row h-full">
//         <aside className="w-full md:w-72 bg-blue-950 text-white px-6 py-8 shadow-xl border-b md:border-r border-blue-800 min-h-screen">
//           <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-300">Antarix</h2>
//           <p className="text-sm mb-6 text-cyan-100 italic">Welcome back, <span className="font-semibold text-cyan-200">{storedUser?.name}</span> 👋</p>
//           <div className="flex flex-col gap-4">
//             <button onClick={() => navigate('/')} className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">🏠 Home</button>
//             <button onClick={() => setActiveTab('dashboard')} className={`${activeTab === 'dashboard' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 py-2 rounded-xl`}>📊 Dashboard</button>
//             <button onClick={() => { setActiveTab('favourites'); fetchFavourites(); }} className={`${activeTab === 'favourites' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 h-[100%] py-2 rounded-xl`}>❤️ Favourites</button>
//             <button onClick={() => { setActiveTab('myshelf'); fetchMyShelf(); }} className={`${activeTab === 'myshelf' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700 '} px-4 py-2 rounded-xl`}>📘 MyShelf</button>
//             <button onClick={() => { setActiveTab('feedbacks'); fetchFeedbacks(); }} className={`${activeTab === 'feedbacks' ? 'font-bold shadow-md shadow-cyan-300' : 'bg-blue-800 hover:bg-blue-700'} px-4 py-2 rounded-xl`}>📝 Feedbacks</button>
//             <button onClick={() => navigate('/edit-profile')} className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-xl">⚙️ Edit Profile</button>
//             <button onClick={handleLogout} className="bg-blue-800 hover:bg-red-600 px-4 py-2 rounded-xl mt-4">⏻ Logout</button>
//           </div>
//         </aside>

//         <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
//           <AnimatePresence mode="wait">
//             {renderContent()}
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




