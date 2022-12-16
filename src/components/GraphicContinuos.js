import { BathroomRounded } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const GraphicContinuos = ({ data, title, observation, type }) => {
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
        layout={{ width: 840, height: 420, title: title, barmode: "stack" }}
      />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <p className="paragraph">{observation}</p>
      </div>
    </>
  );
};

export default GraphicContinuos;
