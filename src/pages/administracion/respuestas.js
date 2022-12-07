import React from "react";
import styles from "@/styles/Survey.module.css";
import { Divider } from "@mui/material";
import RepliesForm from "@/components/RepliesForm";
import ReplyForm from "@/components/ReplyForm";

export default function Answers() {
  return (
    <>
      <div className="main-admin-content">
        <RepliesForm />
        <Divider sx={{ margin: "40px 0" }} />
        <ReplyForm />
      </div>
    </>
  );
}
