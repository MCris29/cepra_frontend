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
  const { data, error } = useSWR("it/ittipoencuesta/", fetcher);

  const [typeSurvey, setTypeSurvey] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [errorTemplate, setErrorTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);

    if (categorias.length > 0) {
      const NewSurvey = {
        itten_codigo: typeSurvey,
        itenc_fecha_vigente: data.itenc_fecha_vigente,
        itenc_observacion: data.itenc_observacion,
      };

      try {
        const surveyData = await Surveys.create(NewSurvey);
        console.log("Success survey", surveyData);

        submitTemplate(surveyData.data.idEncuesta);
        setErrorTemplate("");
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    } else {
      setErrorTemplate("Debe subir la plantilla de la encuesta");
      setLoading(false);
    }
  };

  const submitTemplate = async (surveyId) => {
    const SurveyTemplate = {
      id_encuesta: surveyId,
      categorias: categorias,
    };

    try {
      const surveyTemplateData = await SurveyTemplates.create(SurveyTemplate);
      console.log("Success template", surveyTemplateData);

      reset();
      deleteFile();
      setLoading(false);
      setOpen(true);
    } catch (e) {
      console.log(e);
      setErrorTemplate(e.response.data.message);
      const surveyError = await Surveys.deleteSurvey(surveyId);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setTypeSurvey(event.target.value);
  };

  const undefinedToNull = (value) => {
    if (value == undefined) {
      return "";
    } else {
      return value;
    }
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
        setCategorias([]);
        const categoriasArray = [];

        for (let index = 1; index < data.length; index++) {
          const categoria = categoriasArray.find(
            (c) => c.nombre_categoria === data[index][0]
          );
          const preguntas = [];
          const opciones = [];
          const grupo_opciones = null;

          if (data[index][7]) {
            opciones = data[index][8].split(",");
            grupo_opciones = new GroupOptions(
              undefinedToNull(data[index][7]), // nombre_grupo_opcion
              opciones // array opciones
            );
          }

          if (categoria) {
            categoria.preguntas.push(
              new Question(
                undefinedToNull(data[index][2]), // codigo_pregunta
                undefinedToNull(data[index][3]), // codigo_pregunta_padre
                undefinedToNull(data[index][4]), // nombre_pregunta
                undefinedToNull(data[index][5]), // observacion_pregunta
                undefinedToNull(data[index][6]), // tipo_dato
                grupo_opciones // grupo_opciones
              )
            );
          } else {
            preguntas.push(
              new Question(
                undefinedToNull(data[index][2]), // codigo_pregunta
                undefinedToNull(data[index][3]), // codigo_pregunta_padre
                undefinedToNull(data[index][4]), // nombre_pregunta
                undefinedToNull(data[index][5]), // observacion_pregunta
                undefinedToNull(data[index][6]), // tipo_dato
                grupo_opciones // grupo_opciones
              )
            );

            categoriasArray.push(
              new Category(
                data[index][0], // nombre_categoria
                undefinedToNull(data[index][1]), // observacion_categoria
                preguntas // array preguntas
              )
            );
          }
        }
        setCategorias(categoriasArray);
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
      Datos de encuesta
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
              margin="normal"
              select
              required
              fullWidth
              value={typeSurvey}
              onChange={handleChange}
            >
              {data ? (
                data.tipo_encuestas.map((type, index) => (
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
              margin="normal"
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
              margin="normal"
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

        <Button type="submit" variant="outlined" disabled={loading}>
          Guardar
        </Button>
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
