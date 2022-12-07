import React from "react";
import styles from "@/styles/Survey.module.css";
import StaticGraphicForm from "@/components/StaticGraphicForm";

export default function StaticGraphics() {
  return (
    <div className="main-admin-content">
      <h4 className="title">Graficos estáticos</h4>
      <p className="paragraph">
        En esta sección se suben imágenes que se muestran en la sección de
        gráficos estáticos, para ello debe seleccionar la encuesta a la que
        pertenece el gráfico y llenar los demás campos.
      </p>
      <StaticGraphicForm />
    </div>
  );
}
