import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api-routes.onrender.com/api/books/search?query=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    if (query) fetchResults();
  }, [query]);

 const handleAddToShelf = async (bookId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  if (!userId) {
    alert('User not logged in.');
    return;
  }

  try {
    await axios.post('http://localhost:3000/api/users/shelf/add', {
      userId,
      bookId,
    });
    alert('✅ Book added to MyShelf');
  } catch (err) {
    console.error(err);
    alert('❌ Failed to add to MyShelf');
  }
};


  const handleAddToFavourites = async (bookId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  if (!userId) {
    alert('User not logged in.');
    return;
  }

  try {
    await axios.post('http://localhost:3000/api/users/favourites/add', {
      userId,
      bookId,
    });
    alert('✅ Book added to Favourites');
  } catch (err) {
    console.error(err);
    alert('❌ Failed to add to Favourites');
  }
};


  return (
    <div className="bg-[#e9efff] p-8 min-h-screen bg-[#f8f9fb] text-gray-800">
     <div className="text-center mb-10">
  <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
    Best Match for <span className="text-blue-600">"{query}"</span>
  </h2>
  <p className="text-gray-500 mt-2 text-lg">
    Browse the top books based on your search
  </p>
</div>

      {loading ? (
        <p className="text-lg">🔄 Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-lg text-gray-600">No books found.</p>
      ) : (
        <div className="flex gap-x-9 gap-y-12 flex-wrap justify-around">
          {results.map((book) => (
            <div
              key={book._id}
              className="bg-[#f5f8ff] w-[340px] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,1)] overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              {/* 📕 Cover Image */}
              <img
                src={book.coverImageURL}
                alt={book.title}
                className="w-full h-[300px] object-contain"
              />

              {/* 📘 Book Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-700 mb-4">{book.author}</p>

                {/* 🔘 Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                 
                  <button
                    onClick={() => handleAddToFavourites(book._id)}
                    className="bg-[#9B177E] font-bold hover:bg-pink-700 text-white py-2 rounded-md text-sm"
                  >
                    ❤️ Favorite
                  </button>
                   <button
  onClick={() => navigate(`/read/${book._id}`)}
  className="bg-[#090040] hover:bg-blue-700 font-bold text-white py-2 rounded-md text-sm text-center"
>
  📖 Read Now
</button>
                  <button
                    onClick={() => handleAddToShelf(book._id)}
                    className="bg-[#FFCC00] hover:bg-yellow-600 font-bold text-black py-2 rounded-md text-sm col-span-2"
                  >
                    📚 Add to Shelf
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

