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

import { useForm, Controller } from "react-hook-form";
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

const schema = yup.object().shape({
  itres_fecha_test: yup
    .string()
    .required("Debe ingresar la fecha en que fue realizada la encuesta"),
});

const ReplyForm = () => {
  const { data, error } = useSWR("it/itencuesta/", fetcher);
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
                "Preguntas no encontradas: " +
                questionTemplateNotFoundArray.join(", ") +
                ". ";
            }
            if (questionReplyNotFoundArray.length > 0) {
              error +=
                "Preguntas adicionales encontradas: " +
                questionReplyNotFoundArray.join(", ") +
                ". ";
            }
            throw new Error(error);
          }

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
            console.log(JSON.stringify(newSurveyReply));
            const surveyData = await SurveyReplys.create(newSurveyReply);
            setErrorTemplate("");
          }

          setLoading(false);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            axiosErrorHandler(error);
          } else {
            setMessageError(error.message);
            setOpenError(true);
          }
          setLoading(false);
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
    if (error.code === "ERR_NETWORK") {
      message = "No se ha podido establecer conexión con el servidor.";
    } else if (error.code === "ERR_BAD_REQUEST") {
      message =
        "Error " +
        error.request.status +
        "." +
        " Solicitud " +
        nameRequest +
        "fallida.";

      message =
        "Error " +
        error.request.status +
        "." +
        " Solicitud " +
        nameRequest +
        "fallida.";
    } else if (error.code === "ERR_BAD_RESPONSE") {
      message =
        "Error " +
        error.response.status +
        "." +
        " Respuesta " +
        nameRequest +
        "fallida.";
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
          //Recorre la primera fila del excel
          //almacenando las preguntas de la
          //encuesta en un array
          for (
            let index = rowHeaders;
            index < data[rowHeaders].length;
            index++
          ) {
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
              indexRow, //itorg_ruc
              "Org " + indexRow, //itorg_nombre
              "Sector " + indexRow, //itorg_sector
              "SubSector " + indexRow, //itorg_subsector
              100 + indexRow, //itorg_num_empleados
              "-1.282083, -78.633050", //itorg_ubicacion
              52 //itopc_codigo_ciudad => Id de Ambato
            );

            const contact = new Contact(
              "Contacto " + indexRow, //itcon_nombre
              "contacto" + indexRow + "@gmail.com", //itcon_email
              "N. Estudios " + indexRow, //itcon_nivel_estudios
              "N. Decisión " + indexRow //itcon_nivel_decision
            );

            const questionReplyArray = [];
            //Recorre la fila indexRow del excel
            //almacenando las respuestas de la
            //encuesta de la organizacion en un array
            newQuestionReplyArray.forEach((questionReply, indexCol) => {
              let cellData = data[indexRow][indexCol];
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

  return (
    <>
      <h4>Datos de encuesta respuesta</h4>
      <form id="form-encuesta-respuesta" onSubmit={handleSubmit(onSubmit)}>
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
              {data ? (
                data.data.map((type, index) => (
                  <MenuItem key={index} value={type.itenc_codigo}>
                    {type.itenc_observacion}
                  </MenuItem>
                ))
              ) : (
                <span>Cargando...</span>
              )}
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
        <span className={styles.error}>{errors.itres_fecha_test?.message}</span>

        <label htmlFor="button-file" className={styles.button_template_survey}>
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
        <div className={styles.error}>{errorTemplate ? errorTemplate : ""}</div>

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
};

export default ReplyForm;
