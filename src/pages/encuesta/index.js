import React, {useState} from "react";
import styles from "@/styles/Graphic2.module.css";
import {Box, IconButton, MenuItem, TextField, Tooltip, Typography} from "@mui/material";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import Link from "next/link";
import RoutesCepra from "@/constants/routes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingInformation from "@/components/LoadingInformation";
import ErrorInformation from "@/components/ErrorInformation";

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
function handleDate(dateTime) {
    if (dateTime !== null) {
        var formatDate = new Date(dateTime);
        return formatDate.toLocaleDateString("es-ES");
    } else {
        return "N/A";
    }
}
const columns = [
    { field: "itenc_codigo", headerName: "Encuesta", width: 175 },
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
        renderCell: (data) => (
            <Link
                href={`${RoutesCepra.OBS_SURVEY}/${data.row.itenc_codigo}/grafico`}>
                <IconButton>
                    <Tooltip title="Ver encuesta" placement="top-start" followCursor>
                        <VisibilityIcon />
                    </Tooltip>
                </IconButton>
            </Link>
        )
    },
];

export default function Survey() {
    const { data, error } = useSWR("it/datosGrafico2/", fetcher, { shouldRetryOnError: false });
    const [typeSurvey, setTypeSurvey] = useState("");
    const [surveyList, setSurveyList] = useState([]);
    const handleChangeTypeSurvey = (event) => {
        const newTypeSurvey = event.target.value;
        setTypeSurvey(newTypeSurvey);
        const newSurvey = data.data.find((nextTypeSurvey) => nextTypeSurvey.tipoEncuesta === newTypeSurvey);
        setSurveyList(newSurvey.encuestas);
    };

    if(error) {
        return (
            <ErrorInformation />
        );
    }
    if(data) {
        if(data.data) {
            let typeSurveyList = [];
            data.data.map((nextTypeSurvey) => {
                nextTypeSurvey.encuestas.map((nextSurvey, index) => {
                    nextSurvey.id = index+1;
                });
                typeSurveyList.push(nextTypeSurvey.tipoEncuesta);
            });
            return (
                <>
                    <ThemeProvider theme={theme}>
                        <div className={styles.container}>
                            <div className={styles.main} >
                                <Typography className={styles.title} variant="h2" sx={{margin: "1%"}}>
                                    <span>Encuestas</span>
                                </Typography>
                                <Box sx={{width: {desktop: "40%", laptop: "50%", tablet: "60%", mobile: "100%"}}}>
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
                                        {
                                            typeSurveyList.map((_typeSurvey) => (
                                                <MenuItem key={_typeSurvey} value={_typeSurvey}>
                                                    {_typeSurvey}
                                                </MenuItem>
                                            ))
                                        }

                                    </TextField>
                                </Box>
                                <Box sx={{width: {desktop: "80%", laptop: "80%", tablet: "80%", mobile: "100%"}}}>
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
            return (
                <LoadingInformation />
            );
        }
    }

}
