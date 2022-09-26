import React from "react";
import styles from "@/styles/Survey.module.css";
import RepliesForm from "@/components/RepliesForm";

export default function Answers() {
  return (
    <>
      <div className={styles.forms_container}>
        <RepliesForm />
      </div>
    </>
  );
}
