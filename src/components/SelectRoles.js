import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { Roles } from "@/lib/rol";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: 0,
  },
  "& .MuiInputBase-input": {
    borderRadius: "0",
    position: "relative",
    border: "0",
    fontSize: 14,

    "&:focus": {
      borderRadius: "0",
      borderColor: "transparent",
    },
  },
}));

const SelectRoles = ({ rolUserId, rolId, userId }) => {
  const { data, error } = useSWR("it/itroles/", fetcher);

  const [rol, setRol] = useState(rolId);

  if (error) return <>Error</>;
  if (!data) return <>Cargando...</>;

  const handleChange = (event) => {
    setRol(event.target.value);
    let newRol = event.target.value;

    const rolData = {
      itus_codigo: userId,
      itrol_codigo: newRol,
    };

    try {
      Roles.update(rolUserId, rolData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
        <InputLabel id="demo-select-small"></InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={rol}
          label=""
          onChange={handleChange}
          input={<BootstrapInput />}
          fullWidth
        >
          {data.data.map((item, index) => (
            <MenuItem value={item.itrol_codigo} key={index}>
              {item.itrol_nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectRoles;
