import React from "react";
import "@/styles/Sidebar.module.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SurveyIndicators from "@/components/SurveyIndicators";

import GenericGraphic from "@/components/GenericGraphic";

export default function Graphic() {
  return (
    <>
      <SurveyIndicators />
      <GenericGraphic id={1} />
    </>
  );
}
