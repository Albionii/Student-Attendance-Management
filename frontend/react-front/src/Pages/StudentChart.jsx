import React, { useState } from "react";
import NavBar from "../Component/NavBar";
import Chart from "react-apexcharts";

export default function StudentChart({ userData }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "grades-pie-chart",
    },
    labels: ["10", "9", "8", "7", "6"], // Grade categories
    legend: {
      position: "bottom",
    },
    title: {
      text: "Grade Distribution",
      align: "center",
    },
  });

  const [chartSeries, setChartSeries] = useState([10, 20, 35, 25, 15]); // Percentage or count for each grade

  return (
    <>
      <NavBar userData={userData} />
      <div className="chart-container">
        <h2 className="text-center text-lg font-bold mb-4">Student Grades</h2>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie" // Using pie chart
          width="400"
        />
      </div>
    </>
  );
}
