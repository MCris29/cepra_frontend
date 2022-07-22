import React from "react";
import { Divider } from "@mui/material";
import SurveyTypeForm from "@/components/SurveyTypeForm";
import SurveyForm from "@/components/SurveyForm";
import SurveyList from "@/components/SurveyList";

const Survey = () => {
  return (
    <>
      <SurveyTypeForm />
      <Divider sx={{ margin: "40px 0" }} />
      <SurveyForm />
      <Divider sx={{ margin: "40px 0" }} />
      <SurveyList />
    </>
  );
};

export default Survey;
