import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {toast} from 'react-toastify';

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ReadBook = () => {
  const { id } = useParams();
  const [bookURL, setBookURL] = useState(null);
  const [summary, setSummary] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPageFn, setJumpToPageFn] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");

  const [isGenerating, setIsGenerating] = useState(false); // Loader State

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    onPageChange: (e) => {
      const newPage = e.currentPage + 1;
      setCurrentPage(newPage);
      localStorage.setItem(`lastPage-${id}`, newPage);
    },
    setJumpToPage: (fn) => setJumpToPageFn(() => fn),
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://api-routes.onrender.com/api/books/${id}`
        );
        const cloudinaryURL = res.data.contentURL;
        setBookURL(cloudinaryURL);

        await axios.post("http://localhost:3000/api/books/open", {
          url: cloudinaryURL,
          bookId: id,
        });
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (!bookURL || !jumpToPageFn) return;

    const savedPage = localStorage.getItem(`lastPage-${id}`);
    if (savedPage) {
      jumpToPageFn(Number(savedPage) - 1);
      setCurrentPage(Number(savedPage));
    }
  }, [bookURL, jumpToPageFn, id]);

  const handleGenerateSummary = async () => {
    const start = Number(startPage);
    const end = Number(endPage);

    if (
      isNaN(start) || isNaN(end) ||
      start < 1 || end < 1 ||
      start > totalPages || end > totalPages ||
      end < start || end - start > 20
    ) {
      toast.warn("Please enter a valid page range (Max: 20 pages).");
      return;
    }

    setIsGenerating(true); // Start loader

    try {
      const res = await axios.post("http://localhost:3000/api/books/summary-by-range", {
        pdfUrl: bookURL,
        startPage: start,
        endPage: end,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
    } finally {
      setIsGenerating(false); // Stop loader
    }
  };

  if (!bookURL) return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-2/3 h-full border-r border-gray-200 overflow-hidden">
        {bookURL ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <div className="h-full overflow-hidden">
              <Viewer
                fileUrl={bookURL}
                plugins={[defaultLayoutPluginInstance]}
                onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
              />
            </div>
          </Worker>
        ) : (
          <div className="text-center mt-10">Loading book...</div>
        )}
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-1/4 bg-black text-white p-4 rounded shadow-md max-h-[80vh] overflow-y-auto sticky top-6">
        <h2 className="text-lg font-semibold mb-2">🧠 Prepare your notes...</h2>

        <div className="flex flex-col gap-2 mb-4">
          <input
            type="number"
            value={startPage}
            onChange={(e) => setStartPage(e.target.value)}
            className="border border-gray-300 p-2 text-black rounded w-full"
            placeholder="Start Page"
            min={1}
            max={totalPages}
          />
          <input
            type="number"
            value={endPage}
            onChange={(e) => setEndPage(e.target.value)}
            className="border border-gray-300 p-2 text-black rounded w-full"
            placeholder="End Page"
            min={1}
            max={totalPages}
          />
          <button
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition ${
              isGenerating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Generating...
              </>
            ) : (
              "Generate Notes"
            )}
          </button>
        </div>

        {summary && (
          <div className="mt-6 w-full bg-white text-black p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              🧠 Here are Your Notes (Pages {startPage}–{endPage})
            </h2>
            <div className="prose max-w-none">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadBook;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const ReadBook = () => {
//   const { id } = useParams();
//   const [bookURL, setBookURL] = useState(null);
//   const [summary, setSummary] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jumpToPageFn, setJumpToPageFn] = useState(null);
//    const [inputPage, setInputPage] = useState("");
//     const [totalPages, setTotalPages] = useState(null);

//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     onPageChange: (e) => {
//       const newPage = e.currentPage + 1;
//       setCurrentPage(newPage);
//       localStorage.setItem(`lastPage-${id}`, newPage); // 🧠 Save page
//     },
//     setJumpToPage: (fn) => setJumpToPageFn(() => fn),
//   });

//   // 1️⃣ Fetch book and content URL
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axios.get(
//           `https://api-routes.onrender.com/api/books/${id}`
//         );
//         const cloudinaryURL = res.data.contentURL;
//         setBookURL(cloudinaryURL);

//         await axios.post("http://localhost:3000/api/books/open", {
//           url: cloudinaryURL,
//           bookId: id,
//         });
//       } catch (err) {
//         console.error("Error fetching book:", err);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   // 2️⃣ Resume last page once Viewer is ready
//   useEffect(() => {
//     if (!bookURL || !jumpToPageFn) return;

//     const savedPage = localStorage.getItem(`lastPage-${id}`);
//     if (savedPage) {
//       console.log("jump successfull");
//       jumpToPageFn(Number(savedPage) - 1); // PDF pages are 0-indexed
//       setCurrentPage(Number(savedPage));
//     }
//   }, [bookURL, jumpToPageFn, id]);

//   // 3️⃣ Get summary on button click
//  const handleGenerateSummary = async () => {
//     if (!inputPage || isNaN(inputPage) || inputPage < 1 || inputPage > totalPages) {
//       alert("Please enter a valid page number.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3000/api/books/summary-by-page", {
//         pdfUrl: bookURL,
//         pageNumber: Number(inputPage),
//       });
//       setSummary(res.data.summary);
//     } catch (err) {
//       console.error("Error generating summary:", err);
//     }
//   };

//   if (!bookURL) return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;

//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <div className="w-full md:w-2/3 h-full border-r border-gray-200 overflow-hidden">
//         {bookURL ? (
//           <Worker
//             workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//           >
//             <div className="h-full overflow-hidden">
//               <Viewer
//                 fileUrl={bookURL}
//                 plugins={[defaultLayoutPluginInstance]}
//                  onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
//               />
//             </div>
//           </Worker>
//         ) : (
//           <div className="text-center mt-10">Loading book...</div>
//         )}
//       </div>

//      <div className="w-full lg:w-1/4 bg-white text-black p-4 rounded shadow-md max-h-[80vh] overflow-y-auto sticky top-6">

//           <h2 className="text-lg font-semibold mb-2">🧠 Generate Summary</h2>

//           <div className="flex items-center mb-4 gap-2">
//             <input
//               type="number"
//               value={inputPage}
//               onChange={(e) => setInputPage(e.target.value)}
//               className="border border-gray-300 p-2 rounded w-24"
//               placeholder="Page #"
//               min={1}
//               max={totalPages}
//             />
//             <button
//               onClick={handleGenerateSummary}
//               className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
//             >
//               Generate
//             </button>
//           </div>

//           {summary && (
//   <div className="mt-6 w-full max-w-5xl bg-white text-black p-4 rounded shadow-md">
//     <h2 className="text-lg font-semibold mb-2">🧠 Summary of Page {inputPage}</h2>
//     <div className="prose max-w-none">
//       <ReactMarkdown>{summary}</ReactMarkdown>
//     </div>
//   </div>
// )}
//         </div>
//       </div>
    
//   );
// };

// export default ReadBook;

