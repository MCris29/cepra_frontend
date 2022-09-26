import React from "react";
import styles from "@/styles/Survey.module.css";
import RepliesForm from "@/components/RepliesForm";
import ReplyForm from "@/components/ReplyForm";

export default function Answers() {
  return (
    <>
      <div className={styles.forms_container}>
        <h3>Datos de encuesta</h3>
        <RepliesForm />
        <ReplyForm />
      </div>
    </>
  );
}
