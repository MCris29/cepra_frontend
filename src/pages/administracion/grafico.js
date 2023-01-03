import React from "react";
import "@/styles/Sidebar.module.css";
import { styled } from "@mui/material/styles";
import SurveyIndicators from "@/components/SurveyIndicators";
import GenericGraphic from "@/components/GenericGraphic";
import withAuth from "@/hocs/withAuth";

const Graphic = () => {
  return (
    <>
      <h4 className="title">Gráfico</h4>
    </>
  );
};

export default withAuth(Graphic);
