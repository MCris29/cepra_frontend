import * as React from 'react';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import {Grid, Typography} from "@mui/material";
export default function ErrorInformation() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '90vh', textAlign: "center", padding:{mobile:"10%"} }}
        >
            <Grid item xs={3}>
                    <CloudOffIcon
                        color="error"
                        sx={{height: '100px', width: "100px", color: "error", marginBottom: "20px"}}
                    />
                <Typography variant="h4" color="error">
                    <span>No se ha podido establecer conexión con el servidor</span>
                </Typography>
            </Grid>
        </Grid>
    );
}