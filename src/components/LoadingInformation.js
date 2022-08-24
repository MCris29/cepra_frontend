import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingInformation() {
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

                <Typography variant="h4" color="primary">
                    <span>Cargando información</span>
                </Typography>
                <Box sx={{ width: '100%', paddingTop: "20px"}}>
                    <LinearProgress />
                </Box>
            </Grid>
        </Grid>
    );
}