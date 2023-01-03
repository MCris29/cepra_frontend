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
          sx={{
            height: "56%",
            width: "56%",
            color: "#05579f",
          }}
        />
        {props.message ? (
          <>
            <Typography variant="h5" color="#05579f">
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
