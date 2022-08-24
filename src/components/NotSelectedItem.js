import * as React from 'react';
import {Grid, Typography} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import {useState} from "react";

const NotSelectedItem = (props) =>  {
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
                <BarChartIcon
                    color="primary"
                    sx={{
                        height: {desktop: '100%', laptop: '100%', tablet: '100%', mobile: '80%'},
                        width: {desktop: '100%', laptop: '100%', tablet: '100%', mobile: '80%'},
                    }}
                />
                {
                    props.message ? (
                        <>
                            <Typography variant="h4" color="primary">
                                <span>{props.message}</span>
                            </Typography>
                        </>
                    ) : (
                        <></>
                    )
                }
            </Grid>
        </Grid>
    );
}

export default NotSelectedItem;