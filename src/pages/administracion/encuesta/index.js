import React from "react";
import styles from "@/styles/Survey.module.css";
import { Divider } from "@mui/material";
import SurveyTypeForm from "@/components/SurveyTypeForm";
import SurveyForm from "@/components/SurveyForm";
import SurveyList from "@/components/SurveyList";

const Survey = () => {
  return (
    <>
      <div className={styles.forms_container}>
        {/* <SurveyTypeForm />
        <Divider sx={{ margin: "40px 0" }} /> */}
        <SurveyForm />
      </div>
      <Divider sx={{ margin: "40px 0" }} />
      <SurveyList />
    </>
  );
};

export default Survey;
