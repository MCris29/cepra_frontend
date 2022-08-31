import React, { useState } from "react";
import styles from "@/styles/LandingSurvey.module.css";
import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import RoutesCepra from "@/constants/routes";
import ThemeCepra from "@/constants/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingInformation from "@/components/LoadingInformation";
import ErrorInformation from "@/components/ErrorInformation";

const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints
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
  const [typeSurvey, setTypeSurvey] = useState("");
  const typeSurveyUrl = new Map([
    ['Energía', 'energy'],
    ['Innovación', 'innovation'],
    ['Desempeño', 'performance']
  ]);
  const [surveyList, setSurveyList] = useState([]);
  const columns = [
    {
      field: "itenc_fecha_vigente",
      headerName: "Fecha de vigencia",
      type: "dateTime",
      width: 175,
      renderCell: (data) => {
        return handleDate(data.row.itenc_fecha_vigente);
      },
    },
    { field: "itenc_observacion", headerName: "Observación", width: 400 },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
      renderCell: (data) => [
        <Link
            key={data.row.itenc_codigo}
            href={`${RoutesCepra.OBS_SURVEY}/${typeSurveyUrl.get(typeSurvey)}/graphic/${data.row.itenc_codigo}`}
        >
          <IconButton>
            <Tooltip title="Ver encuesta" placement="top-start" followCursor>
              <VisibilityIcon />
            </Tooltip>
          </IconButton>
        </Link>,
      ],
    },
  ];

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
                <Typography
                  className={styles.title}
                  variant="h5"
                  sx={{ margin: "32px" }}
                >
                  Encuestas
                </Typography>
                <Box
                  sx={{
                    width: {
                      desktop: "40%",
                      laptop: "50%",
                      tablet: "60%",
                      mobile: "100%",
                      min: "100%"
                    },
                  }}
                >
                  <TextField
                    id="typeSurvey"
                    label="Tipo de encuesta"
                    helperText="Selecciona un tipo de encuesta"
                    variant="outlined"
                    type="date"
                    margin="dense"
                    size="small"
                    select
                    fullWidth
                    value={typeSurvey}
                    onChange={handleChangeTypeSurvey}
                  >
                    {typeSurveyList.map((_typeSurvey, index) => (
                      <MenuItem key={index} value={_typeSurvey}>
                        {_typeSurvey}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  sx={{
                    width: {
                      desktop: "80%",
                      laptop: "80%",
                      tablet: "80%",
                      mobile: "100%",
                      min: "100%"
                    },
                  }}
                >
                  {data ? (
                    <DataGrid
                      rows={surveyList}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      autoHeight={true}
                      sx={{ marginTop: "20px" }}
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
