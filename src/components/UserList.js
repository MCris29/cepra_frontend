import React, { useState } from "react";
import Link from "next/link";
import Routes from "@/constants/routes";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { DataGrid } from "@mui/x-data-grid";

import { IconButton, Tooltip } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";

import SelectRoles from "./SelectRoles";

import LoadingInformation from "@/components/LoadingInformation";
import ButtonDeleteUser from "@/components/ButtonDeleteUser";

const UserList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const columns = [
    {
      field: "actions",
      headerName: "",
      type: "actions",
      width: 100,
      renderCell: (data) => [
        <div key={data.row.id}>
          <Link
            key={`${Routes.USERS}/${data.row.id}`}
            href={`${Routes.USERS}/${data.row.id}`}
          >
            <IconButton style={{ color: "#05579f" }}>
              <Tooltip
                title="Resetear Contraseña"
                placement="top-start"
                followCursor
              >
                <LockResetIcon />
              </Tooltip>
            </IconButton>
          </Link>
          <ButtonDeleteUser user={data.row} />
        </div>,
      ],
    },
    { field: "itus_nombre", headerName: "Nombre", width: 200 },
    { field: "itus_correo", headerName: "Correo", width: 200 },
    { field: "itus_contacto", headerName: "Teléfono", width: 125 },
    {
      field: "Rol",
      headerName: "Rol",
      type: "actions",
      width: 200,
      renderCell: (data) => [
        <div key={data.row.id}>
          <SelectRoles
            rolUserId={data.row.roles[0].itrus_codigo}
            rolId={data.row.roles[0].itrol_codigo}
            userId={data.row.itus_codigo}
          />
        </div>,
      ],
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, error } = useSWR("it/itusuarios/", fetcher);

  if (error) return <>Error</>;
  if (!data) return <LoadingInformation />;
  if (data.data) {
    data.data.map((item) => {
      item.id = item.itus_codigo;
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <h4 className="title">Lista de usuarios</h4>
      <p className="paragraph">
        En esta tabla se muestran todos los usuarios registrados, en la columna
        rol se puede modificar el tipo de rol de cada usuario.
      </p>
      {data.data ? (
        <DataGrid
          rows={data.data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight={true}
          sx={{ marginTop: "20px", borderRadius: 0 }}
        />
      ) : (
        <div>No existen registros</div>
      )}
    </div>
  );
};

export default UserList;
