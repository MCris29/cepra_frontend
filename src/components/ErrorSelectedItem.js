import * as React from 'react';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import {Grid, Typography} from "@mui/material";

const ErrorSelectedItem = () => {
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
                <CloudOffIcon
                    color="error"
                    sx={{
                        height: {desktop: '40%', laptop: '45%', tablet: '50%', mobile: '35%', min: "35%"},
                        width: {desktop: '40%', laptop: '45%', tablet: '50%', mobile: '35%', min: "35%"},
                    }}
                />
                <Typography variant="h4" color="error">
                    <span>No se ha podido establecer conexión con el servidor</span>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ErrorSelectedItem;