import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingInformation() {
  return (
    <div
      style={{
        height: "18em",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h4 className="title" style={{ margin: "0" }}>
          Cargando
        </h4>
        <LinearProgress />
      </div>
    </div>
  );
}
