import React, { useState } from "react";
import styles from "@/styles/Survey.module.css";

import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Snackbar,
  styled,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { StaticGraphics } from "@/lib/staticGraphic";
import ErrorInformation from "@/components/ErrorInformation";

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

const schema = yup.object().shape({
  itegr_titulo: yup
    .string()
    .required("Debe ingresar la fecha de vigencia de la encuesta"),
  itegr_observacion: yup
    .string()
    .max(200, "Debe contener máximo 200 caracteres"),
});

const StaticGraphicForm = () => {
  const [typeSurvey, setTypeSurvey] = useState("");
  const [surveyId, setSurveyId] = useState("");
  const [surveyList, setSurveyList] = useState([]);
  const [image, setImage] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { data, error } = useSWR("it/datosGrafico2/2", fetcher);

  if (!data) return <> </>;
  if (error) return <ErrorInformation />;

  const handleChangeTypeSurvey = (event) => {
    const newTypeSurvey = event.target.value;
    setTypeSurvey(newTypeSurvey);
    const newSurvey = data.data.find(
      (nextTypeSurvey) => nextTypeSurvey.tipoEncuesta === newTypeSurvey
    );
    setSurveyList(newSurvey.encuestas);
    setSurveyId("");
  };

  const handleChange = (event) => {
    let itenc_codigo = event.target.value;
    setSurveyId(itenc_codigo);
  };

  const handleFileName = (name) => {
    document.getElementById("file-span").innerHTML = name;
  };

  const handleFile = (e) => {
    let imageFile = e.target.files[0];
    if (
      imageFile.type === "image/jpeg" ||
      imageFile.type === "image/jpg" ||
      imageFile.type === "image/png"
    ) {
      setImage(imageFile);
      handleFileName(e.target.files[0].name);
      setErrorImage("");
    } else {
      setErrorImage("El archivo debe ser una imagen");
      handleFileName("Selecciona una imagen *");
      setImage(null);
    }
    setImage(e.target.files[0]);
  };
  const deleteFile = () => {
    document.getElementById("file-span").innerHTML = "Selecciona una imagen *";
    document.getElementById("button-file").value = "";
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const newStaticGraphic = {
      itenc_codigo: surveyId,
      itegr_titulo: data.itegr_titulo,
      itegr_observacion: data.itegr_observacion,
      itegr_imagen: image,
    };

    const formData = new FormData();
    formData.append("itenc_codigo", newStaticGraphic.itenc_codigo);
    formData.append("itegr_titulo", newStaticGraphic.itegr_titulo);
    formData.append("itegr_observacion", newStaticGraphic.itegr_observacion);
    formData.append("itegr_imagen", newStaticGraphic.itegr_imagen);

    try {
      const staticGraphicData = await StaticGraphics.create(formData);
      setOpen(true);

      //Reseteo los datos
      deleteFile();
      setSurveyId(0);
      setTypeSurvey(0);
      reset();
    } catch (e) {
      setLoading(false);
      console.log(e);
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

  if (data) {
    if (data.data) {
      let typeSurveyList = [];
      data.data.map((nextTypeSurvey) => {
        nextTypeSurvey.encuestas.map((nextSurvey, index) => {
          nextSurvey.id = index + 1;
        });
        typeSurveyList.push(nextTypeSurvey.tipoEncuesta);
      });
      return (
        <>
          <form
            id="form-encuesta-grafico-estatico"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <Controller
              name="typeSurvey"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  id="typeSurvey"
                  label="Tipo de encuesta"
                  helperText="Selecciona un tipo de encuesta"
                  variant="outlined"
                  type="date"
                  margin="dense"
                  size="small"
                  select
                  required
                  fullWidth
                  value={typeSurvey}
                  onChange={handleChangeTypeSurvey}
                >
                  {typeSurveyList.map((_typeSurvey, index) => (
                    <MenuItem key={index} value={_typeSurvey}>
                      {_typeSurvey}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            <Controller
              name="itenc_codigo"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="itenc_codigo"
                  label="Encuesta"
                  helperText="Por favor selecciona una encuesta"
                  variant="outlined"
                  type="date"
                  margin="dense"
                  size="small"
                  select
                  required
                  fullWidth
                  value={surveyId}
                  onChange={handleChange}
                >
                  {surveyList.map((type, index) => (
                    <MenuItem key={index} value={type.itenc_codigo}>
                      {type.itenc_observacion}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
            <Controller
              name="itegr_titulo"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="itegr-titulo-form"
                  label="Título"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  error={Boolean(errors.itegr_titulo)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <span className={styles.error}>{errors.itegr_titulo?.message}</span>

            <Controller
              name="itegr_observacion"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="iteg-observacion-form"
                  label="Observación"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  required
                  fullWidth
                  error={Boolean(errors.itegr_observacion)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <span className={styles.error}>
              {errors.itegr_observacion?.message}
            </span>

            <label
              htmlFor="button-file"
              className={styles.button_template_survey}
            >
              <input
                className={styles.input_file}
                accept=".png, .jpg, .jpeg"
                id="button-file"
                type="file"
                multiple
                onChange={(e) => handleFile(e)}
              />
              <span id="file-span">Selecciona una imagen *</span>
            </label>
            <span className={styles.error}>{errorImage ? errorImage : ""}</span>

            <div className={styles.button_container}>
              <Button
                type="submit"
                variant="outlined"
                disabled={loading}
                className={styles.button}
              >
                Guardar
              </Button>
            </div>
          </form>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={"success"}
                sx={{ width: "100%" }}
              >
                Imagen guardada con exito
              </Alert>
            </Snackbar>
          </Stack>
        </>
      );
    }
  }
};

export default StaticGraphicForm;
