import React from "react";
import styles from "@/styles/ButtonDownload.module.css";

import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const ButtonDownloadGraphic = (props) => {
  const saveGraphic = (name) => {
    const graphicSave = document.getElementById("graphic_canvas");
    graphicSave.toBlob(function (blob) {
      saveAs(blob, name + ".png");
    });
  };

  return (
    <div className={styles.btn_download}>
      <Button onClick={() => saveGraphic(props.title)}>
        Descargar gráfico
      </Button>
    </div>
  );
};

export default ButtonDownloadGraphic;
