import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import { TextField, Button, MenuItem, Stack, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { Surveys } from "@/lib/survey";
import { SurveyTemplates } from "@/lib/SurveyTemplate";
import { Question } from "@/models/question";
import { GroupOptions } from "@/models/groupOption";
import { Category } from "@/models/category";

import Saving from "@/components/Saving";
import LoadingInformation from "@/components/LoadingInformation";
import ErrorInformation from "@/components/ErrorInformation";

import * as XLSX from "xlsx";

const schema = yup.object().shape({
  itenc_fecha_vigente: yup
    .string()
    .required("Debe ingresar la fecha de vigencia de la encuesta"),
  itenc_observacion: yup
    .string()
    .max(200, "Debe contener máximo 200 caracteres"),
});

const SurveyForm = () => {
  const [typeSurvey, setTypeSurvey] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [errorTemplate, setErrorTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { data, error } = useSWR("it/ittipoencuesta/", fetcher);

  if (!data) return <> </>;
  if (error) return <ErrorInformation />;

  const onSubmit = async (data) => {
    setLoading(true);

    if (categoryArray.length > 0) {
      const newSurvey = {
        itten_codigo: typeSurvey,
        itenc_fecha_vigente: data.itenc_fecha_vigente,
        itenc_observacion: data.itenc_observacion,
      };

      try {
        const surveyData = await Surveys.create(newSurvey);
        console.log("Success survey", surveyData);

        submitTemplate(surveyData.data.idEncuesta);
        setErrorTemplate("");
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setLoading(false);
      setErrorTemplate("Debe subir la plantilla de la encuesta");
    }
  };

  const submitTemplate = async (surveyId) => {
    const SurveyTemplate = {
      id_encuesta: surveyId,
      categorias: categoryArray,
    };

    try {
      const surveyTemplateData = await SurveyTemplates.create(SurveyTemplate);
      console.log("Success template", surveyTemplateData);

      reset();
      deleteFile();
      setLoading(false);
      setOpen(true);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setErrorTemplate(e.response.data.message);
      const surveyError = await Surveys.deleteSurvey(surveyId);
    }
  };

  const handleChange = (event) => {
    setTypeSurvey(event.target.value);
  };

  const handleNameFile = (e) => {
    const nameFile = e.target.files[0].name;
    document.getElementById("file-span").innerHTML = nameFile;
  };

  const deleteFile = () => {
    document.getElementById("file-span").innerHTML = "Selecciona un archivo *";
    document.getElementById("button-file").value = "";
  };

  const handleFile = (e) => {
    const [file] = e.target.files;

    if (e.target.files.length != 0) {
      handleNameFile(e);

      const reader = new FileReader();

      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        //Esta variable declarar fuera del método
        // Declarar como categoriasArray
        setCategoryArray([]);
        const newCategoryArray = [];

        for (let index = 1; index < data.length; index++) {
          const category = newCategoryArray.find(
            (c) => c.nombre_categoria == data[index][0]
          );

          const questionArray = [];
          const optionArray = [];
          const groupOptions = "";

          if (data[index][7]) {
            optionArray = data[index][8].split(";");
            groupOptions = new GroupOptions(
              data[index][7].toString().trim(), // nombre_grupo_opcion
              optionArray // array opciones
            );
          }

          if (category) {
            category.preguntas.push(
              new Question(
                data[index][2] ? data[index][2].toString().trim() : "", // codigo_pregunta
                data[index][3] ? data[index][3].toString().trim() : "", // codigo_pregunta_padre
                data[index][4] ? data[index][4].toString().trim() : "", // nombre_pregunta
                data[index][5] ? data[index][5].toString().trim() : "", // observacion_pregunta
                data[index][6] ? data[index][6].toString().trim() : "", // tipo_dato
                groupOptions // grupo_opciones
              )
            );
          } else {
            questionArray.push(
              new Question(
                data[index][2] ? data[index][2].toString().trim() : "", // codigo_pregunta
                data[index][3] ? data[index][3].toString().trim() : "", // codigo_pregunta_padre
                data[index][4] ? data[index][4].toString().trim() : "", // nombre_pregunta
                data[index][5] ? data[index][5].toString().trim() : "", // observacion_pregunta
                data[index][6] ? data[index][6].toString().trim() : "", // tipo_dato
                groupOptions // grupo_opciones
              )
            );

            newCategoryArray.push(
              new Category(
                data[index][0] ? data[index][0].toString().trim() : "", // nombre_categoria
                data[index][1] ? data[index][1].toString().trim() : "", // observacion_categoria
                questionArray // array preguntas
              )
            );
          }
        }
        setCategoryArray(newCategoryArray);
      };
      reader.readAsBinaryString(file);
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
      <h4>Datos de encuesta</h4>
      <form id="form-tipo-encuesta" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="itten_codigo"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="itten_codigo"
              label="Tipo de encuesta"
              helperText="Por favor selecciona un tipo de encuesta"
              variant="outlined"
              type="date"
              margin="dense"
              size="small"
              select
              required
              fullWidth
              value={typeSurvey}
              onChange={handleChange}
            >
              {data ? (
                data.data.map((type, index) => (
                  <MenuItem key={index} value={type.itten_codigo}>
                    {type.itten_nombre}
                  </MenuItem>
                ))
              ) : (
                <span>Cargando...</span>
              )}
            </TextField>
          )}
        />
        <Controller
          name="itenc_fecha_vigente"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="date-form"
              label="Fecha vigente"
              variant="outlined"
              type="date"
              margin="dense"
              size="small"
              required
              fullWidth
              error={Boolean(errors.itenc_fecha_vigente)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <span className={styles.error}>
          {errors.itenc_fecha_vigente?.message}
        </span>
        <Controller
          name="itenc_observacion"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="observacion-form"
              label="Observación"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itenc_observacion)}
            />
          )}
        />
        <span className={styles.error}>
          {errors.itenc_observacion?.message}
        </span>

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
            {loading ? <Saving /> : <div>Guardar</div>}
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
    </>
  );
};

export default SurveyForm;
