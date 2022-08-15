import React, { useState } from "react";
import styles from "@/styles/Graphic.module.css";

import { TextField, MenuItem } from "@mui/material";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

function handleDate(dateTime) {
  if (dateTime !== null) {
    var formatDate = new Date(dateTime);
    return formatDate.toLocaleDateString("es-ES");
  } else {
    return "N/A";
  }
}

export default function Graphic() {
  const { data, error } = useSWR("it/datosGrafico1/1", fetcher);
  console.log(data);

  if (!data) return <>Cargando...</>;
  if (error) return <>Ocurrió un error, por favor vuelve a cargar la página</>;

  const data_graphic = () => {
    const labels = [];
    const datos = [];

    data.data.map((item) => {
      labels.push(item.itorg_nombre);
      datos.push(item.itrde_respuesta);
      console.log(item);
    });

    const data_graphic = {
      labels: labels,
      datasets: [
        {
          label: data.data[0].itpre_nombre,
          data: datos,
          backgroundColor: "rgba(20, 10, 155, 0.5)",
        },
      ],
    };
    return data_graphic;
  };

  const options = {
    responsive: true,
    scales: {
      y: { min: 0, max: 2 },
    },
    plugins: {
      display: false,
    },
  };

  return (
    <>
      <div className={styles.main_container}>
        <h4>Filtro</h4>
        <div className={styles.filter_container}>
          {"--->Aquí va el filtro<---"}
        </div>
        <div className={styles.graphic_container}>
          <Line options={options} data={data_graphic()} />
          <Bar options={options} data={data_graphic()} />
        </div>
      </div>
    </>
  );
}
