import React, { useState } from "react";
import Graphic from "@/components/Graphic";

let data_1 = {
  data: [4, 1, 13],
  labels: ["Agricultura", "Minas", "Manufactura"],
  title: "Distribución de sectores económicos",
};

let data_2 = {
  data: [4, 1, 3, 3.5, 3.7],
  labels: ["Azuay", "Bolivar", "Cañar", "Carchi", "Chimborazo"],
  title: "Distribución de la muestra por provincias",
};

let data_3 = {
  data: [62, 23, 11, 4],
  labels: ["Director", "Ejecutivo", "Administrativo", "Técnico"],
  title: "Perfil de personas encuestadas",
};

const InnovationGraphics = () => {
  const [chartInformation, setChartInformation] = useState(data_1);

  return (
    <>
      <Graphic data={chartInformation} />
    </>
  );
};

export default InnovationGraphics;
