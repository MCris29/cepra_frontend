import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Routes from "@/constants/routes";

import { styled, Button, Box, Modal, Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { Surveys } from "@/lib/survey";

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

const DeleteButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  fontWeight: "bold",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "transparent",
  borderColor: "#d32f2f",
  borderRadius: 0,
  color: "#d32f2f",

  "&:hover": {
    boxShadow: "none",
    color: "#fff",
    backgroundColor: "#d32f2f",
    borderColor: "#d32f2f",
    transition: "0.3s",
  },
  "&:active": {
    boxShadow: "none",
    color: "#fff",
    backgroundColor: "#d32f2f",
    borderColor: "#d32f2f",
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

const DeleteSurvey = (props) => {
  const router = useRouter();
  const survey_id = router.query.id;

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [numAnswer, setNumAnswer] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    Surveys.getNumAnswers(survey_id).then((response) => {
      setNumAnswer(response.data.data.num_respuestas);
    });
  }, []);

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

  const handleDelete = () => {
    try {
      Surveys.deleteSurvey(survey_id).then((response) => {
        console.log(response);
        handleOpenAlert();
        handleCloseModal();
        setTimeout(() => {
          router.push(Routes.SURVEY);
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      handleCloseModal();
      handleOpenErrorAlert();
    }
  };

  return (
    <>
      <DeleteButton onClick={handleOpenModal}>Eliminar encuesta</DeleteButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <p>
            ¿Está seguro que desea eliminar la encuesta{" "}
            <strong>{props.surveyName}</strong>?
          </p>
          <p className="paragraph">
            <strong>Nota: </strong>
            Esta encuesta contiene <strong>{numAnswer}</strong> respuestas
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
            <CustomButton onClick={handleCloseModal}>Cancelar</CustomButton>
          </div>
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
            Encuesta eliminada con exito
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

export default DeleteSurvey;
