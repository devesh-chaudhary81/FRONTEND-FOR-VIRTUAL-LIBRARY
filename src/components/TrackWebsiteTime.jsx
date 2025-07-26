import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";

const COLORS = ["#4F46E5", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B"];

const Last5DaysChart = ({ userId }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchReadingTime = async () => {
      try {
        const res = await axios.get(`https://api-routes.onrender.com/api/users/${userId}`);
        const last5Days = res.data.dailyReadingTime || [];

        // Transform data for PieChart
        const formattedData = [...last5Days].reverse().map((entry) => ({
  name: entry.date,
  value: entry.minutes,
}));


        setChartData(formattedData);
      } catch (err) {
        console.error("❌ Error fetching reading time:", err);
      }
    };

    if (userId) fetchReadingTime();
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        📊 Last 5 Days Reading Time
      </h2>

      {chartData.length > 0 ? (
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            <Label
              value={`${chartData.reduce((a, b) => a + b.value, 0)} min`}
              position="center"
              className="font-bold text-lg"
            />
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default Last5DaysChart;


