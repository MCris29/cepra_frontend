import React from "react";
import styles from "@/styles/Survey.module.css";
import StaticGraphicForm from "@/components/StaticGraphicForm";

export default function StaticGraphics() {
  return (
    <div className={styles.forms_container}>
      <h4>Graficos estáticos</h4>
      <p>
        En esta sección se suben imágenes que se muestran en la sección de
        gráficos estáticos.
      </p>
      <StaticGraphicForm />
    </div>
  );
}
