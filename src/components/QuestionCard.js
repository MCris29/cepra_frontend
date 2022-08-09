import React from "react";
import styles from "@/styles/Survey.module.css";
import OptionCard from "@/components/OptionCard";

const QuestionCard = (props) => {
  return (
    <>
      <div className={styles.cardParent}>
        <div>{props.index + ". " + props.question.nombre_pregunta}</div>
        {
          /* Si la pregunta tiene opciones */
          props.question.grupo_opciones ? (
            <OptionCard option={props.question.grupo_opciones} />
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
              <div>
                {props.index +
                  "." +
                  (index + 1) +
                  " " +
                  questionChild.nombre_pregunta}
              </div>
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
