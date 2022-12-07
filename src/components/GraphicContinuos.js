import React from "react";
import Plot from "react-plotly.js";

const GraphicContinuos = ({ data, title, type }) => {
  var trace1 = {
    name: "Sector 1",
    y: data.labels,
    type: type,
    marker: {
      color: "rgba(234, 134, 27, 0.7)",
    },
  };

  var trace2 = {
    name: "Sector 2",
    y: data.labels,
    type: type,
    marker: {
      color: "rgba(25, 120, 227, 0.7)",
    },
  };

  var trace3 = {
    name: "Sector 3",
    y: data.labels,
    type: type,
    marker: {
      color: "rgba(200, 14, 27, 0.7)",
    },
  };

  return (
    <>
      <Plot
        data={[trace1, trace2, trace3]}
        layout={{ width: 620, height: 480, title: title }}
      />
    </>
  );
};

export default GraphicContinuos;
