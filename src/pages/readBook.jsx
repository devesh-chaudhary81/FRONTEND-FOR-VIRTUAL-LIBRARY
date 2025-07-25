import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {toast} from 'react-toastify';
import Footer from '../components/footer'
import Navbar from '../components/sidebar'
import { useRef } from 'react';

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";


const ReadBook = () => {
  const openTime = useRef(Date.now());
  const { id } = useParams();
  const [bookURL, setBookURL] = useState(null);
  const [summary, setSummary] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPageFn, setJumpToPageFn] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const [isGenerating, setIsGenerating] = useState(false); // Loader State

//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//   onPageChange: (e) => {
//     const newPage = e.currentPage + 1;
//     setCurrentPage(newPage);
//     localStorage.setItem(`lastPage-${id}`, newPage);
//   },
//   setJumpToPage: (fn) => setJumpToPageFn(() => fn),
//   onDocumentLoad: (e) => {
//     setTotalPages(e.doc.numPages);
//   },
// });


   // record when book is opened
 
// useEffect(() => {
//   const start = Date.now();
//   const interval = setInterval(() => {
//     timeSpentRef.current += 1; // Count seconds
//   }, 1000);

//   return () => {
//     clearInterval(interval);
//     const totalMinutes = Math.floor(timeSpentRef.current / 60);
//     if (userId && id && totalMinutes > 0) {
//       axios.post("http://localhost:3000/api/books/open", {
//         bookId: id,
//         userId,
//         timeSpent: totalMinutes,
//       }).then(() => {
//         console.log(`⏱️ Logged ${totalMinutes} min for book ${id}`);
//       }).catch((err) => {
//         console.error("Error logging time:", err);
//       });

