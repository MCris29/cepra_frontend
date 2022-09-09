import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Survey.module.css";
import { Button, Box, Modal, Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import QuestionForm from "@/components/QuestionForm";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "72vh",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #c4c4c4",
  borderRadius: "4px",
  boxShadow: 24,
  padding: "12px 32px",
  overflow: "auto",
};

const ButtonAddQuestion = (props) => {
  const router = useRouter();
  const survey_id = router.query.id;

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //Mensaje de alerta
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleOpenAlert = () => setOpenAlert(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <Button
        className={styles.button}
        onClick={handleOpenModal}
        variant="outlined"
      >
        Añadir pregunta
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <h4>Añadir pregunta</h4>
          <QuestionForm
            category_id={props.category}
            survey_id={survey_id}
            closeModal={() => handleCloseModal()}
            openAlert={() => handleOpenAlert()}
          />
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            Pregunta guardada con exito
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default ButtonAddQuestion;
