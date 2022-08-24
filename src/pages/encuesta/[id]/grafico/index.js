import React, { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";
import styles from "@/styles/Graphic2.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Graphic from "@/components/Graphic";
import Typography from "@mui/material/Typography";
import NotSelectedItem from "@/components/NotSelectedItem";
import { ChartData } from "@/lib/ChartData";
import LoadingSelectedItem from "@/components/LoadingSelectedItem";
import ErrorSelectedItem from "@/components/ErrorSelectedItem";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function SurveyGraphic() {
  const router = useRouter();
  const surveyId = router.query.id;
  const { data, error } = useSWR(`it/encuesta/${surveyId}`, fetcher, {
    shouldRetryOnError: false,
  });
  const [chartInformation, setChartInformation] = React.useState(undefined);
  const [titleItem, setTitleItem] = useState("No selected");
  const [loadingdItem, setLoadingItem] = useState(false);
  const [errordItem, setErrorItem] = useState(false);

  const onClick = (e, item) => {
    setLoadingItem(true);
    setChartInformation(undefined);
    ChartData.getGraphic3ById(item.id)
      .then((response) => {
        if (response.data) {
          response.data.data.title = item.label;
          setChartInformation(response.data.data);
          setTitleItem(item.label);
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
            <div className={styles.containerSurveyGraphic}>
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
                    overflow: "auto",
                    height: {
                      desktop: "100%",
                      laptop: "100%",
                      tablet: "100%",
                      mobile: "49%",
                    },
                    width: {
                      desktop: "20%",
                      laptop: "25%",
                      tablet: "30%",
                      mobile: "100%",
                    },
                  }}
                  className={styles.containerSidebar}
                >
                  <Sidebar items={sidebarItems} />
                </Box>
                <Box
                  sx={{
                    overflow: "auto",
                    marginLeft: {
                      desktop: "1%",
                      laptop: "1%",
                      tablet: "1%",
                      mobile: "0%",
                    },
                    marginTop: {
                      desktop: "0%",
                      laptop: "0%",
                      tablet: "0%",
                      mobile: "1%",
                    },
                    height: {
                      desktop: "100%",
                      laptop: "100%",
                      tablet: "100%",
                      mobile: "50%",
                    },
                    width: {
                      desktop: "79%",
                      laptop: "74%",
                      tablet: "69%",
                      mobile: "100%",
                    },
                  }}
                  className={styles.containerGraphic}
                >
                  {chartInformation ? (
                    <>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          padding: "16px",
                          fontSize: {
                            desktop: "2em",
                            laptop: "1.5em",
                            tablet: "1.17em",
                            mobile: "1em",
                          },
                        }}
                      >
                        <span>{titleItem}</span>
                      </Typography>
                      <Graphic data={chartInformation} />
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
