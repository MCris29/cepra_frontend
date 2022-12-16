import React, { useState } from "react";
import styles from "@/styles/Organization.module.css";
import { Organizations } from "@/lib/organization";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Snackbar,
  styled,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import Saving from "@/components/Saving";
import LoadingInformation from "@/components/LoadingInformation";

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
  itorg_ruc: yup.string().required("Debe ingresar el Ruc de la organización"),
  itorg_nombre: yup
    .string()
    .required("Debe ingresar el ruc de la organización")
    .max(200, "Debe contener máximo 200 caracteres"),
  itorg_sector: yup
    .string()
    .required("Debe ingresar el sector")
    .max(200, "Debe contener máximo 200 caracteres"),
  itorg_subsector: yup
    .string()
    .required("Debe ingresar el subsector")
    .max(200, "Debe contener máximo 200 caracteres"),
  itorg_actividad: yup
    .string()
    .required("Debe ingresar la actividad")
    .max(200, "Debe contener máximo 200 caracteres"),
  itorg_num_empleados: yup
    .string()
    .required("Debe ingresar el número de empleados")
    .max(200, "Debe contener máximo 200 caracteres"),
});

const OrganizationForm = (props) => {
  const [province, setProvince] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityListState, setCityListState] = useState(false);
  const [city, setCity] = useState(props.data.itopc_codigo_ciudad);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { data, error } = useSWR("it/provinciaCiudadGrafico/", fetcher);

  if (error) return <>Error</>;
  if (!data) return <LoadingInformation />;

  const onSubmit = async (data) => {
    setLoading(true);

    const newOrganization = {
      itorg_ruc: data.itorg_ruc,
      itopc_codigo_ciudad: city,
      itorg_nombre: data.itorg_nombre,
      itorg_sector: data.itorg_sector,
      itorg_subsector: data.itorg_subsector,
      itorg_num_empleados: data.itorg_num_empleados,
      itorg_actividad: data.itorg_actividad,
      itorg_ubicacion: data.itorg_ubicacion,
    };

    try {
      const OrganizationData = await Organizations.update(
        props.id,
        newOrganization
      );
      setOpen(true);
    } catch (e) {
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

  const handleCityList = () => {
    let cities = [];
    data.data.map((province) => {
      cities = [...cities, province.ciudades];
    });

    return cities.flat();
  };

  const handleChangeProvince = (event) => {
    const newProvince = event.target.value;
    setProvince(newProvince);
    const newCity = data.data.find(
      (nextProvince) => nextProvince.itgop_codigo === newProvince
    );
    setCityList(newCity.ciudades);
    setCityListState(true);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div className={styles.form_container}>
        <h4 className="title">Organización</h4>
        <form id="form-organizacion" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="itorg_ruc"
            control={control}
            defaultValue={props.data.itorg_ruc}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="ruc-form"
                label="Ruc"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                disabled
                error={Boolean(errors.itorg_ruc)}
              />
            )}
          />
          <span className={styles.error}>{errors.itorg_ruc?.message}</span>
          <Controller
            name="itorg_nombre"
            control={control}
            defaultValue={props.data.itorg_nombre}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itorg_nombre-form"
                label="Organización"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={Boolean(errors.itorg_nombre)}
              />
            )}
          />
          <span className={styles.error}>{errors.itorg_nombre?.message}</span>
          <Controller
            name="itgop_codigo"
            control={control}
            defaultValue={props.data.itgop_codigo}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itgop_codigo"
                label="Provincia"
                helperText="Por favor selecciona una provincia"
                variant="outlined"
                margin="dense"
                size="small"
                select
                fullWidth
                value={province}
                onChange={handleChangeProvince}
              >
                {data ? (
                  data.data.map((item, index) => (
                    <MenuItem key={index} value={item.itgop_codigo}>
                      {item.itopc_nombre}
                    </MenuItem>
                  ))
                ) : (
                  <span>Cargando...</span>
                )}
              </CustomTextField>
            )}
          />
          <Controller
            name="itopc_codigo"
            control={control}
            defaultValue={props.data.itopc_codigo_ciudad}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itopc_codigo"
                label="Ciudad"
                helperText="Por favor selecciona una ciudad"
                variant="outlined"
                margin="dense"
                size="small"
                select
                required
                fullWidth
                value={city}
                onChange={handleChangeCity}
              >
                {cityListState
                  ? cityList.map((item, index) => (
                      <MenuItem key={index} value={item.itopc_codigo}>
                        {item.itopc_nombre}
                      </MenuItem>
                    ))
                  : handleCityList().map((item, index) => (
                      <MenuItem key={index} value={item.itopc_codigo}>
                        {item.itopc_nombre}
                      </MenuItem>
                    ))}
              </CustomTextField>
            )}
          />
          <Controller
            name="itorg_ubicacion"
            control={control}
            defaultValue={props.data.itorg_ubicacion}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itorg_ubicacion-form"
                label="Ubicación"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={Boolean(errors.itorg_ubicacion)}
              />
            )}
          />
          <Controller
            name="itorg_sector"
            control={control}
            defaultValue={props.data.itorg_sector}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itorg_sector-form"
                label="Sector"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={Boolean(errors.itorg_sector)}
              />
            )}
          />
          <span className={styles.error}>{errors.itorg_sector?.message}</span>
          <Controller
            name="itorg_subsector"
            control={control}
            defaultValue={props.data.itorg_subsector}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itorg_subsector-form"
                label="Subsector"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={Boolean(errors.itorg_subsector)}
              />
            )}
          />
          <span className={styles.error}>
            {errors.itorg_subsector?.message}
          </span>
          <Controller
            name="itorg_actividad"
            control={control}
            defaultValue={props.data.itorg_actividad}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itorg_actividad-form"
                label="Actividad"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={Boolean(errors.itorg_actividad)}
              />
            )}
          />
          <span className={styles.error}>
            {errors.itorg_actividad?.message}
          </span>
          <Controller
            name="itorg_num_empleados"
            control={control}
            defaultValue={props.data.itorg_num_empleados}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                id="itorg_num_empleados-form"
                label="# de empleados"
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={Boolean(errors.itorg_num_empleados)}
              />
            )}
          />
          <span className={styles.error}>
            {errors.itorg_num_empleados?.message}
          </span>

          <div className={styles.button_container}>
            <CustomButton type="submit" variant="outlined" disabled={loading}>
              {loading ? <Saving /> : <div>Guardar</div>}
            </CustomButton>
          </div>
        </form>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={"success"}
              sx={{ width: "100%" }}
            >
              Registro actualizado con exito
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </>
  );
};

export default OrganizationForm;
