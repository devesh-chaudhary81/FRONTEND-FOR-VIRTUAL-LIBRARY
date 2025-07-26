
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BookOpen, Star, Heart, Plus } from "lucide-react";
import GenerateSummary from "../components/summary";
import Navbar from "../components/sidebar";
import StarRatings from 'react-star-ratings';


const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState({});

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

  const handleRating = async (bookId, newRating) => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.post(`https://api-routes.onrender.com/api/books/${bookId}/rate`, {
        bookId,
        userId,
        rating: newRating,
      });

      // Update the ratings state
      setRatings((prev) => ({
        ...prev,
        [bookId]: newRating,
      }));
         setResults((prevResults) =>
            prevResults.map((book) =>
                book._id === bookId
                    ? { ...book, averageRating: res.data.averageRating }
                    : book
            )
        );
    } catch (err) {
      console.error("❌ Error saving rating:", err);
    }
  };


  const handleAddToShelf = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    if (!userId) return toast.error("User not logged in.");

    try {
      await axios.post("https://api-routes.onrender.com/api/users/shelf/add", {
        userId,
        bookId,
      });
      toast.success("Book added to MyShelf");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to MyShelf");
    }
  };

  const handleAddToFavourites = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    if (!userId) return toast.error("User not logged in.");

    try {
      await axios.post("https://api-routes.onrender.com/api/users/favourites/add", {
        userId,
        bookId,
      });
      toast.success("Book added to Favourites");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to Favourites");
    }
  };


  return (
    <div className="bg-gradient-to-br from-[#0a0a1f] via-[#0a3473] to-[#0a0d6a] min-h-screen py-10 px-4 text-white">
      <div><Navbar/></div>
      <div className="text-center mb-12 mt-8">
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
            <div className="flex justify-center py-2">
            <StarRatings
              rating={ratings[book._id] || book.averageRating || 0}
              starRatedColor="gold"
              changeRating={(newRating) => handleRating(book._id, newRating)}
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="3px"
            />
          </div>
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
   <p className="flex items-center justify-center gap-2 text-lg font-semibold text-yellow-500 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
  <span className="text-xl">⭐</span>
  {book.averageRating ? (
    <span className="text-gray-800">
      {book.averageRating.toFixed(1)} <span className="text-sm text-gray-500">/ 5</span>
    </span>
  ) : (
    <span className="text-gray-500 text-sm">No ratings yet</span>
  )}
</p>


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
