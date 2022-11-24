import React from "react";

export default function Management() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_ROUTE}Logo propuestavf-02.png`}
        height={150}
        width={560}
        style={{ opacity: "0.4" }}
      />
    </div>
  );
}
