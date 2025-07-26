import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopRatedBooks = () => {
  const [books, setBooks] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch top-rated books
    const fetchTopBooks = async () => {
      try {
        const res = await axios.get("https://api-routes.onrender.com/api/books/top-rated");
        setBooks(res.data);
      } catch (err) {
        console.error("❌ Error fetching top-rated books:", err);
      }
    };
    fetchTopBooks();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollStep = 1; // Speed of scrolling
    const interval = setInterval(() => {
      if (container.scrollWidth - container.clientWidth === scrollAmount) {
        scrollAmount = 0; // Reset scroll when reaching end
      } else {
        scrollAmount += scrollStep;
      }
      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 30); // Speed of frame updates

    return () => clearInterval(interval);
  }, [books]);

  // Handle click event
  const handleBookClick = (bookId) => {
    navigate(`/read/${bookId}`); // Navigates to book detail/reader page
  };

  return (
    <div className="mt-16 px-6">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">⭐ Top Rated Books</h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden no-scrollbar mt-16 pb-4"
      >
        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => handleBookClick(book._id)}
            className="min-w-[180px] bg-white shadow-lg rounded-xl hover:scale-105 transition transform cursor-pointer"
          >
            <img
              src={book.coverImageURL}
              alt={book.title}
              className="w-full h-44 object-contain rounded-t-xl"
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold truncate">{book.title}</h3>
              <p className="text-yellow-500 text-sm font-bold mt-1">
                ⭐ {book.averageRating?.toFixed(1) || "No rating"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedBooks;


