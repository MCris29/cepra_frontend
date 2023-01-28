import React, { useState } from "react";
import { useRouter } from "next/router";
import Routes from "@/constants/routes";
import styles from "@/styles/Survey.module.css";

import {
  styled,
  Button,
  Box,
  Modal,
  Snackbar,
  Stack,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SurveyTypes } from "@/lib/suveyType";

import Loading from "@/components/Saving";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "72vh",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #c4c4c4",
  boxShadow: 24,
  padding: "12px 32px",
  overflow: "auto",
};

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
  fontSize: 14,
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

const ButtonEditTypeSurvey = (props) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const surveyTypeData = await SurveyTypes.update(
        props.surveyType.itten_codigo,
        data
      );
      console.log("Data survey type", surveyTypeData);
      reset();
      handleCloseModal();
      handleOpenAlert();
      
      setTimeout(() => {
        router.reload(Routes.SURVEY);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //Mensaje de alerta
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleOpenErrorAlert = () => setOpenErrorAlert(true);
  const handleCloseErrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorAlert(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenModal} style={{ color: "#0c89cb" }}>
        <Tooltip title="Editar encuesta" placement="top-start" followCursor>
          <EditIcon />
        </Tooltip>
      </IconButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <h4 className="title">Editar tipo de encuesta</h4>
          <p className="paragraph">
            En esta sección puede editar un tipo de encuesta.
          </p>
          <form id="form-tipo-encuesta" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="itten_nombre"
              control={control}
              defaultValue={props.surveyType.itten_nombre}
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
              defaultValue={props.surveyType.itten_observacion}
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
            <div className={styles.error}>
              {errors.itten_observacion?.message}
            </div>
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
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          autoHideDuration={6000}
          open={openAlert}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            Tipo de encuesta actualizada con exito
          </Alert>
        </Snackbar>
        <Snackbar
          autoHideDuration={6000}
          open={openErrorAlert}
          onClose={handleCloseErrorAlert}
        >
          <Alert
            onClose={handleCloseErrorAlert}
            severity={"error"}
            sx={{ width: "100%" }}
          >
            <strong>Ocurrió un error</strong>
            <div>¿Quieres intentar de nuevo?</div>
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default ButtonEditTypeSurvey;
