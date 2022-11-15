import React, { useState, useEffect } from "react";
import styles from "@/styles/Organization.module.css";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Stack,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import { SurveyTemplates } from "@/lib/SurveyTemplate";
import { Organization } from "@/models/organization";
import { Contact } from "@/models/contact";
import { SurveyReplys } from "@/lib/surveyReply";

import ErrorInformation from "@/components/ErrorInformation";
import LoadingInformation from "@/components/LoadingInformation";

const formOrganization = {
  itorg_ruc: {
    label: "RUC",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar el RUC",
      pattern: { value: /^[0-9]+$/, message: "El RUC ingresado no es válido" },
    },
  },
  itorg_nombre: {
    label: "Nombre",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar el nombre de la organización",
    },
  },
  itorg_sector: {
    label: "Sector",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar el sector",
    },
  },
  itorg_subsector: {
    label: "Subsector",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar el subsector",
    },
  },
  itorg_num_empleados: {
    label: "Número de empleados",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar el número de empleados",
      // pattern: { value: /^[0-9]+$/, message: "Número no válido!" },
    },
  },
  itorg_ubicacion: {
    label: "Ubicación",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar la ubicación en coordenadas",
    },
  },
  itorg_provincia: {
    label: "Provincia",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar la provicia",
    },
  },
  itorg_ciudad: {
    label: "Ciudad",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar la ciudad",
    },
  },
};

const formContact = {
  itcon_nombre: {
    label: "Nombre",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar el nombre",
    },
  },
  itcon_email: {
    label: "Correo electrónico",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Debe ingresar un correo",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "El correo electrónico no es válido",
      },
    },
  },
  itcon_nivel_estudios: {
    label: "Nivel de estudios",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Campo obligatorio!",
    },
  },
  itcon_nivel_decision: {
    label: "Nivel de decisión",
    type: "text",
    defaultValue: "",
    rules: {
      required: "Campo obligatorio!",
    },
  },
};

