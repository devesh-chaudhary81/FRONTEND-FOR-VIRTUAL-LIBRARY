import React, { useState } from "react";

const QuizComponent = ({ quizData, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState("");

  if (!Array.isArray(quizData) || quizData.length === 0)
    return <p className="text-center">⚠️ No quiz data available.</p>;

  const currentQuestion = quizData[currentIndex];
  console.log(quizData);
  console.log(quizData.length)

  const handleSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handleSubmit = () => {
    const selected = selectedAnswers[currentIndex];
    if (!selected) {
      setFeedback("⚠️ Please select an answer!");
      return;
    }
    if (selected === currentQuestion.correctAnswer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${currentQuestion.correctAnswer}`);
    }
  };

  const handleNext = () => {
    setFeedback("");
    if (currentIndex < quizData.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setFeedback("");
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (

    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Question {currentIndex + 1} of {quizData.length}
      </h2>
      <p className="mb-4">{currentQuestion.question}</p>

      <div className="space-y-2">
        {currentQuestion?.options?.map((option, i) => (
          <label
            key={i}
            className={`block p-2 rounded border cursor-pointer ${
              selectedAnswers[currentIndex] === option
                ? "bg-blue-100 border-blue-500"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={`question-${currentIndex}`}
              value={option}
              checked={selectedAnswers[currentIndex] === option}
              onChange={() => handleSelect(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {feedback && <p className="mt-4 font-semibold">{feedback}</p>}

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === quizData.length - 1}
        >
          Next
        </button>
      </div>

      <button
        className="mt-6 w-full bg-red-500 text-white py-2 rounded"
        onClick={onExit}
      >
        🔙 Back
      </button>
    </div>
  );
};

export default QuizComponent;


