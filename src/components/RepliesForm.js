import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Snackbar,
  AlertTitle,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import * as XLSX from "xlsx";

import { Organization } from "@/models/organization";
import { Contact } from "@/models/contact";
import { SurveyReply } from "@/models/surveyReply";
import { SurveyTemplates } from "@/lib/SurveyTemplate";
import { SurveyReplys } from "@/lib/surveyReply";
import ErrorInformation from "@/components/ErrorInformation";
import { ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import LoadingInformation from "@/components/LoadingInformation";

const schema = yup.object().shape({
  itres_fecha_test: yup
    .string()
    .required("Debe ingresar la fecha en que fue realizada la encuesta"),
});

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" {...props}>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

const RepliesForm = () => {
  const [progress, setProgress] = React.useState(0);
  const [showProgress, setShowProgress] = React.useState(false);
  const [colorProgress, setColorProgress] = React.useState("primary");
  const { data, error } = useSWR("it/datosGrafico2/2", fetcher, {
    shouldRetryOnError: false,
  });

  const [typeSurvey, setTypeSurvey] = useState("");
  const [surveyList, setSurveyList] = useState([]);

  const handleChangeTypeSurvey = (event) => {
    const newTypeSurvey = event.target.value;
    setTypeSurvey(newTypeSurvey);
    const newSurvey = data.data.find(
      (nextTypeSurvey) => nextTypeSurvey.tipoEncuesta === newTypeSurvey
    );
    setSurveyList(newSurvey.encuestas);
    setSurveyTemplateId("");
  };

  const [surveyTemplateId, setSurveyTemplateId] = useState("");
  const [surveyReplyArray, setSurveyReplyArray] = useState([]);
  const [questionReplyArray, setQuestionReplyArray] = useState([]);
  const [cellUndefinedArray, setCellUndefinedArray] = useState([]);
  const [cellEmptyArray, setCellEmptyArray] = useState([]);

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [errorTemplate, setErrorTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    if (cellEmptyArray.length == 0 && cellUndefinedArray.length == 0) {
      if (surveyReplyArray.length > 0) {
        try {
          //Obtiene la plantilla de la encuesta
          const surveyTemplate = await SurveyTemplates.getById(
            surveyTemplateId
          );
          const questionTemplateNotFoundArray = [];
          const questionReplyNotFoundArray = [];
          //Comprueba que se encuentren todas las
          //las preguntas de la plantilla
          surveyTemplate.preguntas.forEach((questionTemplate) => {
            let questionReply = questionReplyArray.find(
              (_questionReply) =>
                _questionReply.question == questionTemplate.nombre_pregunta
            );
            //Verifica si existe la pregunta en la plantilla
            if (questionReply) {
              questionReply.questionFind = true;
            } else {
              questionTemplateNotFoundArray.push(
                questionTemplate.nombre_pregunta
              );
            }
          });

          //Comprueba que preguntas no estaban
          //en la plantilla
          questionReplyArray.forEach((questionReply) => {
            //Verifica si la pregunta se
            //encontro en la plantilla
            if (!questionReply.questionFind) {
              questionReplyNotFoundArray.push(questionReply.question);
            }
          });
          if (
            questionTemplateNotFoundArray.length > 0 ||
            questionReplyNotFoundArray.length > 0
          ) {
            let error = "Error al procesar las preguntas. ";
            if (questionTemplateNotFoundArray.length > 0) {
              error +=
                "PLANTILLA - Preguntas no encontradas: " +
                questionTemplateNotFoundArray.join(", ") +
                ". ";
            }
            if (questionReplyNotFoundArray.length > 0) {
              error +=
                "RESPUESTAS - Preguntas adicionales encontradas: " +
                questionReplyNotFoundArray.join(", ") +
                ". ";
            }
            throw new Error(error);
          }

          setProgress(0);
          setShowProgress(true);
          setColorProgress("primary");
          //Recorre por cada organizacion, contacto y sus respuestas
          for (let index = 0; index < surveyReplyArray.length; index++) {
            let surveyReply = surveyReplyArray[index];
            const newQuestionReplyArray = [];

            //Recorre por cada respuesta de la organizacion
            surveyReply.questionReplyArray.forEach((questionReply) => {
              //Busca la pregunta de la organizacion en las
              //preguntas de la plantilla
              let questionTemplate = surveyTemplate.preguntas.find(
                (_questionTemplate) =>
                  questionReply.question == _questionTemplate.nombre_pregunta
              );

              let itopc_codigo = "";

              //Verifica si tiene grupo de opciones
              if (questionTemplate.grupo_opciones != "") {
                let optionArray = questionTemplate.grupo_opciones.opciones;

                //Busca la respuesta en el grupo de opciones
                let option = optionArray.find(
                  (_option) => _option.itopc_nombre == questionReply.reply
                );

                //Verifica si existe la respuesta en el grupo de opciones
                if (option) {
                  itopc_codigo = option.itopc_codigo;
                }
              }

              let newQuestionReply = {
                itepr_codigo: questionTemplate.itepr_codigo,
                itopc_codigo: itopc_codigo,
                itrde_respuesta: questionReply.reply,
              };
              newQuestionReplyArray.push(newQuestionReply);
            });

            let newSurveyReply = {
              itenc_codigo: surveyTemplate.itenc_codigo,
              itten_codigo: surveyTemplate.itten_codigo,
              itres_fecha_test: data.itres_fecha_test,
              organizacion: surveyReply.organization,
              contacto: surveyReply.contact,
              respuestas: newQuestionReplyArray,
            };
            const surveyData = await SurveyReplys.create(newSurveyReply);
            let nextProgress = (index * 100) / surveyReplyArray.length;

            console.log(nextProgress);
            //setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
            setProgress(nextProgress);
            setErrorTemplate("");
          }
          setProgress(100);
          console.log("Respuestas guardadas con exito");
          setOpen(true);
          setLoading(false);
          setShowProgress(false);
        } catch (error) {
          setLoading(false);
          if (axios.isAxiosError(error)) {
            axiosErrorHandler(error);
          } else {
            setMessageError(error.message);
            setOpenError(true);
          }
        }
      } else {
        setErrorTemplate("Debe subir los datos de la encuesta.");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const axiosErrorHandler = (error) => {
    const nameRequest = `"${error.config.baseURL}${error.config.url}" `;
    let message = "";
    setColorProgress("secondary");
    if (error.code == "ERR_NETWORK") {
      message = "No se ha podido establecer conexión con el servidor.";
    } else if (error.code == "ERR_BAD_REQUEST") {
      let response = JSON.parse(error.request.response);
      message =
        "Error " +
        error.request.status +
        "." +
        " Solicitud " +
        nameRequest +
        "fallida." +
        response.message +
        ". " +
        response.error +
        ".";
    } else if (error.code == "ERR_BAD_RESPONSE") {
      message =
        "Error " +
        error.response.status +
        "." +
        " Respuesta " +
        nameRequest +
        "fallida." +
        error.response.data.message +
        ". " +
        error.response.data.error +
        ".";
    } else {
      message = error.message + "." + " Solicitud " + nameRequest + "fallida. ";
    }
    setMessageError(message);
    setOpenError(true);
  };

  const handleChange = (event) => {
    let itenc_codigo = event.target.value;
    setSurveyTemplateId(itenc_codigo);
  };

  const handleNameFile = (e) => {
    const nameFile = e.target.files[0].name;
    document.getElementById("file-span").innerHTML = nameFile;
  };

  const deleteFile = () => {
    document.getElementById("file-span").innerHTML = "Selecciona un archivo *";
    document.getElementById("button-file").value = "";
  };

  const findCellName = (rowNumber, columnNumber) => {
    let columnName = [];

    while (columnNumber > 0) {
      // Encontrar resto
      let rem = columnNumber % 26;

      // Si el resto es 0, entonces se agrega 'Z'
      if (rem == 0) {
        columnName.push("Z");
        columnNumber = Math.floor(columnNumber / 26) - 1;
      } // Si el resto es distinto de cero
      else {
        columnName.push(String.fromCharCode(rem - 1 + "A".charCodeAt(0)));
        columnNumber = Math.floor(columnNumber / 26);
      }
    }
    return columnName.reverse().join("") + rowNumber;
  };

  const handleFile = (e) => {
    const [file] = e.target.files;
    if (e.target.files.length != 0) {
      handleNameFile(e);
      const reader = new FileReader();

      reader.onload = (evt) => {
        try {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          const newQuestionReplyArray = [];
          const newSurveyReplyArray = [];
          const newCellUndefinedArray = [];
          const newCellEmptyArray = [];
          const rowHeaders = 0;

          setQuestionReplyArray([]);
          setSurveyReplyArray([]);
          setCellUndefinedArray([]);
          setCellEmptyArray([]);

          setShowProgress(false);
          setColorProgress("primary");
          //Recorre la primera fila del excel
          //almacenando las preguntas de la
          //encuesta en un array
          for (let index = 12; index < data[rowHeaders].length; index++) {
            let cellData = data[rowHeaders][index];
            let cellName = findCellName(rowHeaders + 1, index + 1);

            //Verifica si existe la celda
            if (cellData) {
              //Convierte a string la celda
              //Elimina los espacios en blanco
              //en ambos extremos
              cellData = cellData.toString().trim();

              //Verfica si la celda esta vacia
              if (cellData != "") {
                newQuestionReplyArray.push({
                  question: cellData,
                  questionFind: false,
                });
              } else {
                newCellEmptyArray.push(cellName);
              }
            } else {
              newCellUndefinedArray.push(cellName);
            }
          }
          setQuestionReplyArray(newQuestionReplyArray);

          if (
            newCellUndefinedArray.length > 0 ||
            newCellEmptyArray.length > 0
          ) {
            let error = "Error al cargar las preguntas del Excel. ";

            if (newCellUndefinedArray.length > 0) {
              setCellUndefinedArray(newCellUndefinedArray);
              error +=
                "Celdas no encontradas: " +
                newCellUndefinedArray.join(", ") +
                ". ";
            }
            if (newCellEmptyArray.length > 0) {
              setCellEmptyArray(newCellEmptyArray);
              error += "Celdas vacías: " + newCellEmptyArray.join(", ") + ".";
            }

            throw new Error(error);
          }

          //Recorre desde la segunda fila del excel
          //almacenando las respuestas de la
          //encuesta de cada organizacion en un array

          for (let indexRow = 1; indexRow < data.length; indexRow++) {
            const organization = new Organization(
              data[indexRow][0] ? data[indexRow][0].toString().trim() : "", //itorg_ruc
              data[indexRow][1] ? data[indexRow][1].toString().trim() : "", //itorg_nombre
              data[indexRow][2] ? data[indexRow][2].toString().trim() : "", //itorg_sector
              data[indexRow][3] ? data[indexRow][3].toString().trim() : "", //itorg_subsector
              data[indexRow][4] ? data[indexRow][4].toString().trim() : "", //itorg_num_empleados
              data[indexRow][5] ? data[indexRow][5].toString().trim() : "", //itorg_ubicacion
              data[indexRow][6] ? data[indexRow][6].toString().trim() : "", //itorg_provincia
              data[indexRow][7] ? data[indexRow][7].toString().trim() : "" //itorg_ciudad
            );
            const contact = new Contact(
              data[indexRow][8] ? data[indexRow][8].toString().trim() : "", //itcon_nombre
              data[indexRow][9] ? data[indexRow][9].toString().trim() : "", //itcon_email
              data[indexRow][10] ? data[indexRow][10].toString().trim() : "", //itcon_nivel_estudios
              data[indexRow][11] ? data[indexRow][11].toString().trim() : "" //itcon_nivel_decision
            );

            const questionReplyArray = [];
            //Recorre la fila indexRow del excel
            //almacenando las respuestas de la
            //encuesta de la organizacion en un array
            newQuestionReplyArray.forEach((questionReply, indexCol) => {
              let cellData = data[indexRow][12 + indexCol];
              let cellHeader = questionReply.question;
              //Verifica si existe la celda
              if (cellData) {
                //Convierte a string la celda
                //Elimina los espacios en blanco
                //en ambos extremos
                cellData = cellData.toString().trim();
                questionReplyArray.push({
                  question: cellHeader,
                  reply: cellData,
                });
              } else {
                questionReplyArray.push({ question: cellHeader, reply: "" });
              }
            });

            newSurveyReplyArray.push(
              new SurveyReply(organization, contact, questionReplyArray)
            );
          }
          setSurveyReplyArray(newSurveyReplyArray);
        } catch (error) {
          setErrorTemplate(error.message);
        }
      };
      reader.readAsBinaryString(file);
      setErrorTemplate("");
    }
  };

  //Mensaje de alerta
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          <h4>Respuestas en bloque</h4>
          <p>
            En esta sección se suben las respuestas en bloque, para ello debe
            seleccionar una encuesta y subir un archivo en formato .xlsx o .csv con las
            respuestas de la encuesta.
          </p>
          <form id="form-encuesta-respuesta" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="typeSurvey"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="typeSurvey"
                  label="Tipo de encuesta"
                  helperText="Selecciona un tipo de encuesta"
                  variant="outlined"
                  type="date"
                  margin="dense"
                  size="small"
                  select
                  required
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
              )}
            />
            <Controller
              name="itenc_codigo"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="itenc_codigo"
                  label="Encuesta"
                  helperText="Por favor selecciona una encuesta"
                  variant="outlined"
                  type="date"
                  margin="dense"
                  size="small"
                  select
                  required
                  fullWidth
                  value={surveyTemplateId}
                  onChange={handleChange}
                >
                  {surveyList.map((type, index) => (
                    <MenuItem key={index} value={type.itenc_codigo}>
                      {type.itenc_observacion}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="itres_fecha_test"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="date-form"
                  label="Fecha test"
                  variant="outlined"
                  type="date"
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  error={Boolean(errors.itres_fecha_test)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <span className={styles.error}>
              {errors.itres_fecha_test?.message}
            </span>

            <label
              htmlFor="button-file"
              className={styles.button_template_survey}
            >
              <input
                className={styles.input_file}
                accept=".csv, .xlsx"
                id="button-file"
                type="file"
                multiple
                onChange={(e) => handleFile(e)}
              />
              <span id="file-span">Selecciona un archivo *</span>
            </label>
            <div className={styles.error}>
              {errorTemplate ? errorTemplate : ""}
            </div>
            <Box
              sx={{ width: "100%" }}
              style={{ display: showProgress ? "block" : "none" }}
              className={styles.error}
            >
              <LinearProgressWithLabel value={progress} color={colorProgress} />
            </Box>
            <div className={styles.button_container}>
              <Button
                type="submit"
                variant="outlined"
                disabled={loading}
                className={styles.button}
              >
                Guardar
              </Button>
            </div>
          </form>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={"success"}
                sx={{ width: "100%" }}
              >
                Encuesta guardada con exito
              </Alert>
            </Snackbar>
          </Stack>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={() => {
                setOpenError(false);
              }}
            >
              <Alert
                onClose={() => {
                  setOpenError(false);
                }}
                severity={"error"}
                sx={{ width: "100%" }}
              >
                <AlertTitle>Error</AlertTitle>
                {messageError}
              </Alert>
            </Snackbar>
          </Stack>
        </>
      );
    } else {
      return <LoadingInformation />;
    }
  }
};

export default RepliesForm;
