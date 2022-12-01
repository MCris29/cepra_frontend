import React from "react";
import styles from "@/styles/LandingGraphic.module.css";
import { TextField, styled } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
    },
  },
});

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
          renderInput={(params) => (
            <CustomTextField
              size="small"
              sx={{ borderRadius: 0, margin: "0 4px" }}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Fecha fin"
          inputFormat="MM/DD/YYYY"
          className={styles.filter_item}
          value={0}
          onChange={props.handleDateEnd}
          renderInput={(params) => (
            <CustomTextField
              size="small"
              sx={{ borderRadius: 0, marginLeft: "4px" }}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default FilterDate;
