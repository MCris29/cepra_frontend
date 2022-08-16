import React, { useEffect, useState } from "react";
import styles from "@/styles/Graphic.module.css";

import { ChartData } from "@/lib/ChartData";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const GenericGraphic = (props) => {
  const [newData, setNewData] = useState();
  const [id, setId] = useState(props.id);

  useEffect(() => {
    try {
      ChartData.getById(id)
        .then((response) => {
          if (response.data.data) {
            // Carga de datos en el Chart
            setNewData(data_graphic(response.data.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.error("error");
    }
  }, [id]);

  const data_graphic = (data) => {
    const labels = [];
    const datos = [];

    //Llenado  de arrays de parametros para el Chart
    data.map((item) => {
      labels.push(item.itorg_nombre);
      datos.push(item.itrde_respuesta);
    });

    const data_graphic = {
      labels: labels,
      datasets: [
        {
          label: data[0].itpre_nombre,
          data: datos,
          fill: true,
          backgroundColor: [
            "rgba(20, 10, 155, 0.5)",
            "rgba(2, 100, 55, 0.5)",
            "rgba(255, 10, 155, 0.5)",
            "rgba(100, 50, 25, 0.5)",
            "rgba(150, 250, 22, 0.5)",
          ],
        },
      ],
    };

    return data_graphic;
  };

  const options = {
    responsive: true,
    plugins: {
      display: false,
    },
  };

  return (
    <>
      <div className={styles.graphic_container}>
        {newData ? (
          <div>
            <Line options={options} data={newData} />
            <Bar options={options} data={newData} />

            <button onClick={() => setId(id - 1)}>Dato Anterior</button>
            <button onClick={() => setId(id + 1)}>Dato Siguiente</button>
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </>
  );
};

export default GenericGraphic;
