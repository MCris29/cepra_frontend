import React, { useEffect } from "react";
import styles from "@/styles/Survey.module.css";
import { TextField, Button } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SurveyTypes } from "@/lib/suveyType";

const schema = yup.object().shape({
  itten_nombre: yup
    .string()
    .required("Debe ingresar el tipo de encuesta")
    .max(50, "El nombre debe contener máximo 50 caracteres"),
  itten_observacion: yup
    .string()
    .max(200, "El nombre debe contener máximo 200 caracteres"),
});

const SurveyTypeForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const TipoEncuestaData = await SurveyTypes.create(data);
      console.log("Data survey type", data);

      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      Tipo de encuesta
      <form id="form-tipo-encuesta" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="itten_nombre"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="nombre-form"
              label="Tipo de encuesta"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={Boolean(errors.itten_nombre)}
            />
          )}
        />
        <span className={styles.error}>{errors.itten_nombre?.message}</span>
        <Controller
          name="itten_observacion"
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

export default SurveyTypeForm;
