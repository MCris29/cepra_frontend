import React, { useState, useEffect } from "react";
import styles from "@/styles/Graphic.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
// import Chart from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { padding } from "@mui/system";

// Chart.register(CategoryScale);

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

const Graphic = (props) => {
  const [chartInformation, setChartInformation] = useState(props.data);
  const [typeChart, setTypeChart] = useState("bar");

  const data = {
    labels: chartInformation.labels,
    datasets: [
      {
        type: typeChart,
        label: chartInformation.title,
        data: chartInformation.data,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      display: false,
    },
  };

  const handleChange = (event) => {
    setTypeChart(event.target.value);
  };

  return (
    <>
      {data ? (
        <ThemeProvider theme={theme}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">
              Tipo de gráfico
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeChart}
              label="Tipo de gráfico"
              onChange={handleChange}
            >
              <MenuItem value={"bar"}>Barras</MenuItem>
              <MenuItem value={"line"}>Lineal</MenuItem>
              <MenuItem value={"pie"}>Pastel</MenuItem>
              <MenuItem value={"doughnut"}>Dona</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              width: {
                desktop: "88%",
                laptop: "90%",
                tablet: "92%",
                mobile: "90%",
              },
              marginTop: "0.2rem",
              marginLeft: {
                desktop: "6%",
                laptop: "5%",
                tablet: "4%",
                mobile: "5%",
              },
            }}
          >
            <Chart options={options} data={data} />
          </Box>
        </ThemeProvider>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default Graphic;
