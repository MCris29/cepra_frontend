import React from "react";
import styles from "@/styles/LandingGraphic.module.css";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterIndicators = () => {
  return (
    <>
      <FormControl size="small" className={styles.filter_item}>
        <InputLabel id="demo-simple-select-label">Indicador</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          label="Indicador"
          onChange={() => {}}
        >
          <MenuItem value={"bar"}>Sector</MenuItem>
          <MenuItem value={"subsector"}>Subsector</MenuItem>
          <MenuItem value={"ciudad"}>Ciudad</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" className={styles.filter_item}>
        <InputLabel id="demo-simple-select-label">Datos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          label="Datos"
          onChange={() => {}}
        >
          <MenuItem value={"bar"}>Sector</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default FilterIndicators;
