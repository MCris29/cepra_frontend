import React, { useState } from "react";
import styles from "@/styles/LandingSurvey.module.css";
import Link from "next/link";
import {
  Box,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

import RoutesCepra from "@/constants/routes";
import ThemeCepra from "@/constants/theme";
import LoadingInformation from "@/components/LoadingInformation";
import ErrorInformation from "@/components/ErrorInformation";

const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints,
});

function handleDate(dateTime) {
  if (dateTime !== null) {
    var formatDate = new Date(dateTime);
    return formatDate.toLocaleDateString("es-ES");
  } else {
    return "N/A";
  }
}

export default function LandingSurvey() {
  const { data, error } = useSWR("it/datosGrafico2/2", fetcher, {
    shouldRetryOnError: false,
  });

  const [typeSurvey, setTypeSurvey] = useState("Selecciona una encuesta");
  const [surveyList, setSurveyList] = useState([]);

  const columns = [
    {
      field: "itenc_fecha_vigente",
      headerName: "Fecha",
      type: "dateTime",
      width: 125,
      renderCell: (data) => {
        return handleDate(data.row.itenc_fecha_vigente);
      },
    },
    // { field: "itenc_observacion", headerName: "Encuesta", width: 650,  },
    {
      field: "itenc_observacion",
      headerName: "Encuestas",
      width: 800,
      renderCell: (data) => [
        <Link
          key={data.row.itenc_codigo}
          href={`${RoutesCepra.OBS_SURVEY}/${handleTypeSurvey(typeSurvey)}/${
            data.row.itenc_codigo
          }`}
        >
          <div
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p className="paragraph">{data.row.itenc_observacion}</p>
          </div>
        </Link>,
      ],
    },
  ];

  const handleTypeSurvey = (typeSurvey) => {
    return typeSurvey
      .toLowerCase()
      .replace(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleChangeTypeSurvey = (event) => {
    const newTypeSurvey = event.target.value;
    setTypeSurvey(newTypeSurvey);
    const newSurvey = data.data.find(
      (nextTypeSurvey) => nextTypeSurvey.tipoEncuesta === newTypeSurvey
    );
    setSurveyList(newSurvey.encuestas);
  };

  if (error) {
    return <ErrorInformation />;
  }
  if (data) {
    if (data.data) {
      let typeSurveyList = [];
      data.data.map((nextTypeSurvey) => {
        nextTypeSurvey.encuestas.map((nextSurvey, index) => {
          nextSurvey.id = index + 1;
        });
        typeSurveyList.push(nextTypeSurvey.tipoEncuesta);
      });
      return (
        <>
          <ThemeProvider theme={theme}>
            <div className={styles.container}>
              <div className={styles.main}>
                <h4 className="title">Resultados</h4>
                <Box
                  sx={{
                    width: {
                      desktop: "40%",
                      laptop: "50%",
                      tablet: "60%",
                      mobile: "100%",
                      min: "100%",
                    },
                  }}
                >
                  <FormControl size="small" style={{ width: "100%" }}>
                    <InputLabel id="type-survey-select-label">
                      Tipo de encuesta
                    </InputLabel>
                    <Select
                      id="type-survey-select-label"
                      labelId="type-survey-select-label"
                      label="Tipo de encuesta"
                      margin="dense"
                      size="small"
                      fullWidth
                      style={{ borderRadius: 0 }}
                      value={typeSurvey}
                      onChange={handleChangeTypeSurvey}
                    >
                      {typeSurveyList.map((_typeSurvey, index) => (
                        <MenuItem key={index} value={_typeSurvey}>
                          {_typeSurvey}
                        </MenuItem>
                      ))}
                    </Select>
                    <p
                      className="paragraph"
                      style={{ color: "#8a8a8a", margin: "4px 0" }}
                    >
                      Selecciona un tipo de encuesta
                    </p>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    marginTop: "16px",
                    width: {
                      desktop: "80%",
                      laptop: "80%",
                      tablet: "80%",
                      mobile: "100%",
                      min: "100%",
                    },
                  }}
                >
                  <p className="paragraph">
                    Selecciona una encuesta en la tabla para visualizar los
                    gráficos.
                  </p>
                  {data ? (
                    <DataGrid
                      rows={surveyList}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      autoHeight={true}
                      sx={{ marginTop: "20px", borderRadius: 0 }}
                    />
                  ) : (
                    <LoadingInformation />
                  )}
                </Box>
              </div>
            </div>
          </ThemeProvider>
        </>
      );
    } else {
      return <LoadingInformation />;
    }
  }
}
