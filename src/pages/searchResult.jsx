// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {toast} from 'react-toastify'
// const SearchResults = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("q");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchResults = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://api-routes.onrender.com/api/books/search?query=${query}`
//         );
//         setResults(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     };

//     if (query) fetchResults();
//   }, [query]);

//   const handleAddToShelf = async (bookId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id;

//     if (!userId) {
//       toast.error("User not logged in.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/api/users/shelf/add", {
//         userId,
//         bookId,
//       });
//       toast.success("✅ Book added to MyShelf");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to add to MyShelf");
//     }
//   };

//   const handleAddToFavourites = async (bookId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id;

//     if (!userId) {
//       alert("User not logged in.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/api/users/favourites/add", {
//         userId,
//         bookId,
//       });
//       toast.success("✅ Book added to Favourites");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to add to Favourites");
//     }
//   };

//   return (
//     <div className="bg-[#003285] p-8 min-h-screen bg-[#f8f9fb] text-gray-800">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl font-extrabold text-[#FFCC00] tracking-tight">
//           Best Match for <span className="text-white">"{query}"</span>
//         </h2>
//         <p className="text-white mt-2 text-lg">
//           Browse the top books based on your search
//         </p>
//       </div>

//       {loading ? (
//         <p className="text-lg">🔄 Loading...</p>
//       ) : results.length === 0 ? (
//         <p className="text-lg text-gray-600">No books found.</p>
//       ) : (
//         <div className="flex gap-x-9 gap-y-12 flex-wrap justify-around">
//           {results.map((book) => (
//             <div
//               key={book._id}
//               className="bg-[#C0C9EE] w-[340px] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,1)] overflow-hidden transition-transform hover:scale-105 duration-300"
//             >
//               {/* 📕 Cover Image */}
//               <img
//                 src={book.coverImageURL}
//                 alt={book.title}
//                 className="w-full h-[300px] object-contain"
//               />

//               {/* 📘 Book Info */}
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                   {book.title}
//                 </h3>
//                 <p className="text-sm text-gray-700 mb-4">{book.author}</p>

//                 {/* 🔘 Action Buttons */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => handleAddToFavourites(book._id)}
//                     className="bg-[#9B177E] border border-black font-bold hover:bg-pink-700 text-white py-2 rounded-md text-sm"
//                   >
//                     ❤️ Favorite
//                   </button>
//                   <button
//                     onClick={() => navigate(`/read/${book._id}`)}
//                     className="bg-[#090040] hover:bg-blue-700 border border-black font-bold text-white py-2 rounded-md text-sm text-center"
//                   >
//                     📖 Read Now
//                   </button>
//                   <button
//                     onClick={() => handleAddToShelf(book._id)}
//                     className="bg-[#FFCC00] hover:bg-yellow-600 font-bold border border-black text-black py-2 rounded-md text-sm col-span-2"
//                   >
//                     📚 Add to Shelf
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;



// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { BookOpen, Star, Heart, Plus } from "lucide-react";


// const SearchResults = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("q");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchResults = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://api-routes.onrender.com/api/books/search?query=${query}`
//         );
//         setResults(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     };

//     if (query) fetchResults();
//   }, [query]);

//   const handleAddToShelf = async (bookId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id;
//     if (!userId) return toast.error("User not logged in.");

//     try {
//       await axios.post("http://localhost:3000/api/users/shelf/add", {
//         userId,
//         bookId,
//       });
//       toast.success("✅ Book added to MyShelf");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to add to MyShelf");
//     }
//   };

//   const handleAddToFavourites = async (bookId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id;
//     if (!userId) return toast.error("User not logged in.");

//     try {
//       await axios.post("http://localhost:3000/api/users/favourites/add", {
//         userId,
//         bookId,
//       });
//       toast.success("✅ Book added to Favourites");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to add to Favourites");
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#001F54] via-[#003C8F] to-[#0059B2] min-h-screen py-10 px-4 text-white">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
//           Best Match for <span className="text-white">"{query}"</span>
//         </h2>
//         <p className="mt-2 text-lg text-blue-100">
//           Discover books that match your interests.
//         </p>
//       </div>

//       {loading ? (
//         <p className="text-lg text-center text-white animate-pulse">🔄 Loading...</p>
//       ) : results.length === 0 ? (
//         <p className="text-lg text-center text-gray-200">No books found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-4 md:px-10">
//           {results.map((book) => (
//            <div
//   key={book._id}
//   className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white shadow-xl hover:shadow-blue-700 transform hover:scale-[1.03] transition-all duration-300"
// >
//   <img
//     src={book.coverImageURL}
//     alt={book.title}
//     className="w-full h-64 object-contain bg-blue-100 rounded-t-2xl"
//   />
//   <div className="p-5 space-y-3">
//     <h3 className="text-xl font-bold text-white">{book.title}</h3>
//     <p className="text-sm text-blue-100">by {book.author}</p>

//     <div className="grid grid-cols-2 gap-3">
//       <button
//         onClick={() => handleAddToFavourites(book._id)}
//         className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md text-sm border border-pink-900"
//       >
//         <Heart size={16} /> Favourite
//       </button>
//       <button
//         onClick={() => navigate(`/read/${book._id}`)}
//         className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md text-sm border border-blue-900"
//       >
//         <BookOpen size={16} /> Read
//       </button>
//       <button
//         onClick={() => handleAddToShelf(book._id)}
//         className="col-span-2 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md text-sm border border-yellow-700"
//       >
//         <Plus size={16} /> Add to MyShelf
//       </button>
//     </div>
//   </div>
// </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BookOpen, Star, Heart, Plus } from "lucide-react";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api-routes.onrender.com/api/books/search?query=${query}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    if (query) fetchResults();
  }, [query]);

  const handleAddToShelf = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    if (!userId) return toast.error("User not logged in.");

    try {
      await axios.post("http://localhost:3000/api/users/shelf/add", {
        userId,
        bookId,
      });
      toast.success("✅ Book added to MyShelf");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add to MyShelf");
    }
  };

  const handleAddToFavourites = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    if (!userId) return toast.error("User not logged in.");

    try {
      await axios.post("http://localhost:3000/api/users/favourites/add", {
        userId,
        bookId,
      });
      toast.success("✅ Book added to Favourites");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add to Favourites");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0a1f] via-[#0a3473] to-[#0a0d6a] min-h-screen py-10 px-4 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
          Best Match for <span className="text-white">"{query}"</span>
        </h2>
        <p className="mt-2 text-lg text-blue-100">
          Discover books that match your interests.
        </p>
      </div>

      {loading ? (
        <p className="text-lg text-center text-white animate-pulse">
          🔄 Loading...
        </p>
      ) : results.length === 0 ? (
        <p className="text-lg text-center text-gray-200">No books found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 px-4 md:px-10">
          {results.map((book) => (
            <div
              key={book._id}
              className="w-[300px] bg-blue-50 text-black rounded-2xl shadow-lg hover:shadow-blue-600 transform hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src={book.coverImageURL}
                alt={book.title}
                className="w-full h-40 object-contain bg-blue-100 rounded-t-2xl"
              />
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate(`/read/${book._id}`)}
                    className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md text-sm border border-blue-900"
                  >
                    <BookOpen size={16} /> Read
                  </button>
                  <button
                    onClick={() => handleAddToFavourites(book._id)}
                    className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md text-sm border border-pink-900"
                  >
                    <Heart size={16} /> Favourite
                  </button>
                  
                  <button
                    onClick={() => handleAddToShelf(book._id)}
                    className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md text-sm border border-yellow-700"
                  >
                    <Plus size={16} /> Add to MyShelf
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
