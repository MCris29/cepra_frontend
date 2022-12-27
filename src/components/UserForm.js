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

import { useAuth } from "@/lib/auth";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

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
  itus_nombre: yup
    .string()
    .required("Ingrese el nombre")
    .max(255, "El nombre debe tener maximo 255 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
      "El nombre solo debe contener letras"
    ),

  itus_contacto: yup
    .string()
    .required("Ingrese el teléfono.")
    .min(10, "El teléfono debe tener al menos 10 caracteres.")
    .max(20, "El teléfono debe tener máximo 13 caracteres.")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "El formato de teléfono es incorrecto"
    ),

  itus_correo: yup
    .string()
    .required("Ingrese el correo.")
    .max(255, "El correo debe tener máximo 255 caracteres.")
    .email("Ingrese un correo válido."),

  itus_password: yup
    .string()
    .required("Ingrese una contraseña.")
    .min(8, "La clave debe tener al menos 8 caracteres."),
  password_confirmation: yup
    .string()
    .required("Confirme la contraseña.")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const UserForm = () => {
  const [rol, setRol] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { register } = useAuth();

  const { data, error } = useSWR("it/itroles/", fetcher);

  if (!data) return <> </>;
  if (error) return <ErrorInformation />;

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorPassword("");
    try {
      if (data.itus_password == data.password_confirmation) {
        const jsonData = {
          itus_nombre: data.itus_nombre,
          itus_correo: data.itus_correo,
          itus_contacto: data.itus_contacto,
          itus_password: data.itus_password,
        };
        const userData = await register(jsonData);
        console.log("userData", userData);

        reset();
        setRol("");

        setOpen(true);
      } else {
        setErrorPassword("La contraseña no coincide");
      }
    } catch (e) {
      console.log("error", e);
      setLoading(false);
      setErrorSubmit("Ocurrió un error, es posile que el usuario ya exista");
      setOpenError(true);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setRol(event.target.value);
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

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <>
      <h4 className="title">Registrar un nuevo usuario</h4>
      <p className="paragraph">
        En esta sección se puede crear un nuevo usuario, para ello se debe
        llenar el formulario y presionar el botón de guardar.
      </p>
      <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="itus_nombre"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_nombre-form"
              required
              label="Nombre"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itus_nombre)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_nombre?.message}</span>
        <Controller
          name="itus_contacto"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_contacto-form"
              required
              label="Teléfono"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itus_contacto)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_contacto?.message}</span>
        <Controller
          name="itrol_codigo"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itrol_codigo"
              label="Rol"
              helperText="Por favor selecciona un rol"
              variant="outlined"
              type="date"
              margin="dense"
              size="small"
              select
              required
              fullWidth
              value={rol}
              onChange={handleChange}
            >
              {data ? (
                data.data.map((item, index) => (
                  <MenuItem key={index} value={item.itrol_codigo}>
                    {item.itrol_nombre}
                  </MenuItem>
                ))
              ) : (
                <span>Cargando...</span>
              )}
            </CustomTextField>
          )}
        />
        <Controller
          name="itus_correo"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_correo-form"
              required
              label="Correo"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itus_correo)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_correo?.message}</span>
        <Controller
          name="itus_password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_password-form"
              required
              label="Contraseña"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itus_password)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_password?.message}</span>
        <Controller
          name="password_confirmation"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="password_confirmation-form"
              required
              label="Confirmar contraseña"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.password_confirmation)}
            />
          )}
        />
        <span className={styles.error}>
          {errors.password_confirmation?.message}
        </span>
        <div className={styles.error}>{errorPassword}</div>

        <div className={styles.button_container}>
          <CustomButton
            type="submit"
            disabled={loading}
            className={styles.btn_login}
          >
            Guardar
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
            Usuario guardado con exito
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity={"error"}
            sx={{ width: "100%" }}
          >
            {errorSubmit}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default UserForm;
