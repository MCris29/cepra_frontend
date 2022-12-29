import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import { TextField, Button, Stack, Snackbar, styled } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Passwords } from "@/lib/password";
import { useAuth } from "@/lib/auth";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  itus_password: yup.string().required("Ingrese su contraseña actual."),
  itus_newPassword: yup.string().required("Ingrese su contraseña nueva."),
});

const ResetPasswordForm = () => {
  const { user } = useAuth();

  const [errorSubmit, setErrorSubmit] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setPasswordError();

    if (data.itus_newPassword == data.confirm_password) {
      try {
        const userData = {
          itus_correo: user.itus_correo,
          itus_password: data.itus_password,
          itus_newPassword: data.itus_newPassword,
        };

        const passwordData = await Passwords.reset(userData);
        console.log("passwordData", passwordData);
        if (passwordData.data.message == "Contraseña Actualizada") {
          reset();
          setOpen(true);
        } else {
          setErrorSubmit(passwordData.data.message);
          setOpenError(true);
        }
      } catch (e) {
        console.log("error", e);
        setLoading(false);
        setErrorSubmit("Algo salió mal, intentalo otra vez");
        setOpenError(true);
      }
    } else {
      setPasswordError("La contraseña no coincide.");
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

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  return (
    <>
      <h4 className="title">Cambiar contraseña</h4>
      <p>
        En esta sección puede cambiar su contraseña ingresando su contraseña
        actual y una contraseña nueva.
      </p>
      <form id="user-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
              label="Contraseña actual"
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
          name="itus_newPassword"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_newPassword-form"
              required
              label="Contraseña nueva"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(errors.itus_newPassword)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_newPassword?.message}</span>
        <Controller
          name="confirm_password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_correo-form"
              required
              label="Confirme su contraseña"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              error={Boolean(passwordError)}
            />
          )}
        />
        <div className={styles.error}>{passwordError}</div>

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
            Contraseña actualizada con exito
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

export default ResetPasswordForm;