//       axios.post("http://localhost:3000/api/users/update-reading-time", {
//         userId,
//         bookId: id,
//         timeSpent: totalMinutes,
//       }).catch((err) => {
//         console.error("Error updating reading time:", err);
//       });
//     }
//   };
// }, [id, userId]);


 useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await axios.get(`https://api-routes.onrender.com/api/books/${id}`);
      const cloudinaryURL = res.data.contentURL;
      setBookURL(cloudinaryURL);
    } catch (err) {
      console.error("Error fetching book:", err);
    }
  };
  fetchBook();
}, [id]);


  // When user leaves page
 




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
      const res = await axios.post("https://api-routes.onrender.com/api/books/quiz-by-range", {
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

// const { id: bookId } = useParams();
//   const timeSpentRef = useRef(0);
//   const intervalRef = useRef(null);

  // useEffect(() => {
  //   // Start timer
  //   intervalRef.current = setInterval(() => {
  //     timeSpentRef.current += 1; // count seconds
  //   }, 1000);

  //   // On unmount, send time to backend
  //   return () => {
  //     clearInterval(intervalRef.current);
  //     const minutesSpent = Math.floor(timeSpentRef.current / 60);
  //     if (minutesSpent > 0) {
  //       axios.post('/api/users/update-reading-time', {
  //         userId,
  //         bookId,
  //         timeSpent: minutesSpent,
  //       });
  //     }
  //   };
  // }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div><Navbar/></div>
      <div className="w-full md:w-2/3 h-full border-r border-gray-200 overflow-hidden mt-14">
        {bookURL ? (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <div className="h-full overflow-hidden">
              <Viewer
                fileUrl={bookURL}
                // plugins={[defaultLayoutPluginInstance]}
                onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
              />
            </div>
          </Worker>
        ) : (
          <div className="text-center mt-10">Loading book...</div>
        )}
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-1/3 bg-blue-200 text-white p-4 rounded shadow-md h-[100vh] overflow-y-auto sticky top-6 mt-14">
        <h2 className="text-lg font-semibold mb-2 text-black">🧠 Attemp Quiz...</h2>

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
              "Generate Quiz"
            )}
          </button>
        </div>

        {summary && (
          <div className="mt-6 w-full bg-white text-black p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              🧠 Here is your Quiz (Pages {startPage}–{endPage})
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

// Updated ReadBook.jsx and Backend Quiz Endpoint Integration

// ✅ FIXED: Backend now returns parsed quiz as array
// ✅ FIXED: Frontend now safely waits for currentUser before calling /open

// ---- FRONTEND (React Component) ----

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { toast } from "react-toastify";
// import Footer from "../components/footer";
// import Navbar from "../components/sidebar";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// const ReadBook = () => {
//   const { id } = useParams();
//   const [bookURL, setBookURL] = useState(null);
//   const [summary, setSummary] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jumpToPageFn, setJumpToPageFn] = useState(null);
//   const [totalPages, setTotalPages] = useState(null);
//   const [startPage, setStartPage] = useState("");
//   const [endPage, setEndPage] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         setCurrentUser(JSON.parse(storedUser));
//       } catch (err) {
//         console.error("Failed to parse user from localStorage");
//       }
//     }
//   }, []);

//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     onPageChange: (e) => {
//       const newPage = e.currentPage + 1;
//       setCurrentPage(newPage);
//       localStorage.setItem(`lastPage-${id}`, newPage);
//     },
//     setJumpToPage: (fn) => setJumpToPageFn(() => fn),
//   });

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axios.get(`https://api-routes.onrender.com/api/books/${id}`);
//         const cloudinaryURL = res.data.contentURL;
//         setBookURL(cloudinaryURL);

//         if (currentUser?._id) {
//           await axios.post("https://api-routes.onrender.com/api/books/open", {
//             bookId: id,
//             userId: currentUser._id,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching book:", err);
//       }
//     };
//     if (currentUser) fetchBook();
//   }, [id, currentUser]);

//   useEffect(() => {
//     if (!bookURL || !jumpToPageFn) return;

//     const savedPage = localStorage.getItem(`lastPage-${id}`);
//     if (savedPage) {
//       jumpToPageFn(Number(savedPage) - 1);
//       setCurrentPage(Number(savedPage));
//     }
//   }, [bookURL, jumpToPageFn, id]);

//   const handleGenerateQuizOrSummary = async () => {
//     const start = Number(startPage);
//     const end = Number(endPage);

//     if (
//       isNaN(start) ||
//       isNaN(end) ||
//       start < 1 ||
//       end < 1 ||
//       start > totalPages ||
//       end > totalPages ||
//       end < start ||
//       end - start > 20
//     ) {
//       toast.warn("Please enter a valid page range (Max: 20 pages)")
//         return;
  
//     }

//     setIsGenerating(true);

//     try {
//       const response = await axios.post(
//         "https://api-routes.onrender.com/api/books/quiz-by-range",
//         {
//           pdfUrl: bookURL,
//           startPage: start,
//           endPage: end,
//           type: "quiz",
//         }
//       );

//       const rawQuiz = response.data.quiz;

//       let quizData;
// if (typeof rawQuiz === "string") {
//   try {
//     quizData = JSON.parse(rawQuiz);
//   } catch (e) {
//     setSummary("⚠️ Quiz format invalid.");
//     return;
//   }
// } else if (Array.isArray(rawQuiz)) {
//   quizData = rawQuiz;
// } else {
//   setSummary("⚠️ Quiz format invalid.");
//   return;
// }

//       if (Array.isArray(quizData)) {
//         const formatted = quizData
//           .map((q, index) => {
//             const options = q.options
//               ?.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`)
//               .join("\n");
//             return `**Q${index + 1}.** ${q.question}\n${options}\n\n**Answer:** ${q.answer}`;
//           })
//           .join("\n\n");
//         setSummary(formatted);
//       } else {
//         setSummary("⚠️ Quiz format invalid.");
//       }
//     } catch (err) {
//       console.error("Error generating quiz:", err);
//       setSummary("❌ Failed to generate quiz.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   if (!bookURL)
//     return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;

//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <div>
//         <Navbar />
//       </div>
//       <div className="w-full md:w-2/3 h-full border-r border-gray-200 overflow-hidden mt-14">
//         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//           <div className="h-full overflow-hidden">
//             <Viewer
//               fileUrl={bookURL}
//               plugins={[defaultLayoutPluginInstance]}
//               onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
//             />
//           </div>
//         </Worker>
//       </div>

//       {/* Summary Sidebar */}
//       <div className="w-full lg:w-1/3 bg-blue-200 text-white p-4 rounded shadow-md h-[100vh] overflow-y-auto sticky top-6 mt-14">
//         <h2 className="text-lg font-semibold mb-2 text-black">🧠 Attempt Quiz...</h2>

//         <div className="flex flex-col gap-2 mb-4">
//           <input
//             type="number"
//             value={startPage}
//             onChange={(e) => setStartPage(e.target.value)}
//             className="border border-gray-300 p-2 text-black rounded w-full"
//             placeholder="Start Page"
//             min={1}
//             max={totalPages}
//           />
//           <input
//             type="number"
//             value={endPage}
//             onChange={(e) => setEndPage(e.target.value)}
//             className="border border-gray-300 p-2 text-black rounded w-full"
//             placeholder="End Page"
//             min={1}
//             max={totalPages}
//           />
//           <button
//             onClick={handleGenerateQuizOrSummary}
//             disabled={isGenerating}
//             className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition ${
//               isGenerating ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {isGenerating ? (
//               <>
//                 <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="white"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="white"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   />
//                 </svg>
//                 Generating...
//               </>
//             ) : (
//               "Generate Quiz"
//             )}
//           </button>
//         </div>

//         {summary && (
//           <div className="mt-6 w-full bg-white text-black p-4 rounded shadow-md">
//             <h2 className="text-lg font-semibold mb-2">
//               🧠 Here is your Quiz (Pages {startPage}–{endPage})
//             </h2>
//             <div className="prose max-w-none">
//               <ReactMarkdown>{summary}</ReactMarkdown>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReadBook;

