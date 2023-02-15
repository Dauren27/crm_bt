import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import cl from "./Chart.module.scss";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useSelector } from "react-redux";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Chart = ({ title, item = "Conversation" }) => {
  const { chartData } = useSelector((state) => state.user);
  const [fetchedData, setFetchedData] = useState(
    chartData && chartData[item] && chartData[item]
  );
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };
  const data = {
    labels: fetchedData && [...fetchedData.map((item) => item.created_date)],
    datasets: [
      {
        data: fetchedData && [...fetchedData.map((item) => item.total)],
        pointStyle: "rect",
        borderColor: "#42b4f4",
      },
    ],
  };
  useEffect(() => {
    setFetchedData(chartData[item] && chartData[item]);
  }, [chartData]);
  return (
    <div className={cl.chart__wrapper}>
      <h2>{title}</h2>
      {fetchedData && <Line options={options} data={data} />}
    </div>
  );
};

export default Chart;
