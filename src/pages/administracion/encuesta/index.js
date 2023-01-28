import React from "react";
import styles from "@/styles/Survey.module.css";
import { Divider } from "@mui/material";
import SurveyTypeForm from "@/components/SurveyTypeForm";
import SurveyForm from "@/components/SurveyForm";
import SurveyList from "@/components/SurveyList";
import withAuth from "@/hocs/withAuth";
import TypeSurveyList from "@/components/TypeSurveyList";

const Survey = () => {
  return (
    <>
      <div className="main-admin-content">
        <SurveyForm />
      </div>
      <Divider sx={{ margin: "40px 0" }} />
      <SurveyList />
      <Divider sx={{ margin: "40px 0" }} />
      <div className="main-admin-content">
        <SurveyTypeForm />
      </div>
      <Divider sx={{ margin: "40px 0" }} />
      <TypeSurveyList />
    </>
  );
};

export default withAuth(Survey);
