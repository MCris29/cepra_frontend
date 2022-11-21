import React from "react";
import { Grid, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

const NotSelectedItem = (props) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%", textAlign: "center" }}
    >
      <Grid item xs={3}>
        <BarChartIcon
          color="primary"
          sx={{
            height: "65%",
            width: "65%",
          }}
        />
        {props.message ? (
          <>
            <Typography variant="h4" color="primary">
              <span>{props.message}</span>
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default NotSelectedItem;
