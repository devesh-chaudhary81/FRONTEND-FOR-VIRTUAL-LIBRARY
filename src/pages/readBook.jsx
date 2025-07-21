
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// const ReadBook = () => {
//   const [book, setBook] = useState(null);
// const { id } = useParams();

// useEffect(() => {
//   const fetchBook = async () => {
//     try {
//       const res = await axios.get(`https://api-routes.onrender.com/api/books/${id}`);
//       setBook(res.data);
//     } catch (error) {
//       console.error('Failed to fetch book:', error);
//     }
//   };

//   fetchBook();
// }, [id]);

//   if (!book) return <p className="text-center mt-10">🔄 Loading book...</p>;

//   return (
//     <div className="p-4 bg-black min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-white text-center">{book.title}</h2>
//       <div className="flex justify-center">
//         <iframe
//   src={`https://docs.google.com/gview?url=${book.contentURL}&embedded=true`}
//   title={book.title}
//   width="90%"
//   height="800px"
//   className="border rounded shadow-lg"
// />
//       </div>
//     </div>
//   );
// };

// export default ReadBook;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Document, Page, pdfjs } from 'react-pdf';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'; // ✅ This line

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker; // ✅ This line


// const ReadBook = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [summary, setSummary] = useState('');
//   const [loadingSummary, setLoadingSummary] = useState(false);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axios.get(`https://api-routes.onrender.com/api/books/${id}`);
//         setBook(res.data);
//       } catch (error) {
//         console.error('Failed to fetch book:', error);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   const handleTextExtract = async (items) => {
//     const text = items.map((item) => item.str).join(' ');
//     if (text.length < 50) return; // avoid summarizing empty/short pages

//     try {
//       setLoadingSummary(true);
//       const res = await axios.post('https://your-backend.com/api/summary', {
//         text,
//       });
//       setSummary(res.data.summary);
//     } catch (err) {
//       console.error('Summary failed:', err);
//     } finally {
//       setLoadingSummary(false);
//     }
//   };

//   if (!book) return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;

//   return (
//     <div className="flex bg-black min-h-screen p-4 gap-4">
//       {/* PDF Viewer */}
//       <div className="w-2/3 bg-white rounded shadow-lg p-2">
//         <h2 className="text-xl font-bold text-center mb-2">{book.title}</h2>
//         <Document
//           file={book.contentURL}
//           onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//           loading="Loading PDF..."
//         >
//           <Page
//             pageNumber={pageNumber}
//             onGetTextSuccess={handleTextExtract}
//           />
//         </Document>
//         <div className="flex justify-between mt-4">
//           <button
//             className="px-3 py-1 bg-gray-300 rounded"
//             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
//           >
//             ⬅ Prev
//           </button>
//           <span className="text-white">
//             Page {pageNumber} of {numPages}
//           </span>
//           <button
//             className="px-3 py-1 bg-gray-300 rounded"
//             onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
//           >
//             Next ➡
//           </button>
//         </div>
//       </div>

//       {/* Summary Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white rounded p-4 shadow-inner">
//         <h3 className="text-lg font-bold mb-2">📄 Page Summary</h3>
//         {loadingSummary ? (
//           <p>🔄 Generating summary...</p>
//         ) : (
//           <p className="text-sm whitespace-pre-wrap">{summary || "No summary yet."}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReadBook;


// import React, { useState } from "react";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// // ✅ Replace this with your actual Cloudinary URL
// const pdfURL = "https://res.cloudinary.com/dasbxk3b7/raw/upload/v1752395355/All_books/j1pofrpdt2ircuofms9l.pdf";

// const ReadBook = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(null);

//   // Plugin to track page changes
//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     onPageChange: (e) => {
//       setCurrentPage(e.currentPage + 1);
//     },
//   });

