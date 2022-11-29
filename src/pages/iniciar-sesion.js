import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import Routes from "@/constants/routes";
import Link from "next/link";
import { Button, TextField } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("data", data);
    setLoading(true);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h4 className="title">Iniciar Sesión</h4>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
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
              <TextField
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

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={styles.button_submit}
          >
            Iniciar Sesión
          </Button> */}
          <Link href={Routes.MANAGEMENT}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={styles.button_submit}
            >
              Iniciar Sesión
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
