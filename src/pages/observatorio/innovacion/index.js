import React from "react";
import Grid from "@mui/material/Grid";
import SurveyMenu from "@/components/SurveyMenu";

export default function Innovation() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SurveyMenu />
        </Grid>
        <Grid item xs={9}>
          Indicadores de innovación
        </Grid>
      </Grid>
    </>
  );
}
