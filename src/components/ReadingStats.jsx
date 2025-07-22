import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.userId;


const ReadingStats = ({
  totalBooks,
  pagesRead,
  readingStreak,
  monthlyGoal,
  booksThisMonth,
  userId, // 👈 receive userId as prop
}) => {
  const goalPercentage = monthlyGoal === 0 ? 0 : (booksThisMonth / monthlyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Books Read */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium opacity-90">Total Books Read</h3>
            <p className="text-3xl font-bold mt-2">{totalBooks}</p>
            <p className="text-xs opacity-70 mt-1">User ID: {userId}</p>
          </div>
        </div>
      </div>

      {/* Pages Read */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <h3 className="text-sm font-medium opacity-90">Pages Read</h3>
        <p className="text-3xl font-bold mt-2">{pagesRead}</p>
        <p className="text-xs opacity-70 mt-1">Across all books</p>
      </div>

      {/* Reading Streak */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <h3 className="text-sm font-medium opacity-90">Reading Streak</h3>
        <p className="text-3xl font-bold mt-2">{readingStreak} days</p>
        <p className="text-xs opacity-70 mt-1">Consecutive days</p>
      </div>

      {/* Monthly Goal Progress */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
        <div className="w-24 h-24 mb-4">
          <CircularProgressbar
            value={goalPercentage}
            text={`${Math.round(goalPercentage)}%`}
            styles={buildStyles({
              pathColor: '#4F46E5',
              textColor: '#111827',
              trailColor: '#E5E7EB',
            })}
          />
        </div>
        <h3 className="text-sm font-medium text-gray-600">Monthly Goal</h3>
        <p className="text-xs text-gray-400 mt-1">
          {booksThisMonth}/{monthlyGoal} books
        </p>
      </div>
    </div>
  );
};

export default ReadingStats;
