import React, { useState } from "react";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const SurveyIndicators = () => {
  const { data, error } = useSWR("it/datosGrafico2/1", fetcher);
  console.log("Data", data);

  return (
    <>
      {data ? (
        data.data.map((survey, index) => (
          <div key={index}>{survey.tipoEncuesta}</div>
        ))
      ) : (
        <div>Cargando menú...</div>
      )}
    </>
  );
};

export default SurveyIndicators;
