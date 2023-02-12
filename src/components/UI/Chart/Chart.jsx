import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Chart = ({ title }) => {
  const [fetchedData, setFetchedData] = useState();
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
    try {
      axios.get("https://baitushum.pp.ua/crm/test/").then((response) => {
        setFetchedData(response.data.Conversation);
      });
    } catch (e) {}
  }, []);
  return (
    <div className={cl.chart__wrapper}>
      <h2>{title}</h2>
      {fetchedData && <Line options={options} data={data} />}
    </div>
  );
};

export default Chart;
