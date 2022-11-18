import React from "react";
import Image from "next/image";

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
      <Image
        src="/Logo propuestavf-02.png"
        height={150}
        width={560}
        style={{ opacity: "0.4" }}
      />
    </div>
  );
}
