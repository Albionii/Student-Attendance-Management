import React, { useState } from "react";
import NavBar from "../Component/NavBar";
import Chart from "react-apexcharts";

export default function StudentChart({ userData }) {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "attendance-line-chart",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri"], // Replace with actual days or weeks
      title: {
        text: "Days of the Week", // You can update this if you're tracking attendance over different time frames (e.g., weeks, months)
      },
    },
    yaxis: {
      title: {
        text: "Attendance (%)",
      },
      min: 0,
      max: 100,
    },
    title: {
      // text: "Student Attendance",
      align: "center",
    },
    grid: {
      show: true,
    },
    legend: {
      position: "top",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Attendance",
      data: [80, 90, 85, 70, 95], // Replace with actual attendance data (percentage or count)
    },
  ]);

  return (
    <>
      <NavBar userData={userData} />
      <div className="w-full flex justify-center items-center flex-col">
        <h2 className="text-center text-lg font-bold mb-4">Student Attendance</h2>
        <div className="w-2/3">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line" // Using line chart
            height="400"
            // width="1000"
            
            />
        </div>
      </div>
    </>
  );
}
