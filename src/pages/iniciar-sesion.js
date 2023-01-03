import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
// import Routes from "@/constants/routes";
// import Link from "next/link";
import { Button, TextField, styled } from "@mui/material";

import { useAuth } from "@/lib/auth";
import withoutAuth from "@/hocs/withoutAuth";

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
  width: "100%",
  marginTop: "12px",
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
  email: yup
    .string()
    .required("Ingrese su email")
    .email("Ingrese un email válido"),
  password: yup
    .string()
    .required("Ingrese una contraseña válida")
    .min(6, "La clave debe tener al menos 6 caracteres"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const jsonData = {
      user: data.email,
      password: data.password,
    };
    try {
      const userData = await login(jsonData);
      if (userData.error) {
        setError(userData.error);
      }
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h4 className="title" style={{ marginBottom: 0 }}>
          Iniciar Sesión
        </h4>
        {error ? <span className={styles.error}>{error}</span> : <span></span>}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                variant="outlined"
                size="small"
                sx={{ marginTop: "12px" }}
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
              />
            )}
          />
          <span className={styles.error}>{errors.email?.message}</span>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                variant="outlined"
                size="small"
                sx={{ marginTop: "12px" }}
                required
                fullWidth
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                autoComplete="password"
                error={Boolean(errors.password)}
              />
            )}
          />
          <span className={styles.error}>{errors.password?.message}</span>

          <CustomButton
            type="submit"
            disabled={loading}
            className={styles.btn_login}
          >
            Iniciar Sesión
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default withoutAuth(Login);
