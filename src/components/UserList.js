import React from "react";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { DataGrid } from "@mui/x-data-grid";

import SelectRoles from "./SelectRoles";
import LoadingInformation from "@/components/LoadingInformation";

const columns = [
  { field: "itus_nombre", headerName: "Nombre", width: 200 },
  { field: "itus_correo", headerName: "Correo", width: 200 },
  { field: "itus_contacto", headerName: "Teléfono", width: 125 },
  {
    field: "actions",
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

const UserList = () => {
  const { data, error } = useSWR("it/itusuarios/", fetcher);

  if (error) return <>Error</>;
  if (!data) return <LoadingInformation />;
  if (data.data) {
    data.data.map((item) => {
      item.id = item.itus_codigo;
    });
  }

  return (
    <>
      <h4 className="title">Lista de usuarios</h4>
      <p className="paragraph">
        En esta tabla se muestran todos los usuarios registrados.
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
    </>
  );
};

export default UserList;
