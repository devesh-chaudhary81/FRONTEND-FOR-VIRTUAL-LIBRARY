import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const booksData = [
    { name: "Books in Shelf", value: 8 },
    { name: "Favourites", value: 3 },
  ];

  const interestData = [
    { name: "AI", value: 2 },
    { name: "Sci-Fi", value: 3 },
    { name: "History", value: 1 },
  ];

  const readingTracker = [
    { day: "July 18", pages: 25 },
    { day: "July 19", pages: 40 },
    { day: "July 20", pages: 10 },
    { day: "July 21", pages: 35 },
    { day: "July 22", pages: 50 },
  ];

  const recentActivity = [
    { date: "July 18", action: "Read: 'Atomic Habits'" },
    { date: "July 19", action: "Bookmarked: 'The Alchemist'" },
    { date: "July 20", action: "Completed: 'Deep Work'" },
    { date: "July 21", action: "Feedback: 'Loved the interface!'" },
    { date: "July 22", action: "Read: 'Hooked'" },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">📚 MyLibrary</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-800 hover:bg-blue-700 text-white transition-all px-4 py-3 rounded-xl text-left w-full"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate('/books')}
          className="bg-gray-100 hover:bg-gray-200 text-blue-800 px-4 py-3 rounded-xl text-left w-full"
        >
          📖 My Books
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="bg-gray-100 hover:bg-gray-200 text-blue-800 px-4 py-3 rounded-xl text-left w-full"
        >
          👤 Profile
        </button>
      </aside>

      {/* Dashboard Main Content */}
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Books Breakdown</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={booksData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name }) => name}
              >
                {booksData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Your Interests</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={interestData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name }) => name}
              >
                {interestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📅 Last 5 Days Activity</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            {recentActivity.map((item, idx) => (
              <li key={idx}>
                <strong>{item.date}</strong>: {item.action}
              </li>
            ))}
          </ul>
        </div>

        {/* 📈 Reading Tracker */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📈 5-Day Reading Tracker (Pages)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={readingTracker}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pages" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
