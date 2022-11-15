import React from "react";
import styles from "@/styles/LandingGraphic.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterTypeChart = (props) => {
  return (
    <FormControl size="small" className={styles.filter_item}>
      <InputLabel id="demo-simple-select-label">Tipo de gráfico</InputLabel>
      <Select
        style={{ borderRadius: 0 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.chartType}
        label="Tipo de gráfico"
        onChange={props.handleTypeChart}
      >
        <MenuItem value={"bar"}>Barras</MenuItem>
        <MenuItem value={"line"}>Lineal</MenuItem>
        <MenuItem value={"area"}>Área</MenuItem>
        <MenuItem value={"pie"}>Pastel</MenuItem>
        <MenuItem value={"doughnut"}>Dona</MenuItem>
        <MenuItem value={"radar"}>Radar</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterTypeChart;
