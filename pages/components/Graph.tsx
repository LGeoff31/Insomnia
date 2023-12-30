import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SleepEntry } from "..";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({
  dataEntries,
  target,
}: {
  dataEntries: SleepEntry[];
  target: number;
}) => {
  const threshold = target;
  const dates = dataEntries.map((entry) => {
    return entry.date;
  });

  const hours = dataEntries.map((entry) => {
    return entry.hours;
  });

  const quality = dataEntries.map((entry) => {
    return entry.quality;
  });

  const options = {
    responsive: true,
    title: {
      display: true,
      text: "Insomnia",
      font: {
        size: 30,
        weight: "bold",
      },
      style: {
        background: "red",
      },
    },

    scale: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Hours",
        },
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Duration of Sleep",
        data: hours,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Quality of Sleep",
        data: quality,
        backgroundColor: "rgb(53, 162, 235)",
        borderColor: "rgb(53, 162, 235)",
      },
      {
        label: "Target Duration of Sleep",
        data: new Array(dates.length).fill(threshold),
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderDash: [5, 5],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "#E1F6FF",
        paddingTop: "2rem",
      }}
    >
      {/* <Typography
        display="flex"
        justifyContent="center"
        color="#052A42"
        fontSize="2rem"
        fontWeight="0"
        paddingTop="2rem"
      >
        Visualize Your Data
      </Typography> */}
      <Line style={{ background: "#E1F6FF" }} options={options} data={data} />
    </Box>
  );
};
export default Graph;
