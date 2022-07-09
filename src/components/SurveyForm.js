import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import { styled } from "@mui/material/styles";
import { TextField, Button, MenuItem } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { Surveys } from "@/lib/survey";
import { Question } from "@/models/question";
import { GroupOptions } from "@/models/groupOption";

import * as XLSX from "xlsx";
import { Category } from "@/models/category";

const schema = yup.object().shape({
  itenc_fecha_vigente: yup
    .string()
    .required("Debe ingresar la fecha de vigencia de la encuesta"),
  itenc_observacion: yup
    .string()
    .max(200, "Debe contener máximo 200 caracteres"),
});

const SurveyForm = () => {
  const [typeSurvey, setTypeSurvey] = useState(false);
  const { data, error } = useSWR("it/ittipoencuesta/", fetcher);
  const [categorias, setCategorias] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    
    const NewSurvey = {
      id_encuesta: 3,
      categorias: categorias,
    };

    console.log(JSON.stringify(NewSurvey))
    /*  

    const NewSurvey = {
      itten_codigo: typeSurvey,
      itenc_fecha_vigente: data.itenc_fecha_vigente,
      itenc_observacion: data.itenc_observacion,
    };

    try {
      const surveyData = await Surveys.create(NewSurvey);
      console.log("Data survey", data);

      reset();
    } catch (e) {
      console.log(e);
    }
    */
  };

  const handleChange = (event) => {
    setTypeSurvey(event.target.value);
  };

  const undefinedToNull = (value) => {
    if(value == undefined) {
      return null;
    } else {
      return value;
    }
  }
  const handleFile = (e) => {
    const [file] = e.target.files;
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

      for (let index = 1; index < data.length; index++) {

        const categoria = categorias.find(c => c.nombre_categoria === data[index][0]);
        const preguntas = [];
        const opciones = [];
        const grupo_opciones = null;

        if(data[index][7]) {
          opciones = data[index][8].split(',');
          grupo_opciones = new GroupOptions(
            undefinedToNull(data[index][7]), // nombre_grupo_opcion
            opciones                         // array opciones
          );
        }

        if(categoria) {
          categoria.preguntas.push(
            new Question(
              undefinedToNull(data[index][2]), // codigo_pregunta
              undefinedToNull(data[index][3]), // codigo_pregunta_padre
              undefinedToNull(data[index][4]), // nombre_pregunta
              undefinedToNull(data[index][5]), // observacion_pregunta
              undefinedToNull(data[index][6]), // tipo_dato
              grupo_opciones                   // grupo_opciones
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
              grupo_opciones                   // grupo_opciones
            )
          );

          categorias.push(
            new Category(
              data[index][0],                  // nombre_categoria
              undefinedToNull(data[index][1]), // observacion_categoria
              preguntas                        // array preguntas
            )
          );
        }
      }
      setCategorias(categorias);
    };
    reader.readAsBinaryString(file);
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
              error={Boolean(errors.itten_nombre)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <span className={styles.error}>{errors.itten_nombre?.message}</span>
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
              error={Boolean(errors.itten_observacion)}
            />
          )}
        />
        <span className={styles.error}>
          {errors.itten_observacion?.message}
        </span>

        <input
          accept=".csv, .xlsx"
          id="contained-button-file"
          type="file"
          multiple
          //   onChange={(e) => handleFile(e.target.files[0])}
          onChange={(e) => handleFile(e)}
        />

        <br />
        <Button type="submit" variant="outlined">
          Guardar
        </Button>
      </form>
    </>
  );
};

export default SurveyForm;
