import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Custom plugin to show values on top of bars
const barLabelPlugin = {
  id: "barLabelPlugin",
  afterDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];

    chart.getDatasetMeta(0).data.forEach((bar, index) => {
      const value = dataset.data[index];
      if (value !== undefined) {
        ctx.save();
        ctx.fillStyle = "#333"; // Text color
        ctx.font = "bold 12px Arial"; // Font style
        ctx.textAlign = "center";
        ctx.fillText(value, bar.x, bar.y - 10); // Positioning text above the bar
        ctx.restore();
      }
    });
  },
};

const ProjectPerformanceChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Project Performance",
        data: [44, 69, 38, 79, 36, 80, 70],
        backgroundColor: "#5687F2",
        borderRadius: 0,
        barThickness: 22, // Bar thickness similar to image
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Hide legend
      title: { display: false }, // Hide title
    },
    scales: {
      x: {
        grid: {
          display: true, // Show vertical grid lines
          color: "#E0E0E0", // Light gray vertical lines
          drawTicks: false, // Hide tick marks
        },
        ticks: { color: "#333", font: { size: 12 }, padding: 2 },
        // border: { display: false }, // Hide X-axis border
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20, // Show 0, 20, 40, 60, 80, 100
          color: "#333", // Y-axis number color
          font: { size: 12 },
        },
        grid: {
          display: false, // Hide horizontal grid lines
        },
        border: { display: false }, // Hide Y-axis border
      },
    },
  };
  
  return (
    <>
      <Card className="" style={{ height : '255px'}}>
      <h2 className="title-2" style={{ marginLeft : '15px' , marginTop : '23px' , marginBottom: ' 3px'}}>Project Performance</h2>
        <Card.Body>
          <Bar data={data} options={options} plugins={[barLabelPlugin]} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ProjectPerformanceChart;
