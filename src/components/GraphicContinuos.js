import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const GraphicContinuos = ({ data, title, type }) => {
  const [traces, setTraces] = useState([]);

  useEffect(() => {
    let array_trace = [];
    data.map((item) => {
      for (let key in item) {
        let trace = {
          name: key,
          y: item[key],
          type: type,
        };
        array_trace.push(trace);
      }
    });
    setTraces(array_trace);
  }, [type]);

  return (
    <>
      <Plot
        data={traces}
        layout={{ width: 680, height: 520, title: title }}
      />
    </>
  );
};

export default GraphicContinuos;
