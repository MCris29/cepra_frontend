import React from "react";
import Grid from "@mui/material/Grid";
import SurveyMenu from "@/components/SurveyMenu";
import SurveyIndicators from "@/components/SurveyIndicators";

export default function Energy() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SurveyMenu />
        </Grid>
        <Grid item xs={9}>
          <div>Indicadores de energia</div>
          <div>
            <SurveyIndicators />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
