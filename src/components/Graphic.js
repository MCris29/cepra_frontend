import React, { useState } from "react";
import styles from "@/styles/Graphic.module.css";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";

Chart.register(CategoryScale);

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
    const [chartInformation] = useState(props.data);

    const data = {
        labels: chartInformation.labels,
        datasets: [
            {
                label: chartInformation.title,
                data: chartInformation.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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

    return (
        <>
            {data ? (
                <ThemeProvider theme={theme}>
                    <Box sx={{
                            width: {desktop: "88%", laptop: "90%", tablet: "92%", mobile: "90%"},
                            marginTop: "0.2rem",
                            marginLeft: {desktop: "6%", laptop: "5%", tablet: "4%", mobile: "5%"}
                        }}
                    >
                        <Line options={options} data={data} />
                        {/*<button onClick={() => setId(id - 1)}>Dato Anterior</button>*/}
                        {/*<button onClick={() => setId(id + 1)}>Dato Siguiente</button>*/}
                    </Box>
                </ThemeProvider>
            ) : (
                <div>Cargando...</div>
            )}
        </>
    );
};

export default Graphic;