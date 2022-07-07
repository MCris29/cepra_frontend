import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import { TextField, Button, MenuItem } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { Surveys } from "@/lib/survey";

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
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
  };

  const handleChange = (event) => {
    setTypeSurvey(event.target.value);
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
        <br />
        <Button type="submit" variant="outlined">
          Guardar
        </Button>
      </form>
    </>
  );
};

export default SurveyForm;
