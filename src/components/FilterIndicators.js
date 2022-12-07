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
  const [filterLabel, setFilterLabel] = useState("Dato");
  const [filterData, setFilterData] = useState("all");
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    switch (filter) {
      case "sector":
        setArrayData(data.data.sector);
        setFilterLabel("Sector");
        break;
      case "subsector":
        setArrayData(data.data.subsector);
        setFilterLabel("Subsector");
        break;
      case "ciudad":
        setArrayData(data.data.ciudad);
        setFilterLabel("Ciudad");
        break;
      case "all":
        setArrayData([]);
        setFilterLabel("Dato");
        setFilterData("");
        props.handleFilter(filter, []);
        break;
    }
  }, [filter]);

  const handleSorted = (array) => {
    array.sort((a, b) => {
      const nameA = a.label.toUpperCase();
      const nameB = b.label.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };
  handleSorted(arrayData);

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
        <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ borderRadius: 0, margin: "0 4px" }}
          value={filter}
          label="Filtro"
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
        <InputLabel id="demo-simple-select-label">{filterLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ borderRadius: 0, margin: "0 4px" }}
          value={filterData}
          label={filterLabel}
          onChange={handleFilterData}
        >
          {arrayData.map((item, index) => {
            if (item.label) {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            }
          })}
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
            <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ borderRadius: 0, margin: "0 4px" }}
              value={"all"}
              label="Filtro"
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
              style={{ borderRadius: 0, margin: "0 4px" }}
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
