import React from "react";
import "@/styles/Sidebar.module.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SurveyMenu from "@/components/SurveyMenu";

import GenericGraphic from "@/components/GenericGraphic";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "1px solid #cccccc",
  borderRadius: "15px",
  boxShadow: "none",
}));

export default function Graphic() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <SurveyMenu />
            </Item>
          </Grid>
          <Grid item xs={9}>
            <GenericGraphic id={1} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
