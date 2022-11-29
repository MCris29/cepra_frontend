import React from "react";
import styles from "@/styles/Survey.module.css";
import OptionCard from "@/components/OptionCard";

const QuestionCard = (props) => {
  return (
    <>
      <div className={styles.cardParent}>
        <p className="paragraph">
          <strong>{props.index + ". "}</strong>
          {props.question.nombre_pregunta}
        </p>
        {
          /* Si la pregunta tiene opciones */
          props.question.grupo_opciones ? (
            <OptionCard
              option={props.question.grupo_opciones}
              observation={props.question.observacion_pregunta}
            />
          ) : (
            <span></span>
          )
        }
      </div>
      {
        /* Si tiene preguntas hijas */
        props.question.preguntas_hija ? (
          props.question.preguntas_hija.map((questionChild, index) => (
            <div className={styles.cardChild} key={index}>
              <p className="paragraph">
                <strong>{props.index + "." + (index + 1) + " "}</strong>
                {questionChild.nombre_pregunta}
              </p>
              {questionChild.grupo_opciones ? (
                <OptionCard option={questionChild.grupo_opciones} />
              ) : (
                <span></span>
              )}
            </div>
          ))
        ) : (
          <span></span>
        )
      }
    </>
  );
};

export default QuestionCard;
