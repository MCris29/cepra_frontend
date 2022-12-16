import React from "react";
import styles from "@/styles/Survey.module.css";
import StaticGraphicForm from "@/components/StaticGraphicForm";

export default function StaticGraphics() {
  return (
    <div className="main-admin-content">
      <h4 className="title">Gráfico estático</h4>
      <p className="paragraph">
        En esta sección se suben imágenes que se muestran en la sección de
        gráfico estático, para ello debe seleccionar la encuesta a la que
        pertenece el gráfico y llenar los demás campos.
      </p>
      <StaticGraphicForm />
    </div>
  );
}
