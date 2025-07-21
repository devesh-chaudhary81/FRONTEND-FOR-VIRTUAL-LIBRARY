import React, { useState } from "react";
import axios from "axios";

const GenerateSummary = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState({ chapter1: "", chapter2: "" });
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a PDF file!");

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://your-backend-url.com/api/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setSummaries({
        chapter1: res.data.chapter1_summary,
        chapter2: res.data.chapter2_summary
      });
    } catch (err) {
      setError("Failed to summarize book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center drop-shadow">📖 Generate Book Summary</h2>

        <form onSubmit={handleUpload} className="flex flex-col gap-4 items-center">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

        {summaries.chapter1 && (
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">📘 Chapter 1 Summary</h3>
              <p className="text-gray-800 leading-relaxed">{summaries.chapter1}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">📙 Chapter 2 Summary</h3>
              <p className="text-gray-800 leading-relaxed">{summaries.chapter2}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateSummary;

