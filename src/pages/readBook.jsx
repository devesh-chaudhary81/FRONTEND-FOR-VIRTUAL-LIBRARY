

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import Navbar from '../components/sidebar'
import QuizComponent from "../components/quiz";

 
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
 
const ReadBook = ({ userId }) => {
  const { id } = useParams();
  const [topic,settopic]=useState("");
  const [bookURL, setBookURL] = useState(null);
  const [summary, setSummary] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPageFn, setJumpToPageFn] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [isQuizMode, setIsQuizMode] = useState(false);
const [quizData, setQuizData] = useState([]);
 
  // Time tracking
  const startTimeRef = useRef(Date.now());
 
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    onPageChange: (e) => {
      const newPage = e.currentPage + 1;
      setCurrentPage(newPage);
      localStorage.setItem(`lastPage-${id}`, newPage);
    },
    setJumpToPage: (fn) => setJumpToPageFn(() => fn),
  });
 
  // 🟢 Fetch Book
  useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await axios.get(
        `https://api-routes.onrender.com/api/books/${id}`
      );
      const cloudinaryURL = res.data.contentURL;
      setBookURL(cloudinaryURL);
 
      console.log("📘 Book content URL set:", cloudinaryURL);
 
     
 
      console.log("📥 Book opened and tracked on backend.");
    } catch (err) {
      console.error("❌ Error fetching book:", err);
    }
  };
 
  fetchBook();
 
  if (!id || !userId) {
    console.warn("⚠️ Missing book ID or user ID. Skipping reading timer setup.");
    return;
  }
 
  // Start reading time
  startTimeRef.current = Date.now();
  console.log("⏱️ Reading timer started...");
 
  // Cleanup function when user leaves the page or component unmounts
  return () => {
    const endTime = Date.now();
    console.log(endTime);
    console.log(startTimeRef.current);
    const minutesRead = Math.floor((endTime - startTimeRef.current) / 60000);
 
    console.log("🕒 Reading session ended. Duration:", minutesRead, "minutes");
 
    if (minutesRead>0) {
      axios
        .post("https://api-routes.onrender.com/api/books/stats/update-reading-time", {
          bookId: id,
          userId,
          minutesRead,
        })
        .then((res) =>
          console.log("✅ Reading time successfully updated on backend:", res.data)
        )
        .catch((err) =>
          console.error("❌ Failed to update reading time:", err.response?.data || err.message)
        );
    } else {
      console.log("⏱️ Book was open for less than 1 minute. Skipping update.");
    }
  };
}, [id, userId]);
 
 
  // 🔁 Restore last read page
  useEffect(() => {
    if (!bookURL || !jumpToPageFn) return;
 
    const savedPage = localStorage.getItem(`lastPage-${id}`);
    if (savedPage) {
      jumpToPageFn(Number(savedPage) - 1);
      setCurrentPage(Number(savedPage));
    }
  }, [bookURL, jumpToPageFn, id]);
 
  // 🧠 Handle AI Summary
  const handleAction = async (type) => {
  const start = Number(startPage);
  const end = Number(endPage);

  

  setIsGenerating(true);
  try {
    const route =
      type === "quiz"
        ? "https://api-routes.onrender.com/api/books/quiz-by-topic"
        : "https://api-routes.onrender.com/api/books/Notes-by-topic";

    const res = await axios.post(route, {
      pdfUrl: bookURL,
     topic:topic
    });
console.log(res);
    if (type === "quiz") {
      const parsedQuiz = JSON.parse(res.data.summary);
      setQuizData(parsedQuiz);  // Store quiz data
      setIsQuizMode(true);         // Show quiz component
    } else {
      setSummary(res.data.summary);
    }
  } catch (err) {
    console.error(`❌ Error generating ${type}:`, err);
    toast.error(`Failed to generate ${type}`);
  } finally {
    setIsGenerating(false);
  }
};


 
  if (!bookURL)
    return <p className="text-center mt-10 text-white">🔄 Loading book...</p>;
 
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Navbar/>
      {/* PDF Viewer */}
      <div className="w-full md:w-2/3 h-full border-r border-gray-200 overflow-hidden mt-16">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="h-full overflow-hidden">
            <Viewer
              fileUrl={bookURL}
              plugins={[defaultLayoutPluginInstance]}
              onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
            />
          </div>
        </Worker>
      </div>
 
      {/* Summary Sidebar */}
      {/* Summary Sidebar */}
<div className="w-full lg:w-1/3 bg-blue-200 text-black p-4 overflow-y-auto h-screen sticky top-0 shadow-inner mt-16">
  <h2 className="text-xl font-bold mb-4 text-center">🧠 Smart Study Assistant</h2>

  {/* Page Range Inputs */}
  <div className="flex flex-col gap-2 mb-4">
  Topic
    <input
      type="text"
      value={topic}
      onChange={(e) => settopic(e.target.value)}
      className="border border-gray-300 p-2 text-black rounded w-full"
      placeholder="Enter your topic"
    />
  </div>

  {/* Action Buttons */}
 {isQuizMode ? (
  // Show Quiz Component
  <div className="mt-6 w-full">
    <QuizComponent quizData={quizData} onExit={() => setIsQuizMode(false)} />
  </div>
) : summary ? (
  // Show Summary
  <div className="mt-6 w-full bg-white text-black p-4 rounded shadow-md">
    <h2 className="text-lg font-semibold mb-2">
      📑 Result (Pages {startPage}–{endPage})
    </h2>
    <div className="prose max-w-none">
      <ReactMarkdown>{summary}</ReactMarkdown>
    </div>
    <button
      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      onClick={() => setSummary("")}
    >
      🔄 Reset
    </button>
  </div>
) : (
  // Show Buttons if nothing is generated yet
  <div className="flex flex-col gap-2 mt-4">
    {!isGenerating && (
      <>
        <button
          onClick={() => handleAction("summary")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          📄 Generate Notes
        </button>
        <button
          onClick={() => handleAction("quiz")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
        >
          🧩 Generate Quiz
        </button>
      </>
    )}
  </div>
)}

  {/* Loading Spinner */}
  {isGenerating && (
    <div className="flex justify-center items-center mt-4">
      <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
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
      <span className="ml-2">Generating...</span>
    </div>
  )}

  {/* Summary or Quiz Result */}
  {summary && (
    <div className="mt-6 w-full bg-white text-black p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        📑 Result (Pages {startPage}–{endPage})
      </h2>
      <div className="prose max-w-none">
        <ReactMarkdown>{summary}</ReactMarkdown>
      </div>

      <button
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        onClick={() => setSummary("")}
      >
        🔄 Reset
      </button>
    </div>
  )}
</div>

    </div>
  );
};
 
export default ReadBook;