const ReplyForm = () => {
  const [showSurveyForm, setShowSurveyForm] = useState(true);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [surveyType, setSurveyType] = useState("");
  const [survey, setSurvey] = useState("");
  const [surveyForm, setSurveyForm] = useState();
  const [surveyList, setSurveyList] = useState([]);
  const [surveyTemplate, setSurveyTemplate] = useState();
  const [organizationForm, setOrganizationForm] = useState();
  const [formInputsReply, setFormInputsReply] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorReply, setErrorReply] = useState("");

  //Cierra el mesnaje de exito al guardar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //Mensaje de alerta
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleChangeSurveyType = (type) => {
    setSurveyType(type);
    setSurvey("");
    const newSurvey = data.data.find(
      (nextTypeSurvey) => nextTypeSurvey.tipoEncuesta === type
    );
    setSurveyList(newSurvey.encuestas);
  };

  const handleChangeSurvey = (survey) => {
    setSurvey(survey);
    resetReply("", {
      keepValues: false,
    });
  };

  const {
    handleSubmit: handleSubmitSurvey,
    control: controlSurvey,
    formState: { errors: errorsSurvey },
  } = useForm();

  const {
    handleSubmit: handleSubmitOrganization,
    control: controlOrganization,
    formState: { errors: errorsOrganization },
  } = useForm();

  let {
    handleSubmit: handleSubmitReply,
    control: controlReply,
    formState: { errors: errorsReply },
    reset: resetReply,
  } = useForm();

  const loadFormDataSurvey = () => {
    let data = [];
    surveyTemplate.categorias.map((category) => {
      let questions = [];
      category.preguntas.map((question) => {
        if (question.grupo_opciones === "") {
          questions.push({
            id: question.codigo_pregunta,
            label: question.nombre_pregunta,
            observation: question.observacion_pregunta,
            type: "text",
            defaultValue: "",
            rules: {
              // required: "Campo obligatorio!"
            },
          });
        } else {
          const options = [];
          question.grupo_opciones.opciones.map((option) => {
            options.push({
              value: option.itopc_nombre,
              label: option.itopc_nombre,
            });
          });
          questions.push({
            id: question.codigo_pregunta,
            label: question.nombre_pregunta,
            observation: question.observacion_pregunta,
            type: "options",
            defaultValue: "",
            rules: {
              // required: "Seleccione una opción!"
            },
            options: options,
          });
        }
      });
      data.push({
        name: category.nombre_categoria,
        questions: questions,
      });
    });
    setFormInputsReply(data);
  };

  const onSubmitSurvey = async (data) => {
    setLoading(true);
    data = {
      ...data,
      typeSurveyId: surveyList.find((item) => item.itenc_codigo === survey)
        .ittenc_codigo,
    };
    setSurveyForm(data);
    setSurveyTemplate(await SurveyTemplates.getWithCategoriesById(survey));
    setShowSurveyForm(false);
    setShowOrganizationForm(true);
    setLoading(false);
  };

  const onSubmitOrganization = (data) => {
    setLoading(true);
    setOrganizationForm(data);
    loadFormDataSurvey();
    setShowOrganizationForm(false);
    setShowReplyForm(true);
    setLoading(false);
  };

  const onReturnOrganization = () => {
    setShowSurveyForm(true);
    setShowOrganizationForm(false);
  };

  const onSubmitReply = async (data) => {
    setLoading(true);
    const organization = new Organization(
      organizationForm.itorg_ruc.toString().trim(), //itorg_ruc
      organizationForm.itorg_nombre.toString().trim(), //itorg_nombre
      organizationForm.itorg_sector.toString().trim(), //itorg_sector
      organizationForm.itorg_subsector.toString().trim(), //itorg_subsector
      organizationForm.itorg_num_empleados.toString().trim(), //itorg_num_empleados
      organizationForm.itorg_ubicacion.toString().trim(), //itorg_ubicacion
      organizationForm.itorg_provincia.toString().trim(), //itorg_provincia
      organizationForm.itorg_ciudad.toString().trim() //itorg_ciudad
    );
    const contact = new Contact(
      organizationForm.itcon_nombre.toString().trim(), //itcon_nombre
      organizationForm.itcon_email.toString().trim(), //itcon_email
      organizationForm.itcon_nivel_estudios.toString().trim(), //itcon_nivel_estudios
      organizationForm.itcon_nivel_decision.toString().trim() //itcon_nivel_decision
    );
    const surveyQuestions = await SurveyTemplates.getById(survey);
    const newQuestionReplyArray = [];

    Object.keys(data).map((reply) => {
      //Busca la pregunta de la organizacion en las
      //preguntas de la plantilla
      let questionTemplate = surveyQuestions.preguntas.find(
        (_questionTemplate) =>
          reply === _questionTemplate.itpre_codigo.toString()
      );
      if (questionTemplate) {
        let itopc_codigo = "";
        //Verifica si tiene grupo de opciones
        if (questionTemplate.grupo_opciones != "") {
          let optionArray = questionTemplate.grupo_opciones.opciones;

          //Busca la respuesta en el grupo de opciones
          let option = optionArray.find(
            (_option) => _option.itopc_nombre == data[reply]
          );

          //Verifica si existe la respuesta en el grupo de opciones
          if (option) {
            itopc_codigo = option.itopc_codigo;
          }
        }

        let newQuestionReply = {
          itepr_codigo: questionTemplate.itepr_codigo,
          itopc_codigo: itopc_codigo,
          itrde_respuesta: data[reply],
        };
        newQuestionReplyArray.push(newQuestionReply);
      }
    });

    let newSurveyReply = {
      itenc_codigo: surveyForm.surveyId,
      itten_codigo: surveyForm.typeSurveyId,
      itres_fecha_test: surveyForm.fechaTest,
      organizacion: organization,
      contacto: contact,
      respuestas: newQuestionReplyArray,
    };
    try {
      const surveyData = await SurveyReplys.create(newSurveyReply);
      setOpen(true);
    } catch (error) {
      console.log(error);
      setErrorReply(errorReply);
      setOpenError(true);
    }
    setLoading(false);
  };

  const onReturnReply = () => {
    setShowOrganizationForm(true);
    setShowReplyForm(false);
  };

  const { data, error } = useSWR("it/datosGrafico2/2", fetcher, {
    shouldRetryOnError: false,
  });
  if (error) {
    return <ErrorInformation />;
  }
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
        <div className="wrapper">
          <h4>Respuesta individual</h4>
          <p>
            En esta sección se suben las respuestas individualmente, para ello
            debe seleccionar la encuesta que va responder y llenar los campos.
          </p>
          {showSurveyForm ? (
            <form
              key="formSurvey"
              onSubmit={handleSubmitSurvey(onSubmitSurvey)}
            >
              <section style={{ marginBottom: "10px" }}>
                <Controller
                  name={"typeSurvey"}
                  control={controlSurvey}
                  defaultValue=""
                  rules={{
                    required: "Campo obligatorio!",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tipo de encuesta"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      select
                      fullWidth
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        handleChangeSurveyType(event.target.value);
                      }}
                      error={Boolean(errorsSurvey["typeSurvey"])}
                    >
                      {typeSurveyList.map((_typeSurvey, index) => (
                        <MenuItem key={index} value={_typeSurvey}>
                          {_typeSurvey}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {errorsSurvey["typeSurvey"] && (
                  <span style={{ color: "red" }}>
                    {errorsSurvey["typeSurvey"].message}
                  </span>
                )}
              </section>
              <section style={{ marginBottom: "10px" }}>
                <Controller
                  name="surveyId"
                  control={controlSurvey}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Encuesta"
                      variant="outlined"
                      margin="dense"
                      size="small"
                      required
                      select
                      fullWidth
                      value={survey}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        handleChangeSurvey(event.target.value);
                      }}
                      error={Boolean(errorsSurvey["surveyId"])}
                    >
                      {surveyList.map((type, index) => (
                        <MenuItem key={index} value={type.itenc_codigo}>
                          {type.itenc_observacion}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {errorsSurvey["surveyId"] && (
                  <span style={{ color: "red" }}>
                    {errorsSurvey["surveyId"].message}
                  </span>
                )}
              </section>
              <section style={{ marginBottom: "10px" }}>
                <Controller
                  name="fechaTest"
                  control={controlSurvey}
                  defaultValue=""
                  rules={{
                    required: "Campo obligatorio!",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fecha test"
                      variant="outlined"
                      type="date"
                      margin="dense"
                      size="small"
                      fullWidth
                      value={field.value}
                      onChange={(event) => field.onChange(event.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(errorsSurvey["fechaTest"])}
                    />
                  )}
                />
                {errorsSurvey["fechaTest"] && (
                  <span style={{ color: "red" }}>
                    {errorsSurvey["fechaTest"].message}
                  </span>
                )}
              </section>
              <br />
              <hr />
              <div className={styles.button_container}>
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={loading}
                  className={styles.button}
                >
                  Llenar encuesta
                </Button>
              </div>
            </form>
          ) : (
            <></>
          )}
          {showOrganizationForm ? (
            <form
              key="formOrganization"
              onSubmit={handleSubmitOrganization(onSubmitOrganization)}
            >
              <h4>Datos de organización</h4>
              {Object.keys(formOrganization).map((e, index) => (
                <section key={`org-${index}`} style={{ marginBottom: "10px" }}>
                  <Controller
                    name={e}
                    control={controlOrganization}
                    rules={formOrganization[e].rules}
                    defaultValue={formOrganization[e].defaultValue}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={formOrganization[e].label}
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={(event) => field.onChange(event.target.value)}
                        error={Boolean(errorsOrganization[e])}
                      />
                    )}
                  />
                  {errorsOrganization[e] && (
                    <span style={{ color: "red" }}>
                      {errorsOrganization[e].message}
                    </span>
                  )}
                </section>
              ))}
              <h4>Datos de contacto</h4>
              {Object.keys(formContact).map((e, index) => (
                <section key={`cont-${index}`} style={{ marginBottom: "10px" }}>
                  <Controller
                    name={e}
                    control={controlOrganization}
                    rules={formContact[e].rules}
                    defaultValue={formContact[e].defaultValue}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={formContact[e].label}
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={field.value}
                        onChange={(event) => field.onChange(event.target.value)}
                        error={Boolean(errorsOrganization[e])}
                      />
                    )}
                  />
                  {errorsOrganization[e] && (
                    <span style={{ color: "red" }}>
                      {errorsOrganization[e].message}
                    </span>
                  )}
                </section>
              ))}
              <br />
              <hr />
              <Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={onReturnOrganization}
                >
                  <div>Regresar</div>
                </Button>

                <Button
                  type="submit"
                  variant="outlined"
                  disabled={loading}
                  className={styles.button}
                >
                  <div>Siguiente</div>
                </Button>
              </Box>
            </form>
          ) : (
            <></>
          )}
          {showReplyForm ? (
            <>
              <form key="formReply" onSubmit={handleSubmitReply(onSubmitReply)}>
                <h2 key="titleReply">{surveyTemplate.encuesta_observacion}</h2>
                {formInputsReply.map((category, indexCategory) => (
                  <Box key={indexCategory}>
                    <h3>{category.name}</h3>
                    {category.questions.map((question, indexQuestion) => (
                      <Box key={indexQuestion}>
                        <section style={{ marginBottom: "10px" }}>
                          <label>{question.label}</label>
                          <div>
                            <span>
                              <strong>Observación: </strong>
                              <pre
                                style={{
                                  fontFamily: "'Montserrat', sans-serif ",
                                  margin: 0,
                                }}
                              >
                                {question.observation}
                              </pre>
                            </span>
                          </div>
                          {question.type === "text" ? (
                            <>
                              <Controller
                                name={question.id.toString()}
                                control={controlReply}
                                rules={question.rules}
                                defaultValue={question.defaultValue}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    hiddenLabel
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                    fullWidth
                                    value={field.value}
                                    onChange={(event) =>
                                      field.onChange(event.target.value)
                                    }
                                    error={Boolean(
                                      errorsReply[question.id.toString()]
                                    )}
                                  />
                                )}
                              />
                              {errorsReply[question.id.toString()] && (
                                <span
                                  key={`s-${question.id}`}
                                  style={{ color: "red" }}
                                >
                                  {errorsReply[question.id.toString()].message}
                                </span>
                              )}
                            </>
                          ) : question.type === "options" ? (
                            <>
                              <Controller
                                name={question.id.toString()}
                                control={controlReply}
                                rules={question.rules}
                                defaultValue={question.defaultValue}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    hiddenLabel
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                    fullWidth
                                    select
                                    value={field.value}
                                    onChange={(event) =>
                                      field.onChange(event.target.value)
                                    }
                                    error={Boolean(
                                      errorsReply[question.id.toString()]
                                    )}
                                  >
                                    {question.options.map((option, index) => (
                                      <MenuItem
                                        key={index}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              />
                              {errorsReply[question.id.toString()] && (
                                <span
                                  key={`s-${question.id}`}
                                  style={{ color: "red" }}
                                >
                                  {errorsReply[question.id.toString()].message}
                                </span>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </section>
                      </Box>
                    ))}
                  </Box>
                ))}
                <br />
                <hr />
                <Box
                  component="span"
                  m={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="outlined"
                    className={styles.button}
                    onClick={onReturnReply}
                  >
                    <div>Regresar</div>
                  </Button>

                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={loading}
                    className={styles.button}
                  >
                    <div>Guardar</div>
                  </Button>
                </Box>
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
                    Respuesta guardada con exito
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
                    {errorReply}
                  </Alert>
                </Snackbar>
              </Stack>
            </>
          ) : (
            <></>
          )}
        </div>
      );
    } else {
      return <LoadingInformation />;
    }
  } else {
    return <LoadingInformation />;
  }
};

export default ReplyForm;
