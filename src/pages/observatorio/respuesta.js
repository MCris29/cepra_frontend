import React from "react";
import styles from "@/styles/Survey.module.css";
import ReplyForm from "@/components/ReplyForm";

export default function Answer() {
  return (
    <>
      <div className={styles.forms_container}>
        <ReplyForm />
      </div>
    </>
  );
}
