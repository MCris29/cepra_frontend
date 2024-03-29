import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Snackbar,
  styled,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SurveyTypes } from "@/lib/suveyType";
import Loading from "@/components/Saving";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#05579f",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: "#0C89CB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#05579f",
    },
  },
});

const CustomButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: "bold",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "transparent",
  borderColor: "#0C89CB",
  borderRadius: 0,
  color: "#0C89CB",

  "&:hover": {
    boxShadow: "none",
    color: "#fff",
    backgroundColor: "#0C89CB",
    borderColor: "#0C89CB",
    transition: "0.3s",
  },
  "&:active": {
    boxShadow: "none",
    color: "#fff",
    backgroundColor: "#05579f",
    borderColor: "#05579f",
  },
});

const schema = yup.object().shape({
  itten_nombre: yup
    .string()
    .required("Debe ingresar el tipo de encuesta")
    .max(50, "El nombre debe contener máximo 50 caracteres"),
  itten_observacion: yup
    .string()
    .max(200, "Debe contener máximo 200 caracteres"),
});

const SurveyTypeForm = () => {
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
    try {
      const surveyTypeData = await SurveyTypes.create(data);
      console.log("Data survey type", data);
      reset();
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
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
      <h4 className="title">Tipo de encuesta</h4>
      <p className="paragraph">
        En esta sección se puede crear un nuevo tipo de encuesta.
      </p>
      <form id="form-tipo-encuesta" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="itten_nombre"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="nombre-form"
              label="Tipo de encuesta"
              variant="outlined"
              margin="dense"
              size="small"
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
            <CustomTextField
              {...field}
              id="observacion-form"
              label="Observación"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itten_observacion)}
            />
          )}
        />
        <div className={styles.error}>{errors.itten_observacion?.message}</div>
        <div className={styles.button_container}>
          <CustomButton
            type="submit"
            variant="outlined"
            className={styles.button}
            disabled={loading}
          >
            {loading ? <Loading /> : <div>Guardar</div>}
          </CustomButton>
        </div>
      </form>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            Tipo de encuesta guardada con exito
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default SurveyTypeForm;
