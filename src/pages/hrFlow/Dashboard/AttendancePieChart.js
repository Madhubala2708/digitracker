import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const AttendancePieChart = () => {
  const data = [
    { name: 'Present', value: 90, color: '#7DA5F0' },
    { name: 'Absent', value: 7, color: '#FFD97F' },
    { name: 'On Leave', value: 3, color: '#FFB7D0' }
  ];

  const renderLabel = (entry) => {
    return `${entry.name}: ${entry.value}%`;
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute top-4 right-0 flex flex-col space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-6 h-6 mr-2"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-lg">
                {item.name}: <strong>{item.value}%</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendancePieChart;