import React from "react";
import styles from "@/styles/Survey.module.css";

const OptionCard = (props) => {
  return (
    <>
      <h5>{props.option.itgop_nombre}</h5>
      {props.option.opciones ? (
        <div className={styles.cardOption}>
          {props.option.opciones.map((option, index) => (
            <div key={index}>{"• " + option.itopc_nombre}</div>
          ))}
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default OptionCard;
