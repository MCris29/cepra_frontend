import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/LandingGraphic.module.css";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import { Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GraphicsList from "@/components/GraphicsList.js";
import Graphic from "@/components/Graphic";
import Sidebar from "@/components/Sidebar";
import LoadingSelectedItem from "@/components/LoadingSelectedItem";
import ErrorSelectedItem from "@/components/ErrorSelectedItem";
import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";
import NotSelectedItem from "@/components/NotSelectedItem";

import ThemeCepra from "@/constants/theme";
// import dayjs from "dayjs";
import { ChartData } from "@/lib/ChartData";
import ButtonDownloadGraphic from "@/components/ButtonDownloadGraphic";
import FilterIndicators from "@/components/FilterIndicators";
import FilterTypeChart from "@/components/FilterTyChart";
import FilterDate from "@/components/FilterDate";

const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints,
});

export default function LandingGraphic() {
  const router = useRouter();

  const surveyId = router.query.id;
  const surveyType = router.query.surveyType;

  const { data, error } = useSWR(`it/encuesta/${surveyId}`, fetcher, {
    shouldRetryOnError: false,
  });

  const [chartType, setChartType] = useState("bar");
  const [chartInformation, setChartInformation] = useState(undefined);
  const [chartTitle, setChartTitle] = useState(undefined);
  const [observation, setObservation] = useState("");
  const [loadingdItem, setLoadingItem] = useState(false);
  const [errordItem, setErrorItem] = useState(false);
  // const [dateInit, setDateInit] = useState(dayjs("2014-08-18T21:11:54"));
  // const [dateEnd, setDateEnd] = useState(dayjs("2014-08-18T21:11:54"));
  const [dashboard, setDashboard] = useState(false);

  // Sección de dashboard de imagenes
  const handleOpenDashboard = () => {
    setDashboard(true);
  };
  const handleCloseDashboard = () => {
    setDashboard(false);
  };

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

  // const handleDateInit = (date) => {
  //   setDateInit(date);
  // };
  // const handleDateEnd = (date) => {
  //   setDateEnd(date);
  // };
  const handleTypeChart = (event) => {
    setChartType(event.target.value);
  };

  const onClick = (e, item) => {
    handleCloseDashboard();
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.getGraphic3ById(item.id)
      .then((response) => {
        if (response.data) {
          response.data.data.title = item.label;
          setChartInformation(response.data.data);
          setChartTitle(item.label);
          setChartType("bar");
          setLoadingItem(false);
          setObservation(item.observation);
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };

  //Datos de gráfico de organizaciones por sectores
  const orgGraficoSector = (id) => {
    handleCloseDashboard();
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.orgGraficoSector(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Sectores económicos");
          setChartType("bar");
          setLoadingItem(false);
          setObservation("");
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };
  //Datos de gráfico de organizaciones por provincias
  const orgGraficoCiudad = (id) => {
    handleCloseDashboard();
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.orgGraficoCiudad(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Muestra por ciudad");
          setChartType("bar");
          setLoadingItem(false);
          setObservation("");
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };
  //Datos de gráfico de contactos por nivel de decisión
  const contactoGraficoDes = (id) => {
    handleCloseDashboard();
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.contactoGraficoDes(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Perfil por nivel de decisión");
          setChartType("pie");
          setLoadingItem(false);
          setObservation("");
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };
  //Datos de gráfico de contactos por nivel de estudios
  const contactoGraficoEst = (id) => {
    handleCloseDashboard();
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.contactoGraficoEst(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Perfil por nivel de estudios");
          setChartType("pie");
          setLoadingItem(false);
          setObservation("");
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };

  //Esta función arma el menu de gráficos estáticos dependiendo del tipo de encuesta
  const handleItems = () => {
    switch (surveyType) {
      case "energia":
        return [
          "divider",
          {
            name: "sectores_economicos",
            label: "Sectores económicos",
            onClick: () => orgGraficoSector(surveyId),
          },
          "divider",
          {
            name: "Lista de gráficos",
            label: "Lista de gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];

      case "innovacion":
        return [
          "divider",
          {
            name: "sectores_economicos",
            label: "Sectores económicos",
            onClick: () => orgGraficoSector(surveyId),
          },
          "divider",
          {
            label: "Muestra por ciudad",
            name: "grafico_i2",
            onClick: () => orgGraficoCiudad(surveyId),
          },
          "divider",
          {
            name: "grafico_i3",
            label: "Perfil de encuestados por nivel de decisión",
            onClick: () => contactoGraficoDes(surveyId),
          },
          "divider",
          {
            name: "grafico_i4",
            label: "Perfil de encuestados por nivel de estudios",
            onClick: () => contactoGraficoEst(surveyId),
          },
          "divider",
          {
            name: "Lista de gráficos",
            label: "Lista de gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];

      case "desempeno":
        return [
          "divider",
          {
            name: "Lista de gráficos",
            label: "Lista de gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];
    }
  };

  if (error && surveyId) {
    return <ErrorInformation />;
  }
  if (data) {
    if (data.id_encuesta && data.encuesta_observacion && data.categorias) {
      let surveyCategoryList = handleData(data);
      let categoryList = [];

      for (let index = 0; index < surveyCategoryList.length; index++) {
        let questionList = [];
        categoryList.push("divider");
        surveyCategoryList[index].preguntas.forEach((nextQuestion) => {
          let sub_questions = [];
          // Añade las preguntas hijas dentro de un array en el pregunta padre
          nextQuestion.preguntas_hija.map((sub_question) => {
            sub_questions.push("divider");
            sub_questions.push({
              name: sub_question.nombre_pregunta,
              label: sub_question.nombre_pregunta,
              observation: sub_question.observacion_pregunta,
              id: sub_question.encuesta_pregunta_codigo,
              onClick,
            });
          });

          // Añade las preguntas padre
          let question = {
            name: nextQuestion.nombre_pregunta,
            label: nextQuestion.nombre_pregunta,
            observation: nextQuestion.observacion_pregunta,
            id: nextQuestion.encuesta_pregunta_codigo,
            items: sub_questions,
          };

          // Verifica si no tiene preguntas hijas para añadir la función onClick
          if (sub_questions.length === 0) {
            question = { ...question, onClick };
          }
          questionList.push("divider");
          questionList.push(question);
        });

        let category = {
          name: surveyCategoryList[index].nombre_categoria,
          label: surveyCategoryList[index].nombre_categoria,
          items: questionList,
        };
        categoryList.push(category);
      }

      let sidebarItems = [];
      sidebarItems.push({
        name: "Gráficos estáticos",
        label: "Gráficos estáticos",
        items: handleItems(),
      });
      sidebarItems.push("divider");
      sidebarItems.push({
        name: "Gráficos dinámicos",
        label: "Gráficos dinámicos",
        items: categoryList,
      });

      return (
        <>
          <ThemeProvider theme={theme}>
            <Box className={styles.container}>
              <Box className={styles.title_container}>
                <Typography>{data.encuesta_observacion}</Typography>
              </Box>
              <Box className={styles.sidebar}>
                <Sidebar items={sidebarItems} />
              </Box>
              <Box className={styles.dashboard}>
                {dashboard ? (
                  <GraphicsList id={surveyId} />
                ) : (
                  <div>
                    {chartInformation ? (
                      <>
                        <Box className={styles.filter}>
                          <div className={styles.filter_section}>
                            <FilterTypeChart
                              chartType={chartType}
                              handleTypeChart={handleTypeChart}
                            />
                            <FilterIndicators />
                            <FilterDate
                              handleDateInit={() => {}}
                              handleDateEnd={() => {}}
                            />
                          </div>
                          <div className={styles.filter_section}>
                            <ButtonDownloadGraphic
                              title={chartTitle + " (" + chartType + ")"}
                            />
                          </div>
                        </Box>

                        <Box className={styles.graphic}>
                          <Graphic
                            type={chartType}
                            title={chartTitle}
                            observation={observation}
                            data={chartInformation}
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        {loadingdItem ? (
                          <LoadingSelectedItem />
                        ) : (
                          <>
                            {errordItem ? (
                              <ErrorSelectedItem />
                            ) : (
                              <NotSelectedItem
                                message={"Item no seleccionado"}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </Box>
            </Box>
          </ThemeProvider>
        </>
      );
    } else {
      return <LoadingInformation />;
    }
  }
}
