import React from "react";
import styles from "@/styles/LandingGraphic.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterContinuosGraphic = (props) => {
  return (
    <>
      <FormControl size="small" className={styles.filter_item}>
        <InputLabel id="demo-simple-select-label">Tipo de gráfico</InputLabel>
        <Select
          style={{ borderRadius: 0, marginRight: "4px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.chartType}
          label="Tipo de gráfico"
          onChange={props.handleTypeChart}
        >
          <MenuItem value={"boxplot"}>Boxplot</MenuItem>
          <MenuItem value={"histogram"}>Histograma</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default FilterContinuosGraphic;