//   return (
//     <div className="flex flex-col items-center bg-black text-white min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-4">📖 Reading PDF Book</h1>
//       <div className="w-full max-w-5xl bg-white shadow-lg rounded">
//         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//           <Viewer
//             fileUrl={pdfURL}
//             plugins={[defaultLayoutPluginInstance]}
//             onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
//           />
//         </Worker>
//       </div>
//       <div className="mt-4">
//         <p>
//           📄 Page {currentPage} of {totalPages || "Loading..."}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ReadBook;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import axios from "axios";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const ReadBook = () => {
//   const { id } = useParams(); // <-- Get book ID from URL
//   const [bookURL, setBookURL] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(null);

//   // Plugin for layout and tracking page changes
//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     onPageChange: (e) => {
//       setCurrentPage(e.currentPage + 1);
//     },
//   });

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axios.get(`https://api-routes.onrender.com/api/books/${id}`);
//         setBookURL(res.data.contentURL); // Get contentURL from response
//       } catch (err) {
//         console.error("Failed to fetch book:", err);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   if (!bookURL) return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;

//   return (
//     <div className="flex flex-col items-center bg-black text-white min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-4">📖 Reading PDF Book</h1>
//       <div className="w-full max-w-5xl bg-white shadow-lg rounded">
//         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//           <Viewer
//             fileUrl={bookURL}
//             plugins={[defaultLayoutPluginInstance]}
//             onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
//           />
//         </Worker>
//       </div>
//       <div className="mt-4">
//         <p>📄 Page {currentPage} of {totalPages || "Loading..."}</p>
//       </div>
//     </div>
//   );
// };

// export default ReadBook;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ReadBook = () => {
  const { id } = useParams();
  const [bookURL, setBookURL] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [summary, setSummary] = useState("");
  const [inputPage, setInputPage] = useState("");

  // PDF layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    onPageChange: (e) => {
      setCurrentPage(e.currentPage + 1);
    },
  });

  // Fetch book by ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://api-routes.onrender.com/api/books/${id}`);
        const cloudinaryURL = res.data.contentURL;
        setBookURL(cloudinaryURL);

        // Optional: notify backend on book open
        await axios.post("http://localhost:3000/api/books/open", {
          url: cloudinaryURL,
          bookId: id,
        });
      } catch (err) {
        console.error("Failed to fetch or open book:", err);
      }
    };
    fetchBook();
  }, [id]);

  // Handle summary request manually
  const handleGenerateSummary = async () => {
    if (!inputPage || isNaN(inputPage) || inputPage < 1 || inputPage > totalPages) {
      alert("Please enter a valid page number.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/books/summary-by-page", {
        pdfUrl: bookURL,
        pageNumber: Number(inputPage),
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
    }
  };

  if (!bookURL) return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;

  return (
    <div className="flex flex-col bg-black text-white min-h-screen p-6">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">📖 Reading PDF Book</h1> */}

      <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
        {/* PDF Viewer Section */}
       <div className="w-full lg:w-3/4 bg-white shadow-lg rounded relative overflow-hidden border border-gray-200">
  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
    <Viewer
      fileUrl={bookURL}
      plugins={[defaultLayoutPluginInstance]}
      onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
    />
  </Worker>

  {/* Floating page counter at bottom right */}
  <div className="absolute bottom-2 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full shadow">
    📄 Page {currentPage} of {totalPages || "Loading..."}
  </div>
</div>


        {/* Summary Section */}
        <div className="w-full lg:w-1/4 bg-white text-black p-4 rounded shadow-md max-h-[80vh] overflow-y-auto sticky top-6">

          <h2 className="text-lg font-semibold mb-2">🧠 Generate Summary</h2>

          <div className="flex items-center mb-4 gap-2">
            <input
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="border border-gray-300 p-2 rounded w-24"
              placeholder="Page #"
              min={1}
              max={totalPages}
            />
            <button
              onClick={handleGenerateSummary}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Generate
            </button>
          </div>

          {summary && (
  <div className="mt-6 w-full max-w-5xl bg-white text-black p-4 rounded shadow-md">
    <h2 className="text-lg font-semibold mb-2">🧠 Summary of Page {currentPage}</h2>
    <div className="prose max-w-none">
      <ReactMarkdown>{summary}</ReactMarkdown>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default ReadBook;

