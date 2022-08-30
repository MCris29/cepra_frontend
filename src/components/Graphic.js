import React, { useState } from "react";
import "@/styles/LandingGraphic.module.css";
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
import { Chart } from "react-chartjs-2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import ThemeCepra from "@/constants/theme";
import { Radar } from 'react-chartjs-2';

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
    LinearScale,
);


const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints
});

const Graphic = (props) => {

  const [chartInformation] = useState(props.data);
  let data = {};
  data = {
    labels: chartInformation.labels,
    datasets: [
      {
        type: props.type,
        label: chartInformation.title,
        data: chartInformation.data,
        backgroundColor: [
          "rgba(53, 162, 235, 0.5)",
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          // "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  const dataRadar = {
    labels: chartInformation.labels,
    datasets: [
      {
        type: "radar",
        label: chartInformation.title,
        data: chartInformation.data,
        backgroundColor: [
          "rgba(53, 162, 235, 0.5)",
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          // "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  let options = {};
  options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title
      },
      legend: {
        display: false
      }
    }
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <>
      {
        props.type != "radar" ? (
            <>
              <ThemeProvider theme={theme}>
                <Box
                    sx={{
                      width: {
                        desktop: "84%",
                        laptop: "84%",
                        tablet: "84%",
                        mobile: "90%",
                        min: "94%"
                      },
                      marginLeft: {
                        desktop: "8%",
                        laptop: "8%",
                        tablet: "8%",
                        mobile: "5%",
                        min: "3%"
                      }
                    }}
                >
                  <Chart options={options} data={data}/>
                </Box>
              </ThemeProvider>
            </>
        ) : (
            <>
              <ThemeProvider theme={theme}>
                <Box
                >
                  <Chart options={radarOptions} data={dataRadar}/>
                </Box>
              </ThemeProvider>
            </>
        )
      }
    </>
  );
};

export default Graphic;
