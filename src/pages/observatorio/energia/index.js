import React from "react";
import Grid from "@mui/material/Grid";
import SurveyMenu from "@/components/SurveyMenu";
import SurveyIndicators from "@/components/SurveyIndicators";
import {Box, Container, Divider} from "@mui/material";

export default function Energy() {
  return (
    <>
      <Box sx={{textAlign: 'center' ,mt: 1, mb: 2, fontWeight: 'bold', fontSize: 'h4.fontSize'}}>
        Indicadores de energia
      </Box>
      <SurveyIndicators />
    </>
  );
}
