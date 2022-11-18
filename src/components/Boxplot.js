import React from "react";
import Plot from "react-plotly.js";

const Boxplot = ({ data, title }) => {
  var trace1 = {
    y: data.labels,
    type: "box",
    marker: {
      color: "rgba(234, 134, 27, 0.7)",
    },
  };

  return (
    <>
      <Plot
        data={[trace1]}
        layout={{ width: 520, height: 340, title: title }}
      />
    </>
  );
};

export default Boxplot;
