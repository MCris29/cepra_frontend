import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid, Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingSelectedItem() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"

            sx={{ height: '100%', textAlign: "center"}}
        >
            <Grid item xs={3}>
                <Typography variant="h4" color="primary">
                    <span>Cargando información</span>
                </Typography>
                <Box sx={{
                    height: {desktop: '100%', laptop: '100%', tablet: '100%', mobile: '80%', min: "80%"},
                    width: {desktop: '100%', laptop: '100%', tablet: '100%', mobile: '80%', min: "80%"},
                }}
                >
                    <LinearProgress />
                </Box>
            </Grid>
        </Grid>
    );
}