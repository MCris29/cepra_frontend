import React from "react";
import styles from "@/styles/Survey.module.css";

const OptionCard = (props) => {
  return (
    <div className={styles.cardOption}>
      <h5 style={{ margin: "6px 0" }}>{props.option.itgop_nombre}</h5>
      {props.option.opciones ? (
        <div className={styles.options}>
          {props.option.opciones.map((option, index) => (
            <div key={index}>{"• " + option.itopc_nombre}</div>
          ))}
        </div>
      ) : (
        <span></span>
      )}
      {props.observation ? (
        <div className={styles.observation}>
          <p className="paragraph">
            <strong>Observación:</strong>
          </p>
          <p className="paragraph">{props.observation}</p>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default OptionCard;
