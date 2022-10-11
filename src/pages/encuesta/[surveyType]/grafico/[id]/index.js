import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/LandingGraphic.module.css";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Graphic from "@/components/Graphic";
import Sidebar from "@/components/Sidebar";
import LoadingSelectedItem from "@/components/LoadingSelectedItem";
import ErrorSelectedItem from "@/components/ErrorSelectedItem";
import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";
import NotSelectedItem from "@/components/NotSelectedItem";

import ThemeCepra from "@/constants/theme";
import dayjs from "dayjs";
import { ChartData } from "@/lib/ChartData";
import ButtonDownloadGraphic from "@/components/ButtonDownloadGraphic";

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
  const [observation, setObservation] = useState(undefined);
  const [loadingdItem, setLoadingItem] = useState(false);
  const [errordItem, setErrorItem] = useState(false);
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

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

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleTypeChart = (event) => {
    setChartType(event.target.value);
  };

  const onClick = (e, item) => {
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
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.orgGraficoSector(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Sectores económicos");
          setChartType("bar");
          setLoadingItem(false);
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };
  //Datos de gráfico de organizaciones por provincias
  const orgGraficoCiudad = (id) => {
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.orgGraficoCiudad(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Muestra por ciudad");
          setChartType("bar");
          setLoadingItem(false);
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };
  //Datos de gráfico de contactos por nivel de decisión
  const contactoGraficoDes = (id) => {
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.contactoGraficoDes(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Perfil por nivel de decisión");
          setChartType("pie");
          setLoadingItem(false);
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };
  //Datos de gráfico de contactos por nivel de estudios
  const contactoGraficoEst = (id) => {
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.contactoGraficoEst(id)
      .then((response) => {
        if (response.data) {
          setChartInformation(response.data.data);
          setChartTitle("Perfil por nivel de estudios");
          setChartType("pie");
          setLoadingItem(false);
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
            name: "Energia 1",
            label: "Energia 1",
            onClick: () => console.log("Aquí va una función"),
          },
          "divider",
          {
            name: "Energia 2",
            label: "Energia 2",
            onClick: () => console.log("Aquí va una función"),
          },
        ];

      case "innovacion":
        return [
          "divider",
          {
            name: "grafico_i1",
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
        ];

      case "desempeno":
        return [
          "divider",
          {
            name: "desempeno 1",
            label: "desempeño 1",
            onClick: () => console.log("Aquí va una función"),
          },
          "divider",
          {
            name: "desempeno 2",
            label: "desempeño 2",
            onClick: () => console.log("Aquí va una función"),
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
              observation: nextQuestion.observacion_pregunta,
              id: sub_question.codigo_categoria,
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
            <div className={styles.container}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "9%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "12px 0 22px",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: {
                        desktop: "2em",
                        laptop: "1.5em",
                        tablet: "1.5em",
                        mobile: "1.5em",
                        min: "1.5em",
                      },
                    }}
                  >
                    <span>{data.encuesta_observacion}</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflow: "auto",
                    height: "fit-content",
                    maxHeight: {
                      desktop: "71vh",
                      laptop: "71vh",
                      tablet: "71vh",
                      mobile: "33vh",
                      min: "33vh",
                    },
                    marginTop: {
                      desktop: "0%",
                      laptop: "0%",
                      tablet: "0%",
                      mobile: "1%",
                      min: "1%",
                    },
                    width: {
                      desktop: "20%",
                      laptop: "25%",
                      tablet: "30%",
                      mobile: "100%",
                      min: "100%",
                    },
                  }}
                  className={styles.sidebar}
                >
                  <Sidebar items={sidebarItems} />
                </Box>
                <Box
                  sx={{
                    overflow: "none",
                    marginLeft: {
                      desktop: "1%",
                      laptop: "1%",
                      tablet: "1%",
                      mobile: "0%",
                      min: "0%",
                    },
                    marginTop: {
                      desktop: "0%",
                      laptop: "0%",
                      tablet: "0%",
                      mobile: "1%",
                      min: "1%",
                    },
                    height: {
                      desktop: "90%",
                      laptop: "90%",
                      tablet: "90%",
                      mobile: "69%",
                      min: "69%",
                    },
                    width: {
                      desktop: "79%",
                      laptop: "74%",
                      tablet: "69%",
                      mobile: "100%",
                      min: "100%",
                    },
                  }}
                >
                  {chartInformation ? (
                    <>
                      <Box
                        sx={{
                          marginTop: {
                            desktop: "0",
                            laptop: "0",
                            tablet: "0",
                            mobile: "2%",
                            min: "2%",
                          },
                          marginBottom: {
                            desktop: "0",
                            laptop: "0",
                            tablet: "0",
                            mobile: "1%",
                            min: "1%",
                          },
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: {
                            desktop: "row",
                            laptop: "row",
                            tablet: "row",
                            mobile: "column",
                            min: "column",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              desktop: "32%",
                              laptop: "32%",
                              tablet: "32%",
                              mobile: "100%",
                              min: "100%",
                            },
                            height: {
                              desktop: "100%",
                              laptop: "100%",
                              tablet: "100%",
                              mobile: "34%",
                              min: "34%",
                            },
                            margin: {
                              desktop: "0",
                              laptop: "0",
                              tablet: "0",
                              mobile: "6px 0",
                              min: "6px 0",
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <FormControl size="small">
                            <InputLabel id="demo-simple-select-label">
                              Tipo de gráfico
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={chartType}
                              label="Tipo de gráfico"
                              onChange={handleTypeChart}
                            >
                              <MenuItem value={"bar"}>Barras</MenuItem>
                              <MenuItem value={"line"}>Lineal</MenuItem>
                              <MenuItem value={"pie"}>Pastel</MenuItem>
                              <MenuItem value={"doughnut"}>Dona</MenuItem>
                              <MenuItem value={"radar"}>Radar</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            width: {
                              desktop: "32%",
                              laptop: "32%",
                              tablet: "32%",
                              mobile: "100%",
                              min: "100%",
                            },
                            height: {
                              desktop: "100%",
                              laptop: "100%",
                              tablet: "100%",
                              mobile: "33%",
                              min: "33%",
                            },
                            margin: {
                              desktop: "0",
                              laptop: "0",
                              tablet: "0",
                              mobile: "6px 0",
                              min: "6px 0",
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Fecha inicio"
                              inputFormat="MM/DD/YYYY"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField size="small" {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </Box>
                        <Box
                          sx={{
                            width: {
                              desktop: "32%",
                              laptop: "32%",
                              tablet: "32%",
                              mobile: "100%",
                              min: "100%",
                            },
                            height: {
                              desktop: "100%",
                              laptop: "100%",
                              tablet: "100%",
                              mobile: "33%",
                              min: "33%",
                            },
                            margin: {
                              desktop: "0",
                              laptop: "0",
                              tablet: "0",
                              mobile: "6px 0",
                              min: "6px 0",
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Fecha fin"
                              inputFormat="MM/DD/YYYY"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField size="small" {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Box>
                      <ButtonDownloadGraphic
                        title={chartTitle + " (" + chartType + ")"}
                      />
                      <Box
                        sx={{
                          height: "fit-content",
                        }}
                        className={styles.graphic}
                      >
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
                        <>
                          <LoadingSelectedItem />
                        </>
                      ) : (
                        <>
                          {errordItem ? (
                            <>
                              <ErrorSelectedItem />
                            </>
                          ) : (
                            <>
                              <NotSelectedItem
                                message={"Item no seleccionado"}
                              />
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </div>
          </ThemeProvider>
        </>
      );
    } else {
      return <LoadingInformation />;
    }
  }
}
