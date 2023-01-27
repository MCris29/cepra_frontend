import React, { useState } from "react";
import Routes from "@/constants/routes";
import { useRouter } from "next/router";
import styles from "@/styles/Survey.module.css";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { TextField, Button, Stack, Snackbar, styled } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useAuth } from "@/lib/auth";
import { Passwords } from "@/lib/password";
import withAuth from "@/hocs/withAuth";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";

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
  itus_password: yup.string(),
  password_confirmation: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const UserId = () => {
  const { user } = useAuth();
  const router = useRouter();
  const userId = router.query.id;

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

  const { data, error } = useSWR(`it/itusuarios/${userId}`, fetcher);

  if (error) return <ErrorInformation />;
  if (!data) return <LoadingInformation />;

  const onSubmit = async (userData) => {
    setLoading(true);
    setPasswordError();
    console.log(userData);

    if (userData.itus_password == userData.confirm_password) {
      try {
        const jsonUserData = {
          itus_nombre: data.data.itus_nombre,
          itus_contacto: data.data.itus_contacto,
          itus_correo: data.data.itus_correo,
          itus_password: userData.itus_password,
        };

        const passwordData = await Passwords.resetUser(userId, jsonUserData);
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

  if (user) {
    if (user.roles[0].itrol_codigo == 1) {
      return (
        <>
          <div className="main-admin-content">
            <h4 className="title">Resetear información</h4>
            <p>
              En esta sección puede cambiar la información de un usuario, además
              de cambiar la contraseña.
            </p>
            <form
              id="user-form"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="itus_password"
                control={control}
                defaultValue=""
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    id="itus_password-form"
                    label="Contraseña"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    type="password"
                    fullWidth
                    error={Boolean(errors.itus_password)}
                  />
                )}
              />
              <span className={styles.error}>
                {errors.itus_password?.message}
              </span>
              <Controller
                name="confirm_password"
                control={control}
                defaultValue=""
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    id="itus_c_password-form"
                    label="Confirme su contraseña"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    type="password"
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
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
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
          </div>
        </>
      );
    } else {
      router.push(Routes.PROFILE);
    }
  }
};

export default withAuth(UserId);
