import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";

import QuestionCard from "@/components/QuestionCard";

export default function SurveyId() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`it/encuesta/${id}`, fetcher);

  if (error) return <div>No se pudo cargar la información de la encuesta</div>;
  if (!data) return <div>Cargando...</div>;

  // Modifica el JSON con las preguntas hijas dentro de las padre
  function handleData(survey) {
    let newCategories = [];

    survey.categorias.map((category) => {
      let questionParent = [];
      let positionParent = 0;

      let newCategory = {
        codigo_categoria: category.codigo_categoria,
        nombre_categoria: category.nombre_categoria,
        observacion_categoria: category.observacion_categoria,
        preguntas: [],
      };

      category.preguntas.map((question, index) => {
        if (question.codigo_pregunta_padre === null) {
          question.preguntas_hija = [];
          questionParent.push(question);
        } else {
          positionParent = binarySearch(
            question.codigo_pregunta_padre,
            questionParent
          );
          questionParent[positionParent].preguntas_hija.push(question);
        }
      });
      newCategory.preguntas = questionParent;
      newCategories.push(newCategory);
    });

    return newCategories;
  }

  // Algoritmo de busqueda Binaria
  function binarySearch(value, list) {
    let first = 0;
    let last = list.length - 1;
    let position = -1;
    let found = false;
    let middle;

    while (found === false && first <= last) {
      middle = Math.floor((first + last) / 2);
      if (list[middle].codigo_pregunta == value) {
        found = true;
        position = middle;
      } else if (list[middle].codigo_pregunta > value) {
        last = middle - 1;
      } else {
        first = middle + 1;
      }
    }
    return position;
  }

  return (
    <>
      <h3>
        {"-->"}Aqui va el nombre de la encuesta{"<---"}
      </h3>
      <p>{data.encuesta_observacion}</p>
      {data ? (
        <div>
          {/* categorias */}
          {handleData(data).map((category, index) => (
            <div key={index}>
              <h5>{category.nombre_categoria}</h5>

              {/* preguntas */}
              {category.preguntas.map((question, index) => (
                <div key={index}>
                  <QuestionCard question={question} index={index + 1} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
}
