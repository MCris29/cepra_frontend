import React, { useState } from "react";
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

const graphicBackgroundColor = [
  "rgba(55, 160, 235, 0.5)",
  "rgba(255, 100, 135, 0.5)",
  "rgba(255, 225, 100, 0.5)",
  "rgba(75, 255, 25, 0.5)",
  "rgba(155, 100, 255, 0.5)",
  "rgba(200, 95, 25, 0.5)",

  "rgba(40, 20, 190, 0.5)",
  "rgba(200, 2, 25, 0.5)",
  "rgba(255, 222, 10, 0.5)",
  "rgba(30, 155, 65, 0.5)",
  "rgba(200, 0, 250, 0.5)",
  "rgba(255, 160, 65, 0.5)",
];
const graphicBorderColor = [
  "rgba(55, 160, 235, 1)",
  "rgba(255, 100, 135, 1)",
  "rgba(255, 225, 100, 1)",
  "rgba(75, 255, 25, 1)",
  "rgba(155, 100, 255, 1)",
  "rgba(200, 95, 25, 1)",

  "rgba(40, 20, 190, 1)",
  "rgba(200, 2, 25, 1)",
  "rgba(255, 222, 10, 1)",
  "rgba(30, 155, 65, 1)",
  "rgba(200, 0, 250, 1)",
  "rgba(255, 160, 65, 1)",
];

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
    const data = {
      labels: chartInformation.labels,
      datasets: [
        {
          label: chartInformation.title,
          data: chartInformation.data,
          backgroundColor:
            graphic === "pie" || graphic === "doughnut"
              ? graphicBackgroundColor
              : "rgba(55, 165, 235, 0.5)",
          borderColor:
            graphic === "pie" || graphic === "doughnut"
              ? graphicBorderColor
              : "rgba(55, 165, 235, 1)",
        },
      ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: false,
            text: "",
          },
          ticks: {
            callback: function (value, index, ticks) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: props.title,
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (item) {
              const index = item.dataIndex;
              return item.dataset.data[index] + "%";
            },
          },
        },
      },
    };
    const optionsPie = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: props.title,
        },
        legend: {
          display: true,
          position: "right",
        },
        tooltip: {
          callbacks: {
            title: function (item) {
              return item[0].label;
            },
            label: function (item) {
              const index = item.dataIndex;
              return item.dataset.data[index] + "%";
            },
          },
        },
      },
    };
    const optionsRadar = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: props.title,
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (item) {
              const index = item.dataIndex;
              return item.dataset.data[index] + "%";
            },
          },
        },
      },
    };

    switch (graphic) {
      case "bar":
        return <Bar id="graphic_canvas" options={options} data={data} />;
      case "line":
        return <Line id="graphic_canvas" options={options} data={data} />;
      case "pie":
        return <Pie id="graphic_canvas" options={optionsPie} data={data} />;
      case "doughnut":
        return (
          <Doughnut id="graphic_canvas" options={optionsPie} data={data} />
        );
      case "radar":
        return <Radar id="graphic_canvas" options={optionsRadar} data={data} />;
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: {
              desktop:
                props.type == "pie" ||
                props.type == "doughnut" ||
                props.type == "radar"
                  ? "42%"
                  : "64%",
              laptop:
                props.type == "pie" ||
                props.type == "doughnut" ||
                props.type == "radar"
                  ? "62%"
                  : "82%",
              tablet: "88%",
              mobile: "92%",
              min: "96%",
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
