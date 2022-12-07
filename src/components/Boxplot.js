import React from "react";
import Plot from "react-plotly.js";

const Boxplot = ({ data, title }) => {
  var trace1 = {
    name: "Sector 1",
    y: data.labels,
    type: "histogram",
    marker: {
      color: "rgba(234, 134, 27, 0.7)",
    },
  };

  var trace2 = {
    name: "Sector 2",
    y: data.labels,
    type: "histogram",
    marker: {
      color: "rgba(23, 14, 227, 0.7)",
    },
  };

  return (
    <>
      <Plot
        data={[trace1, trace2]}
        layout={{ width: 520, height: 340, title: title }}
      />
    </>
  );
};

export default Boxplot;
