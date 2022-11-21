import React, { useState } from "react";
import dynamic from "next/dynamic";
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
  SubTitle,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import ThemeCepra from "@/constants/theme";
import { Chart, Radar, Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import LoadingInformation from "@/components/LoadingInformation";

//Carga dinámica de Boxplot
const Boxplot = dynamic(() => import("@/components/Boxplot"), {
  ssr: false,
  loading: () => <LoadingInformation />,
});

const graphicBackgroundColor = [
  "rgba(55, 160, 235, 0.5)",
  "rgba(255, 100, 135, 0.5)",
  "rgba(234, 134, 27, 0.5)",
  "rgba(75, 255, 25, 0.5)",
  "rgba(155, 100, 255, 0.5)",
  "rgba(255, 225, 100, 0.5)",

  "rgba(31, 62, 92, 0.5)",
  "rgba(200, 2, 25, 0.5)",
  "rgba(255, 222, 10, 0.5)",
  "rgba(30, 155, 65, 0.5)",
  "rgba(200, 0, 250, 0.5)",
  "rgba(255, 160, 65, 0.5)",
];
const graphicBorderColor = [
  "rgba(55, 160, 235, 1)",
  "rgba(255, 100, 135, 1)",
  "rgba(234, 134, 27, 1)",
  "rgba(75, 255, 25, 1)",
  "rgba(155, 100, 255, 1)",
  "rgba(255, 225, 100, 1)",

  "rgba(31, 62, 92, 1)",
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
  SubTitle,
  Tooltip,
  Filler,
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
          fill: graphic === "area" ? true : false,
          label: chartInformation.title,
          data: chartInformation.data,
          backgroundColor:
            graphic === "pie" || graphic === "doughnut"
              ? graphicBackgroundColor
              : "rgba(234, 134, 27, 0.7)",
          borderColor:
            graphic === "pie" || graphic === "doughnut"
              ? graphicBorderColor
              : "rgba(234, 134, 27, 1)",
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
          subTitle: {
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
        subtitle: {
          display: true,
          position: "bottom",
          text: props.observation,
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
        subtitle: {
          display: true,
          position: "bottom",
          text: props.observation,
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
        subtitle: {
          display: true,
          position: "bottom",
          text: props.observation,
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
      case "area":
        return <Line id="graphic_canvas" options={options} data={data} />;
      case "pie":
        return <Pie id="graphic_canvas" options={optionsPie} data={data} />;
      case "doughnut":
        return (
          <Doughnut id="graphic_canvas" options={optionsPie} data={data} />
        );
      case "radar":
        return <Radar id="graphic_canvas" options={optionsRadar} data={data} />;
      case "boxplot":
        return <Boxplot data={data} title={props.title} />;
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
                  : "66%",
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
