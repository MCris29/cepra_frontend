import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";
import { Button, TextField, styled } from "@mui/material";
import { useAuth } from "@/lib/auth";
import withAuth from "@/hocs/withAuth";

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
  itus_nombre: yup
    .string()
    .required("Ingrese su nombre")
    .max(255, "El nombre debe tener maximo 255 caracteres.")
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
      "El nombre solo debe contener letras"
    ),

  itus_contacto: yup
    .string()
    .required("Ingrese un teléfono.")
    .min(10, "El teléfono debe tener al menos 10 caracteres.")
    .max(20, "El teléfono debe tener máximo 13 caracteres.")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "El formato de teléfono es incorrecto"
    ),
});

const Profile = () => {
  const { user, editUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = await editUser(data);
      console.log("userData", userData);

      // handleOpenSucces();
    } catch (e) {
      console.log("error", e);
      alert("Algo salió mal, intentalo otra vez");
    }
    setLoading(false);
  };

  return (
    <div className="main-admin-content">
      <h4 className="title">Perfil</h4>
      <form
        id="user-form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="itus_nombre"
          control={control}
          defaultValue={user.itus_nombre}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_nombre-form"
              required
              label="Nombre"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              error={Boolean(errors.itus_nombre)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_nombre?.message}</span>
        <Controller
          name="itus_correo"
          control={control}
          defaultValue={user.itus_correo}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_correo-form"
              required
              disabled
              label="Correo"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              error={Boolean(errors.itus_correo)}
            />
          )}
        />
        <Controller
          name="itus_contacto"
          control={control}
          defaultValue={user.itus_contacto}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              id="itus_contacto-form"
              required
              label="Teléfono"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              error={Boolean(errors.itus_contacto)}
            />
          )}
        />
        <span className={styles.error}>{errors.itus_contacto?.message}</span>
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
    </div>
  );
};

export default withAuth(Profile);
