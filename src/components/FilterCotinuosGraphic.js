import React, { useState } from "react";
import styles from "@/styles/LandingGraphic.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterContinuosGraphic = (props) => {
  const [filter, setFilter] = useState(props.continuosFilter);

  const handleFilter = (event) => {
    let filterData = event.target.value;
    setFilter(filterData);
    props.handleFilterContinous(filterData);
  };
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
      <FormControl size="small" className={styles.filter_item}>
        <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
        <Select
          style={{ borderRadius: 0, marginRight: "4px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filtro"
          onChange={handleFilter}
        >
          <MenuItem value={"sector"}>Sector</MenuItem>
          <MenuItem value={"subsector"}>Subsector</MenuItem>
          {/* <MenuItem value={"provincia"}>Provincia</MenuItem> */}
        </Select>
      </FormControl>
    </>
  );
};

export default FilterContinuosGraphic;
