import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProjectsIssuesChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue (Crores)',
        data: [15, 5, 20, 17, 15, 7],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderWidth: 2,
        tension: 0, // Straight line
      },
      {
        label: 'Expenses (Crores)',
        data: [27, 7, 15, 17, 13, 5],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        borderWidth: 2,
        tension: 0, // Straight line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container mt-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default ProjectsIssuesChart;