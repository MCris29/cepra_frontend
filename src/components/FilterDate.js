import React from "react";
import styles from "@/styles/LandingGraphic.module.css";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const FilterDate = (props) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Fecha inicio"
          inputFormat="MM/DD/YYYY"
          className={styles.filter_item}
          value={0}
          onChange={props.handleDateInit}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Fecha fin"
          inputFormat="MM/DD/YYYY"
          className={styles.filter_item}
          value={0}
          onChange={props.handleDateEnd}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default FilterDate;
