import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Survey.module.css";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const QuestionList = (props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const { data, error } = useSWR("it/itencuestapregunta/", fetcher);
  console.log("data", data);

  if (error) return <>Error</>;
  if (!data) return <>Cargando...</>;

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen("paper")}
        className={styles.button_submit}
      >
        Ver preguntas
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Encuesta de {props.survey.id}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {"Encuesta " + props.survey.id + "     "}
            {[...new Array(50)]
              .map((item, index) => `Pregunta ${index}      `)
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionList;
