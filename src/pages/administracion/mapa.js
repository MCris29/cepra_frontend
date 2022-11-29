import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/Survey.module.css";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import ThemeCepra from "@/constants/theme";
import prov_Ecuador from "@/constants/prov_Ec.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: ThemeCepra.landing.breakpoints,
});

export default function Mapa() {
  // console.log(prov_Ecuador.features[0].geometry.coordinates)
  const [provincia, setProvincia] = useState("Todas");
  const [ciudad, setCiudad] = useState("Todas");
  const [empleados, setEmpleados] = useState("Todas");
  const [markersMap, setMarkersMap] = useState([]);
  const { data: dataProvincia, error: errorProvincia } = useSWR(
    "it/provinciaCiudadGrafico/",
    fetcher
  );
  const [dataMap] = useState({
    pisitionMap: [-1.8, -83.0],
    zoomMap: 6,
    polygonMap: [],
  });

  const handleCiudad = (event) => {
    setCiudad(event.target.value);
  };

  const handleEmpleados = (event) => {
    setEmpleados(event.target.value);
  };

  const { data, error } = useSWR("it/itorganizacion/", fetcher);

  const handleProvincia = (event) => {
    setProvincia(event.target.value);
  };

  const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  if (data) {
    if (data.data) {
      markersMap.splice(0, markersMap.length);
      var provinciaPosition = 0;
      switch (provincia) {
        case "Todas":
          dataMap.positionMap = [-1.8, -79.0];
          dataMap.zoomMap = 7;
          dataMap.polygonMap = [];
          dataMap.multipolygonMap = [
            {
              total: 0,
              polygon: prov_Ecuador.features[0].geometry.coordinates,
              id: 17,
            }, //Azuay
            {
              total: 0,
              polygon: prov_Ecuador.features[1].geometry.coordinates,
              id: 24,
            }, //Bolívar
            {
              total: 0,
              polygon: prov_Ecuador.features[2].geometry.coordinates,
              id: 14,
            }, //Cañar
            {
              total: 0,
              polygon: prov_Ecuador.features[3].geometry.coordinates,
              id: 12,
            }, //Carchi
            {
              total: 0,
              polygon: prov_Ecuador.features[4].geometry.coordinates,
              id: 7,
            }, //Cotopaxi
            {
              total: 0,
              polygon: prov_Ecuador.features[5].geometry.coordinates,
              id: 22,
            }, //Chimborazo
            {
              total: 0,
              polygon: prov_Ecuador.features[6].geometry.coordinates,
              id: 20,
            }, //El Oro
            {
              total: 0,
              polygon: prov_Ecuador.features[7].geometry.coordinates,
              id: 15,
            }, //Esmeraldas
            {
              total: 0,
              polygon: prov_Ecuador.features[8].geometry.coordinates,
              id: 5,
            }, //Guayas
            {
              total: 0,
              polygon: prov_Ecuador.features[9].geometry.coordinates,
              id: 26,
            }, //Imbabura
            {
              total: 0,
              polygon: prov_Ecuador.features[10].geometry.coordinates,
              id: 10,
            }, //Loja
            {
              total: 0,
              polygon: prov_Ecuador.features[11].geometry.coordinates,
              id: 8,
            }, //Los Ríos
            {
              total: 0,
              polygon: prov_Ecuador.features[12].geometry.coordinates,
              id: 25,
            }, //Manabí
            {
              total: 0,
              polygon: prov_Ecuador.features[13].geometry.coordinates,
              id: 21,
            }, //Morona Santiago
            {
              total: 0,
              polygon: prov_Ecuador.features[14].geometry.coordinates,
              id: 24,
            }, //Napo
            {
              total: 0,
              polygon: prov_Ecuador.features[15].geometry.coordinates,
              id: 16,
            }, //Pastaza
            {
              total: 0,
              polygon: prov_Ecuador.features[16].geometry.coordinates,
              id: 6,
            }, //Pichincha
            {
              total: 0,
              polygon: prov_Ecuador.features[17].geometry.coordinates,
              id: 9,
            }, //Tungurahua
            {
              total: 0,
              polygon: prov_Ecuador.features[18].geometry.coordinates,
              id: 18,
            }, //Zamora Chinchipe
            {
              total: 0,
              polygon: prov_Ecuador.features[19].geometry.coordinates,
              id: 27,
            }, //Galápagos
            {
              total: 0,
              polygon: prov_Ecuador.features[20].geometry.coordinates,
              id: 19,
            }, //Sucumbíos
            {
              total: 0,
              polygon: prov_Ecuador.features[21].geometry.coordinates,
              id: 23,
            }, //Orellana
            {
              total: 0,
              polygon: prov_Ecuador.features[22].geometry.coordinates,
              id: 28,
            }, //Santo Domingo
            {
              total: 0,
              polygon: prov_Ecuador.features[23].geometry.coordinates,
              id: 13,
            }, //Santa Elena
          ];
          dataMap.isMultipolygon = true;
          provinciaPosition = 0;
          break;
        case 3: //Guayas
          dataMap.positionMap = [-2.0, -80.0];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[8].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 5;
          break;
        case 4: //Pichincha
          dataMap.positionMap = [-0.2, -78.5];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[16].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 6;
          break;
        case 5: //Cotopaxi
          dataMap.positionMap = [-0.8, -78.8];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[4].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 7;
          break;
        case 6: //Los Ríos
          dataMap.positionMap = [-1.4, -79.8];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[11].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 8;
          break;
        case 7: //Tungurahua
          dataMap.positionMap = [-1.25, -78.5];
          dataMap.zoomMap = 10;
          dataMap.polygonMap = prov_Ecuador.features[17].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 9;
          break;
        case 8: //Loja
          dataMap.positionMap = [-4.0, -79.6];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[10].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 10;
          break;
        case 9: //Santo Domingo
          dataMap.positionMap = [-0.3, -79.3];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[22].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 11;
          break;
        case 10: //Carchi
          dataMap.positionMap = [0.8, -78.1];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[3].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 12;
          break;
        case 11: //Santa Elena
          dataMap.positionMap = [-2.0, -80.6];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[23].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 13;
          break;
        case 12: //Cañar
          dataMap.positionMap = [-2.5, -79.2];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[2].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 14;
          break;
        case 13: //Esmeraldas
          dataMap.positionMap = [0.8, -79.4];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[7].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 15;
          break;
        case 14: //Pastaza
          dataMap.positionMap = [-1.8, -77.0];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[15].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 16;
          break;
        case 15: //Azuay
          dataMap.positionMap = [-3.05, -79.2];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[0].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 17;
          break;
        case 16: //Zamora Chinchipe
          dataMap.positionMap = [-4.2, -78.8];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[18].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 18;
          break;
        case 17: //Sucumbíos
          dataMap.positionMap = [-0.2, -76.6];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[20].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 19;
          break;
        case 18: //El Oro
          dataMap.positionMap = [-3.5, -79.9];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[6].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 20;
          break;
        case 19: //Morona Santiago
          dataMap.positionMap = [-2.5, -77.9];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[13].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 21;
          break;
        case 20: //Chimborazo
          dataMap.positionMap = [-2.0, -78.7];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[5].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 22;
          break;
        case 21: //Orellana
          dataMap.positionMap = [-0.9, -76.6];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[21].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 23;
          break;
        case 22: //Bolívar
          dataMap.positionMap = [-1.7, -79.1];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[1].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 24;
          break;
        case 23: //Manabí
          dataMap.positionMap = [-0.8, -80.1];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[12].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 25;
          break;
        case 24: //Imbabura
          dataMap.positionMap = [0.5, -78.5];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[9].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 26;
          break;
        case 25: //Galápagos
          dataMap.positionMap = [-0.4, -90.5];
          dataMap.zoomMap = 8;
          dataMap.polygonMap = prov_Ecuador.features[19].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 27;
          break;
        case 26: //Santo Domingo
          dataMap.positionMap = [-0.3, -79.3];
          dataMap.zoomMap = 9;
          dataMap.polygonMap = prov_Ecuador.features[22].geometry.coordinates;
          dataMap.isMultipolygon = false;
          provinciaPosition = 28;
          break;
        default:
          dataMap.positionMap = [-1.8, -83.0];
          dataMap.zoomMap = 6;
          dataMap.polygonMap = [];
          dataMap.isMultipolygon = false;
          provinciaPosition = 0;
          break;
      }

      data.data.map((organizacion) => {
        let ubicacion = [];
        if (organizacion.itorg_ubicacion.length > 1) {
          organizacion.itorg_ubicacion.split(",").map((coordenadas) => {
            ubicacion.push(parseFloat(coordenadas));
          });
          ubicacion.reverse();
          if (provinciaPosition == 0) {
            dataMap.multipolygonMap.map((obj) => {
              if (obj.id === organizacion.itopc_codigo_ciudad) {
                obj.total += 1;
              }
              return obj;
            });
          }
          if (provinciaPosition == 0 && empleados === "Todas") {
            markersMap.push({
              nombre: organizacion.itorg_nombre,
              sector: organizacion.itorg_sector,
              subsector: organizacion.itorg_subsector,
              num_empleados: organizacion.itorg_num_empleados,
              position: ubicacion,
            });
          } else if (provinciaPosition == 0 && empleados !== "Todas") {
            if (empleados === organizacion.itorg_num_empleados) {
              markersMap.push({
                nombre: organizacion.itorg_nombre,
                sector: organizacion.itorg_sector,
                subsector: organizacion.itorg_subsector,
                num_empleados: organizacion.itorg_num_empleados,
                position: ubicacion,
              });
            }
          } else if (provinciaPosition != 0 && empleados === "Todas") {
            if (provinciaPosition == organizacion.itopc_codigo_ciudad) {
              markersMap.push({
                nombre: organizacion.itorg_nombre,
                sector: organizacion.itorg_sector,
                subsector: organizacion.itorg_subsector,
                num_empleados: organizacion.itorg_num_empleados,
                position: ubicacion,
              });
            }
          } else {
            if (
              provinciaPosition == organizacion.itopc_codigo_ciudad &&
              empleados === organizacion.itorg_num_empleados
            ) {
              markersMap.push({
                nombre: organizacion.itorg_nombre,
                sector: organizacion.itorg_sector,
                subsector: organizacion.itorg_subsector,
                num_empleados: organizacion.itorg_num_empleados,
                position: ubicacion,
              });
            }
          }
        }
      });
      if (markersMap.length < 5) {
        dataMap.color = "#3ac02c";
      } else if (markersMap.length < 10) {
        dataMap.color = "#c2b80d";
      } else if (markersMap.length < 15) {
        dataMap.color = "#349bd3";
      } else if (markersMap.length < 100) {
        dataMap.color = "#d54949";
      } else if (markersMap.length < 150) {
        dataMap.color = "#e51a39";
      }

      return (
        <>
          <ThemeProvider theme={theme}>
            <div>
              <h4 className="title">Mapa de la organizaciones encuestadas</h4>
            </div>
            <Box
              sx={{
                marginBottom: {
                  desktop: "1%",
                  laptop: "1%",
                  tablet: "1%",
                  mobile: "0",
                  min: "0",
                },
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {
                  desktop: "row",
                  laptop: "row",
                  tablet: "row",
                  mobile: "column",
                  min: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    desktop: "32%",
                    laptop: "32%",
                    tablet: "32%",
                    mobile: "100%",
                    min: "100%",
                  },
                  height: {
                    desktop: "100%",
                    laptop: "100%",
                    tablet: "100%",
                    mobile: "34%",
                    min: "34%",
                  },
                  margin: {
                    desktop: "0",
                    laptop: "0",
                    tablet: "0",
                    mobile: "6px 0",
                    min: "6px 0",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">
                    Provincia
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={provincia}
                    label="Provincia"
                    onChange={handleProvincia}
                  >
                    <MenuItem value={"Todas"}>Todas</MenuItem>
                    {dataProvincia ? (
                      dataProvincia.data.map((item, index) => (
                        <MenuItem key={index} value={item.itgop_codigo}>
                          {item.itopc_nombre}
                        </MenuItem>
                      ))
                    ) : (
                      <span>Cargando...</span>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: {
                    desktop: "32%",
                    laptop: "32%",
                    tablet: "32%",
                    mobile: "100%",
                    min: "100%",
                  },
                  height: {
                    desktop: "100%",
                    laptop: "100%",
                    tablet: "100%",
                    mobile: "34%",
                    min: "34%",
                  },
                  margin: {
                    desktop: "0",
                    laptop: "0",
                    tablet: "0",
                    mobile: "6px 0",
                    min: "6px 0",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ciudad}
                    label="Ciudad"
                    onChange={handleCiudad}
                  >
                    <MenuItem value={"Todas"}>Todas</MenuItem>
                    <MenuItem value={"Ambato"}>Ambato</MenuItem>
                    <MenuItem value={"Quito"}>Quito</MenuItem>
                    <MenuItem value={"Guayaquil"}>Guayaquil</MenuItem>
                    <MenuItem value={"Cuenca"}>Cuenca</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: {
                    desktop: "32%",
                    laptop: "32%",
                    tablet: "32%",
                    mobile: "100%",
                    min: "100%",
                  },
                  height: {
                    desktop: "100%",
                    laptop: "100%",
                    tablet: "100%",
                    mobile: "34%",
                    min: "34%",
                  },
                  margin: {
                    desktop: "0",
                    laptop: "0",
                    tablet: "0",
                    mobile: "6px 0",
                    min: "6px 0",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">
                    Empleados
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={empleados}
                    label="Empleados"
                    onChange={handleEmpleados}
                  >
                    <MenuItem value={"Todas"}>Todas</MenuItem>
                    <MenuItem value={"Menos de 10 empleados"}>
                      Menos de 10 empleados
                    </MenuItem>
                    <MenuItem value={"De 10 a 49 empleados"}>
                      De 10 a 49 empleados
                    </MenuItem>
                    <MenuItem value={"De 50 a 99 empleados"}>
                      De 50 a 99 empleados
                    </MenuItem>
                    <MenuItem value={"Más de 200 empleados"}>
                      Más de 200 empleados
                    </MenuItem>
                    <MenuItem value={"0"}>0</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                    <MenuItem value={"9"}>9</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"11"}>11</MenuItem>
                    <MenuItem value={"12"}>12</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              id="map"
              sx={{
                height: {
                  desktop: "73vh",
                  laptop: "73vh",
                  tablet: "73vh",
                  mobile: "54vh",
                  min: "54vh",
                },
                width: "100%",
              }}
            >
              <MapWithNoSSR data={dataMap} markers={markersMap} />
            </Box>
          </ThemeProvider>
        </>
      );
    }
  }
}
