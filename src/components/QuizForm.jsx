import React, { useState } from 'react';
import axios from 'axios';
import Quiz from './quiz';

const QuizForm = () => {
  const [bookUrl, setBookUrl] = useState('');
  const [fromPage, setFromPage] = useState('');
  const [toPage, setToPage] = useState('');
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setQuestions(null);

    try {
      const response = await axios.post('http://localhost:3000/api/books/quiz', {
        pdfUrl: bookUrl,
        startPage: fromPage,
        endPage: toPage,
      });

      const data = response.result;
      

      if (Array.isArray(data)) {
        setQuestions(data);
      } else if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          setQuestions(parsed);
        } catch (err) {
          setErrorMsg('Received invalid JSON string from server.');
        }
      } else {
        setErrorMsg('Invalid response format. Expected array or JSON string.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      setErrorMsg('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-lg">⏳ Generating quiz, please wait...</div>;
  }

  if (questions) {
    return <Quiz questions={questions} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
      <input
        type="text"
        placeholder="PDF URL"
        value={bookUrl}
        onChange={(e) => setBookUrl(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="From Page"
        value={fromPage}
        onChange={(e) => setFromPage(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="To Page"
        value={toPage}
        onChange={(e) => setToPage(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Generate Quiz
      </button>

      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
    </form>
  );
};

export default QuizForm;
