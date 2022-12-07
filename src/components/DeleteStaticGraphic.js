import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";

import { Button, Box, Modal, Stack, Snackbar, styled } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

import { StaticGraphics } from "@/lib/staticGraphic";

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
  margin: "0 4px",

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 0,
  boxShadow: 24,
  p: 4,
};

const DeleteStaticGraphic = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = async () => {
    try {
      await StaticGraphics.deleteStaticGraphic(props.id);
      props.refresh();
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
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
      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ borderRadius: 0 }}
        onClick={handleOpenModal}
      >
        <DeleteIcon />
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>
            ¿Está seguro que desea eliminar el gráfico de{" "}
            <strong>{props.title}</strong>?
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton className={styles.button} onClick={handleDelete}>
              Eliminar
            </CustomButton>
            <CustomButton className={styles.button} onClick={handleCloseModal}>
              Cancelar
            </CustomButton>
          </div>
        </Box>
      </Modal>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            Gráfico eliminado con exito
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default DeleteStaticGraphic;
