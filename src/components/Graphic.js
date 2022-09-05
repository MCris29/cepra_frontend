import React, { useState, useEffect } from "react";
// import "@/styles/LandingGraphic.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import ThemeCepra from "@/constants/theme";
import { Radar, Bar, Line, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  RadialLinearScale,
  RadarController,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale
);

const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints,
});

const Graphic = (props) => {
  const [chartInformation] = useState(props.data);

  const handleGraphic = (graphic) => {
    switch (graphic) {
      case "bar":
        return <Bar id="graphic_canvas" options={options} data={data} />;
      case "line":
        return <Line id="graphic_canvas" options={options} data={data} />;
      case "pie":
        return <Pie id="graphic_canvas" data={data} />;
      case "doughnut":
        return <Doughnut id="graphic_canvas" data={data} />;
      case "radar":
        return <Radar id="graphic_canvas" options={options} data={data} />;
    }
  };

  const data = {
    labels: chartInformation.labels,
    datasets: [
      {
        label: chartInformation.title,
        data: chartInformation.data,
        backgroundColor: [
          "rgba(53, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 222, 12, 0.5)",
          "rgba(40, 19, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(75, 192, 25, 0.5)",
          "rgba(200, 2, 24, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 222, 12, 1)",
          "rgba(40, 19, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 25, 1)",
          "rgba(200, 2, 24, 1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: {
              desktop: "84%",
              laptop: "84%",
              tablet: "84%",
              mobile: "90%",
              min: "94%",
            },
            marginLeft: {
              desktop: "8%",
              laptop: "8%",
              tablet: "8%",
              mobile: "5%",
              min: "3%",
            },
          }}
        >
          {handleGraphic(props.type)}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Graphic;
