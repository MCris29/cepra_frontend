import React from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/Survey.module.css";
import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";

export default function Mapa() {
    const { data, error } = useSWR("it/itorganizacion/", fetcher);
    const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
        ssr: false
    });
    if(data) {
        if(data.data) {
            const markersMap = [];
            data.data.map((organizacion) => {
                let ubicacion = [];
                if(organizacion.itorg_ubicacion.length>0) {
                    organizacion.itorg_ubicacion.split(",").map((coordenadas) => {
                        ubicacion.push(parseFloat(coordenadas));
                    });
                }
                markersMap.push({
                    nombre: organizacion.itorg_nombre,
                    sector: organizacion.itorg_sector,
                    subsector: organizacion.itorg_subsector,
                    num_empleados: organizacion.itorg_num_empleados,
                    position: ubicacion
                })
            });

            return (
                <>

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: {
                                desktop: "2em",
                                laptop: "1.5em",
                                tablet: "1.5em",
                                mobile: "1.5em",
                                min: "1.5em",
                            },
                            marginBottom: "1%"
                        }}
                    >
                        <span>Mapa de la organizaciones encuestadas</span>
                    </Typography>
                    <Grid container justifyContent = "center">
                        <Box id="map" sx={{ height: "600px", width: "800px" }}>
                            <MapWithNoSSR data={markersMap} />
                        </Box>
                    </Grid>
                </>
            );
        }
    }



}