import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import {
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Saving from "@/components/Saving";

const schema = yup.object().shape({
  nombre_pregunta: yup
    .string()
    .required("Debe ingresar el contenido de la pregunta.")
    .max(200, "Debe contener máximo 200 caracteres"),
  observacion_pregunta: yup
    .string()
    .max(200, "Debe contener máximo 200 caracteres"),
  nombre_grupo_opcion: yup
    .string()
    .max(200, "Debe contener máximo 200 caracteres"),
  opciones: yup.string().max(200, "Debe contener máximo 200 caracteres"),
});

const QuestionForm = (props) => {
  const [typeData, setTypeData] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);

    const NewData = {
      codigo_encuesta: parseInt(props.survey_id),
      codigo_categoria: props.category_id,
      codigo_pregunta: "P1",
      codigo_pregunta_padre: "",
      nombre_pregunta: data.nombre_pregunta,
      observacion_pregunta: data.observacion_pregunta,
      tipo_dato: typeData,

      grupo_opciones: {
        nombre_grupo_opcion: data.nombre_grupo_opcion,
        opciones: options,
      },
    };

    try {
      console.log("Data", NewData);
      props.closeModal();
      props.openAlert();
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setTypeData(event.target.value);
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const addOption = (option) => {
    if (option !== "") {
      const newOptions = [...options, option];
      setOptions(newOptions);
    }
    document.getElementById("options-form").focus();
  };

  const Options = () => {
    return (
      <>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheck} />}
          label="Agregar opciones"
        />
        {checked ? (
          <div>
            <Controller
              name="nombre_grupo_opcion"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  id="nombre-grupo-opcion-form"
                  label="Nombre del grupo de opciones"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  error={Boolean(errors.nombre_grupo_opcion)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <div style={{ display: "flex" }}>
              <TextField
                id="options-form"
                label="Agregar opción"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
              />
              <IconButton
                onClick={() =>
                  addOption(document.getElementById("options-form").value)
                }
              >
                <AddIcon />
              </IconButton>
            </div>
            {options.map((option, index) => (
              <div key={index} style={{ paddingLeft: "18px" }}>
                {index + 1 + ". " + option}
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
      </>
    );
  };

  return (
    <>
      <form id="form-tipo-encuesta" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="nombre_pregunta"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="nombre-pregunta-form"
              label="Pregunta"
              variant="outlined"
              margin="dense"
              size="small"
              required
              fullWidth
              error={Boolean(errors.nombre_pregunta)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <span className={styles.error}>{errors.nombre_pregunta?.message}</span>
        <Controller
          name="observacion_pregunta"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="observacion-pregunta-form"
              label="Observación"
              variant="outlined"
              margin="dense"
              size="small"
              required
              fullWidth
              error={Boolean(errors.nombre_pregunta)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
        <span className={styles.error}>{errors.nombre_pregunta?.message}</span>
        <Controller
          name="tipo_dato"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              id="tipo_dato"
              label="Tipo de dato"
              helperText="Por favor selecciona un tipo de dato"
              variant="outlined"
              type="date"
              margin="dense"
              size="small"
              select
              required
              fullWidth
              value={typeData}
              onChange={handleChange}
            >
              <MenuItem value={"texto"}>Texto</MenuItem>
              <MenuItem value={"numero"}>Númerico</MenuItem>
            </TextField>
          )}
        />
        <Options />
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
    </>
  );
};

export default QuestionForm;
