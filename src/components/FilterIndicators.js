import React, { useState, useEffect } from "react";
import styles from "@/styles/LandingGraphic.module.css";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterIndicators = (props) => {
  const { data, error } = useSWR(
    `it/encuesta/${props.surveyId}/filtros`,
    fetcher
  );

  const [filter, setFilter] = useState("all");
  const [filterData, setFilterData] = useState("all");
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    switch (filter) {
      case "sector":
        setArrayData(data.data.sector);
        break;
      case "subsector":
        setArrayData(data.data.subsector);
        break;
      case "ciudad":
        setArrayData(data.data.ciudad);
        break;
      case "all":
        setArrayData([]);
        setFilterData("");
        props.handleFilter(filter, []);
        break;
    }
  }, [filter]);

  const handleFilterIndicator = (e) => {
    setFilter(e.target.value);
  };
  const handleFilterData = (e) => {
    let fil_data = e.target.value;
    setFilterData(fil_data);
    props.handleFilter(filter, fil_data);
  };

  const FilterItems = () => {
    return (
      <FormControl size="small" className={styles.filter_item}>
        <InputLabel id="demo-simple-select-label">Indicador</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ borderRadius: 0 }}
          value={filter}
          label="Indicador"
          onChange={handleFilterIndicator}
        >
          <MenuItem value={"all"}>Todos</MenuItem>
          <MenuItem value={"sector"}>Sector</MenuItem>
          <MenuItem value={"subsector"}>Subsector</MenuItem>
          <MenuItem value={"ciudad"}>Ciudad</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const FilterDataItems = () => {
    return (
      <FormControl size="small" className={styles.filter_item}>
        <InputLabel id="demo-simple-select-label">Dato</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ borderRadius: 0 }}
          value={filterData}
          label="Dato"
          onChange={handleFilterData}
        >
          {arrayData.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      {data ? (
        <>
          <FilterItems />
          <FilterDataItems />
        </>
      ) : (
        <>
          <FormControl size="small" className={styles.filter_item}>
            <InputLabel id="demo-simple-select-label">Indicador</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ borderRadius: 0 }}
              value={"all"}
              label="Indicador"
            >
              <MenuItem value={"all"}>Todos</MenuItem>
              <MenuItem disabled>Cargando...</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" className={styles.filter_item}>
            <InputLabel id="demo-simple-select-label">Dato</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ borderRadius: 0 }}
              value={"all"}
              label="Dato"
            ></Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export default FilterIndicators;
