import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";
import styles from "@/styles/LandingGraphic.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Graphic from "@/components/Graphic";
import Typography from "@mui/material/Typography";
import NotSelectedItem from "@/components/NotSelectedItem";
import { ChartData } from "@/lib/ChartData";
import LoadingSelectedItem from "@/components/LoadingSelectedItem";
import ErrorSelectedItem from "@/components/ErrorSelectedItem";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import ThemeCepra from "@/constants/theme";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints
});

export default function LandingGraphic() {
  const router = useRouter();
  const surveyId = router.query.id;
  const { data, error } = useSWR(`it/encuesta/${surveyId}`, fetcher, {
    shouldRetryOnError: false,
  });
  const [chartType, setChartType] = useState("bar");
  const [chartInformation, setChartInformation] = useState(undefined);
  const [chartTitle, setChartTitle] = useState(undefined);
  const [loadingdItem, setLoadingItem] = useState(false);
  const [errordItem, setErrorItem] = useState(false);
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

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
          setChartType("bar")
          setLoadingItem(false);
        }
      })
      .catch((error) => {
        setLoadingItem(false);
        setErrorItem(true);
      });
  };

  if (error && surveyId) {
    return <ErrorInformation />;
  }
  if (data) {
    if (data.id_encuesta && data.encuesta_observacion && data.categorias) {
      let surveyCategoryList = data.categorias;
      let categoryList = [];
      for (let index = 0; index < surveyCategoryList.length; index++) {
        let questionList = [];
        categoryList.push("divider");
        surveyCategoryList[index].preguntas.forEach((nextQuestion) => {
          let question = {
            name: nextQuestion.nombre_pregunta,
            label: nextQuestion.nombre_pregunta,
            id: nextQuestion.codigo_pregunta,
            onClick,
          };
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
        items: [
          "divider",
          {
            name: "Gráfico 1",
            label: "Gráfico 1",
          },
          "divider",
          {
            name: "Gráfico 2",
            label: "Gráfico 2",
          },
        ],
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
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
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
                          min: "1.5em"
                        },
                      }}
                  >
                    <span>{data.encuesta_observacion}</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflow: "auto",
                    height: {
                      desktop: "90%",
                      laptop: "90%",
                      tablet: "90%",
                      mobile: "19%",
                        min: "19%"
                    },
                    marginTop: {
                      desktop: "0%",
                      laptop: "0%",
                      tablet: "0%",
                      mobile: "1%",
                      min: "1%"
                    },
                    width: {
                      desktop: "20%",
                      laptop: "25%",
                      tablet: "30%",
                      mobile: "100%",
                        min: "100%"
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
                        min: "0%"
                    },
                    marginTop: {
                      desktop: "0%",
                      laptop: "0%",
                      tablet: "0%",
                      mobile: "1%",
                        min: "1%"
                    },
                    height: {
                      desktop: "90%",
                      laptop: "90%",
                      tablet: "90%",
                      mobile: "69%",
                        min: "69%"
                    },
                    width: {
                      desktop: "79%",
                      laptop: "74%",
                      tablet: "69%",
                      mobile: "100%",
                        min: "100%"
                    },
                  }}
                >
                    {chartInformation ? (
                      <>
                        <Box
                            sx={{
                              height: {desktop: "10%", laptop: "10%", tablet: "10%", mobile: "34%", min: "34%"},
                              marginTop: {desktop: "0%", laptop: "0%", tablet: "0%", mobile: "2%", min: "2%"},
                              marginBottom: {desktop: "0%", laptop: "0%", tablet: "0%", mobile: "1%", min: "1%"},
                              width: "100%",
                              display: "flex",
                              flexDirection: {desktop: "row", laptop: "row", tablet: "row", mobile: "column", min: "column"}                            }}
                        >
                          <Box
                              sx={{
                                width: {desktop: "32%", laptop: "32%", tablet: "32%", mobile: "100%", min: "100%"},
                                height: {desktop: "100%", laptop: "100%", tablet: "100%", mobile: "34%", min: "34%"},
                                mr: {desktop: "2%", laptop: "2%", tablet: "2%", mobile: "0%", min: "0%"},
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',}}
                          >
                            <FormControl size="small" >
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
                                width: {desktop: "32%", laptop: "32%", tablet: "32%", mobile: "100%", min: "100%"},
                                height: {desktop: "100%", laptop: "100%", tablet: "100%", mobile: "33%", min: "33%"},
                                mr: {desktop: "2%", laptop: "2%", tablet: "2%", mobile: "0%", min: "0%"},
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',}}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                  label="Fecha inicio"
                                  inputFormat="MM/DD/YYYY"
                                  value={value}
                                  onChange={handleChange}
                                  renderInput={(params) => <TextField size="small" {...params} />}
                              />
                            </LocalizationProvider>
                          </Box>
                          <Box
                              sx={{
                                width: {desktop: "32%", laptop: "32%", tablet: "32%", mobile: "100%", min: "100%"},
                                height: {desktop: "100%", laptop: "100%", tablet: "100%", mobile: "33%", min: "33%"},
                                mr: {desktop: "2%", laptop: "2%", tablet: "2%", mobile: "0%", min: "0%"},
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',}}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                  label="Fecha fin"
                                  inputFormat="MM/DD/YYYY"
                                  value={value}
                                  onChange={handleChange}
                                  renderInput={(params) => <TextField size="small" {...params} />}
                              />
                            </LocalizationProvider>
                          </Box>
                        </Box>
                        <Box
                            sx={{
                              overflow: "auto",
                              height: {desktop: "90%", laptop: "90%", tablet: "90%", mobile: "62%", min: "62%"},
                              width: "100%",
                            }}
                            className={styles.graphic}
                        >
                          <Graphic type={chartType} title={chartTitle} data={chartInformation} />
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
