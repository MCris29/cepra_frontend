import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/LandingGraphic.module.css";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import { Typography, Box, Skeleton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import dayjs from "dayjs";

import GraphicsList from "@/components/GraphicsList.js";
import Graphic from "@/components/Graphic";
import Sidebar from "@/components/Sidebar";
import FilterIndicators from "@/components/FilterIndicators";
import FilterTypeChart from "@/components/FilterTyChart";
import FilterDate from "@/components/FilterDate";
import ButtonDownloadGraphic from "@/components/ButtonDownloadGraphic";
import LoadingSelectedItem from "@/components/LoadingSelectedItem";
import ErrorSelectedItem from "@/components/ErrorSelectedItem";
import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";
import NotSelectedItem from "@/components/NotSelectedItem";

import ThemeCepra from "@/constants/theme";
import { filters } from "@/lib/filterGraphic";
import { ChartData } from "@/lib/ChartData";
import FilterContinuosGraphic from "@/components/FilterCotinuosGraphic";

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
  const [itemId, setItemId] = useState("");
  const [loadingdItem, setLoadingItem] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [continuosFilter, setContinuosFilter] = useState("sector");
  const [errordItem, setErrorItem] = useState(false);
  // const [dateInit, setDateInit] = useState(dayjs("2014-08-18T21:11:54"));
  // const [dateEnd, setDateEnd] = useState(dayjs("2014-08-18T21:11:54"));
  const [dashboard, setDashboard] = useState(false);
  const [showStaticGraphic, setShowStaticGraphic] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  if (error && surveyId) return <ErrorInformation />;
  if (!data) return <LoadingInformation />;

  // Abre y cierra el Dashboard de imagenes
  const handleOpenDashboard = () => {
    setDashboard(true);
  };
  const handleCloseDashboard = () => {
    setDashboard(false);
  };

  // Abre y cierra los gráficos estáticos
  const handleOpenStaticGraphic = () => {
    setShowStaticGraphic(true);
  };
  const handleCloseStaticGraphic = () => {
    setShowStaticGraphic(false);
  };

  // Arma el SideBar con preguntas padre e hija
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

  // Datos de gráficos dinámicos
  const onClick = (e, item) => {
    handleCloseDashboard();
    handleCloseStaticGraphic();
    setLoadingItem(true);
    setChartInformation(undefined);
    setItemId(item.id);

    // Diferencio el tipo de dato si es continuo para usar el método de gráficos continuos
    if (
      item.data_type === "continuo" ||
      item.data_type === "continua" ||
      item.data_type === "variable continua"
    ) {
      ChartData.graficoContinuo(surveyId, item.id, "sector")
        .then((response) => {
          if (response.data) {
            response.data.data.title = item.label;
            setChartInformation(response.data.data);
            setChartTitle(item.name);
            setChartType("boxplot");
            setLoadingItem(false);
            setObservation(item.observation);
          }
        })
        .catch((error) => {
          setLoadingItem(false);
          setErrorItem(true);
        });
    } else {
      ChartData.getGraphic3ById(item.id)
        .then((response) => {
          if (response.data) {
            response.data.data.title = item.label;
            setChartInformation(response.data.data);
            setChartTitle(item.name);
            setChartType("bar");
            setLoadingItem(false);
            setObservation(item.observation);
          }
        })
        .catch((error) => {
          setLoadingItem(false);
          setErrorItem(true);
        });
    }
  };
  //Datos de gráfico de organizaciones por sectores
  const orgGraficoSector = (id) => {
    handleCloseDashboard();
    handleOpenStaticGraphic();
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
    handleOpenStaticGraphic();
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
    handleOpenStaticGraphic();
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
    handleOpenStaticGraphic();
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

  // ******** Filtros *********
  // Filtro de Fecha
  // const handleDateInit = (date) => {
  //   setDateInit(date);
  // };
  // const handleDateEnd = (date) => {
  //   setDateEnd(date);
  // };

  // Filtro de tipo de gráfico
  const handleTypeChart = (event) => {
    setChartType(event.target.value);
  };
  // Filtro de indicadores
  const handleFilter = (filter, fil_data) => {
    let questionId = itemId;

    handleCloseDashboard();
    setLoadingFilter(true);
    switch (filter) {
      case "sector":
        filters
          .getBySector(questionId, fil_data)
          .then((response) => {
            setChartInformation(response.data.data);
            setLoadingFilter(false);
          })
          .catch((error) => {
            console.log(error);
            setLoadingFilter(false);
            setErrorItem(true);
          });
        break;
      case "subsector":
        filters
          .getBySubsector(questionId, fil_data)
          .then((response) => {
            setChartInformation(response.data.data);
            setLoadingFilter(false);
          })
          .catch((error) => {
            console.log(error);
            setLoadingFilter(false);
            setErrorItem(true);
          });
        break;
      case "ciudad":
        filters
          .getByCity(questionId, fil_data)
          .then((response) => {
            setChartInformation(response.data.data);
            setLoadingFilter(false);
          })
          .catch((error) => {
            console.log(error);
            setLoadingFilter(false);
            setErrorItem(true);
          });
        break;
      case "all":
        ChartData.getGraphic3ById(questionId)
          .then((response) => {
            if (response.data) {
              setChartInformation(response.data.data);
              setLoadingFilter(false);
            }
          })
          .catch((error) => {
            setLoadingFilter(false);
            setErrorItem(true);
          });
        break;
    }
  };
  // Filtro de indicadores continuos
  const handleFilterContinous = (filter) => {
    handleCloseDashboard();
    setLoadingItem(true);
    setChartInformation(null);
    setContinuosFilter(filter);

    ChartData.graficoContinuo(surveyId, itemId, filter)
      .then((response) => {
        setChartInformation(response.data.data);
        setChartTitle(item.name);
        setChartType("boxplot");
        setLoadingItem(false);
        setObservation(item.observation);
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };

  //Arma el menú de gráficos estáticos dependiendo del tipo de encuesta
  const handleItems = () => {
    switch (surveyType) {
      case "energia":
        return [
          {
            name: "sectores_economicos",
            label: "Sectores económicos",
            onClick: () => orgGraficoSector(surveyId),
          },

          {
            name: "Lista de gráficos",
            label: "Más Gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];

      case "innovacion":
        return [
          {
            name: "sectores_economicos",
            label: "Sectores económicos",
            onClick: () => orgGraficoSector(surveyId),
          },

          {
            label: "Muestra por ciudad",
            name: "grafico_i2",
            onClick: () => orgGraficoCiudad(surveyId),
          },
          {
            name: "grafico_i3",
            label: "Perfil de encuestados por nivel de decisión",
            onClick: () => contactoGraficoDes(surveyId),
          },
          {
            name: "grafico_i4",
            label: "Perfil de encuestados por nivel de estudios",
            onClick: () => contactoGraficoEst(surveyId),
          },
          {
            name: "Lista de gráficos",
            label: "Más Gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];

      case "desempeno-colaborativo":
        return [
          {
            name: "Lista de gráficos",
            label: "Más Gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];

      default:
        return [
          {
            name: "sectores_economicos",
            label: "Sectores económicos",
            onClick: () => orgGraficoSector(surveyId),
          },

          {
            label: "Muestra por ciudad",
            name: "grafico_i2",
            onClick: () => orgGraficoCiudad(surveyId),
          },

          {
            name: "grafico_i3",
            label: "Perfil de encuestados por nivel de decisión",
            onClick: () => contactoGraficoDes(surveyId),
          },

          {
            name: "grafico_i4",
            label: "Perfil de encuestados por nivel de estudios",
            onClick: () => contactoGraficoEst(surveyId),
          },

          {
            name: "Lista de gráficos",
            label: "Más Gráficos",
            onClick: () => handleOpenDashboard(),
          },
        ];
    }
  };

  if (data) {
    if (data.id_encuesta && data.encuesta_observacion && data.categorias) {
      let surveyCategoryList = handleData(data);
      let categoryList = [];

      for (let index = 0; index < surveyCategoryList.length; index++) {
        let questionList = [];
        // categoryList.push("divider");
        surveyCategoryList[index].preguntas.forEach((nextQuestion) => {
          let sub_questions = [];
          // Añade las preguntas hijas dentro de un array en el pregunta padre
          nextQuestion.preguntas_hija.map((sub_question) => {
            // sub_questions.push("divider");
            sub_questions.push({
              name: sub_question.nombre_pregunta,
              label: sub_question.titulo_pregunta,
              observation: sub_question.observacion_pregunta,
              data_type: sub_question.tipo_dato,
              id: sub_question.encuesta_pregunta_codigo,
              onClick,
            });
          });
          // Añade las preguntas padre
          let question = {
            name: nextQuestion.nombre_pregunta,
            label: nextQuestion.titulo_pregunta,
            observation: nextQuestion.observacion_pregunta,
            data_type: nextQuestion.tipo_dato,
            id: nextQuestion.encuesta_pregunta_codigo,
            items: sub_questions,
          };
          // Verifica si no tiene preguntas hijas para añadir la función onClick
          if (sub_questions.length === 0) {
            question = { ...question, onClick };
          }
          // questionList.push("divider");
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
      // sidebarItems.push("divider");
      sidebarItems.push({
        name: "Gráficos dinámicos",
        label: "Gráficos dinámicos",
        items: categoryList,
      });

      return (
        <>
          <ThemeProvider theme={theme}>
            <Box className={styles.container}>
              <Box className={styles.title_container_mobile}>
                <h4 className="title" style={{ margin: "0 0 32px 0" }}>
                  {data.encuesta_observacion}
                </h4>
              </Box>
              <div className={styles.mobile}>
                <p
                  className="paragraph"
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                >
                  Menú
                </p>
                <p
                  className="paragraph"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  Filtro
                </p>
              </div>
              <Box className={styles.sidebar}>
                <div className={styles.container_mobile}>
                  {showMenu ? (
                    <>
                      <Sidebar items={sidebarItems} />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.container_desktop}>
                  <Sidebar items={sidebarItems} />
                </div>
              </Box>

              <Box className={styles.dashboard}>
                <Box className={styles.title_container_desktop}>
                  <h4 className="title" style={{ margin: "0 0 32px 0" }}>
                    {data.encuesta_observacion}
                  </h4>
                </Box>
                {/* Se muestra del dashboard de imagenes */}
                {dashboard ? (
                  <GraphicsList id={surveyId} />
                ) : (
                  <>
                    {chartInformation ? (
                      <>
                        {showStaticGraphic ? (
                          <>
                            {/* Se muestran los gráficos estáticos sin filtro */}
                            <div className={styles.container_mobile}>
                              {showFilter ? (
                                <>
                                  <Box className={styles.filter}>
                                    <div className={styles.filter_section}>
                                      <FilterTypeChart
                                        chartType={chartType}
                                        handleTypeChart={handleTypeChart}
                                      />
                                    </div>
                                    <div className={styles.filter_section}>
                                      <ButtonDownloadGraphic
                                        title={
                                          chartTitle + " (" + chartType + ")"
                                        }
                                      />
                                    </div>
                                  </Box>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className={styles.container_desktop}>
                              <Box className={styles.filter}>
                                <div className={styles.filter_section}>
                                  <FilterTypeChart
                                    chartType={chartType}
                                    handleTypeChart={handleTypeChart}
                                  />
                                </div>
                                <div className={styles.filter_section}>
                                  <ButtonDownloadGraphic
                                    title={chartTitle + " (" + chartType + ")"}
                                  />
                                </div>
                              </Box>
                            </div>

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
                            {/* Filtro de gráficos dínamicos discretos y continuos */}
                            {chartType === "boxplot" ||
                            chartType === "histogram" ? (
                              <>
                                <div className={styles.container_mobile}>
                                  {showFilter ? (
                                    <>
                                      <Box className={styles.filter}>
                                        {/* Filtro de datos continuos */}
                                        <div className={styles.filter_section}>
                                          <FilterContinuosGraphic
                                            continuosFilter={continuosFilter}
                                            chartType={chartType}
                                            handleTypeChart={handleTypeChart}
                                            handleFilterContinous={
                                              handleFilterContinous
                                            }
                                          />
                                        </div>
                                      </Box>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className={styles.container_desktop}>
                                  <Box className={styles.filter}>
                                    {/* Filtro de datos continuos */}
                                    <div className={styles.filter_section}>
                                      <FilterContinuosGraphic
                                        continuosFilter={continuosFilter}
                                        chartType={chartType}
                                        handleTypeChart={handleTypeChart}
                                        handleFilterContinous={
                                          handleFilterContinous
                                        }
                                      />
                                    </div>
                                  </Box>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={styles.container_mobile}>
                                  {showFilter ? (
                                    <>
                                      <Box className={styles.filter}>
                                        {/* Filtro de datos discretos */}
                                        <div className={styles.filter_section}>
                                          <FilterTypeChart
                                            chartType={chartType}
                                            handleTypeChart={handleTypeChart}
                                          />
                                          <FilterIndicators
                                            surveyId={surveyId}
                                            handleFilter={handleFilter}
                                          />
                                          <FilterDate
                                            handleDateInit={() => {}}
                                            handleDateEnd={() => {}}
                                          />
                                        </div>
                                        <div className={styles.filter_section}>
                                          <ButtonDownloadGraphic
                                            title={
                                              chartTitle +
                                              " (" +
                                              chartType +
                                              ")"
                                            }
                                          />
                                        </div>
                                      </Box>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className={styles.container_desktop}>
                                  <Box className={styles.filter}>
                                    {/* Filtro de datos discretos */}
                                    <div className={styles.filter_section}>
                                      <FilterTypeChart
                                        chartType={chartType}
                                        handleTypeChart={handleTypeChart}
                                      />
                                      <FilterIndicators
                                        surveyId={surveyId}
                                        handleFilter={handleFilter}
                                      />
                                      <FilterDate
                                        handleDateInit={() => {}}
                                        handleDateEnd={() => {}}
                                      />
                                    </div>
                                    <div className={styles.filter_section}>
                                      <ButtonDownloadGraphic
                                        title={
                                          chartTitle + " (" + chartType + ")"
                                        }
                                      />
                                    </div>
                                  </Box>
                                </div>
                              </>
                            )}

                            {loadingFilter ? (
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                sx={{ bgcolor: "#c4c4c4" }}
                              >
                                <div style={{ paddingTop: "48%" }} />
                              </Skeleton>
                            ) : (
                              <>
                                <Box className={styles.graphic}>
                                  <Graphic
                                    type={chartType}
                                    title={chartTitle}
                                    observation={observation}
                                    data={chartInformation}
                                  />
                                </Box>
                              </>
                            )}
                          </>
                        )}
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
                                message={"Seleccione un indicador"}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </ThemeProvider>
        </>
      );
    }
  }
}
