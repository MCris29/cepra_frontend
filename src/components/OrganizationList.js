import React from "react";
import Routes from "@/constants/routes";
import Link from "next/link";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContactsIcon from "@mui/icons-material/Contacts";

import LoadingInformation from "@/components/LoadingInformation";

const columns = [
  { field: "itorg_ruc", headerName: "RUC", width: 150 },
  { field: "itorg_nombre", headerName: "Organización", width: 200 },
  { field: "itorg_sector", headerName: "Sector", width: 150 },
  { field: "itorg_subsector", headerName: "Subsector", width: 150 },
  { field: "itorg_num_empleados", headerName: "# empleados", width: 100 },
  {
    field: "actions",
    headerName: "",
    type: "actions",
    width: 100,
    renderCell: (data) => [
      <div key={data.row.id}>
        <Link href={`${Routes.ORGANIZATION}/${data.row.id}`}>
          <IconButton>
            <Tooltip title="Editar" placement="top-start" followCursor>
              <EditIcon />
            </Tooltip>
          </IconButton>
        </Link>
        <Link href={`${Routes.ORGANIZATION}/${data.row.id}/contactos`}>
          <IconButton>
            <Tooltip title="Ver contactos" placement="top-start" followCursor>
              <ContactsIcon />
            </Tooltip>
          </IconButton>
        </Link>
      </div>,
    ],
  },
];

const OrganizationList = () => {
  const { data, error } = useSWR("it/itorganizacion/", fetcher);

  if (error) return <>Error</>;
  if (!data) return <LoadingInformation />;
  if (data) {
    data.data.map((item) => {
      item.id = item.itorg_ruc;
    });
  }

  return (
    <>
      <h4>Lista de organizaciones</h4>
      {data ? (
        <DataGrid
          rows={data.data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight={true}
          sx={{ marginTop: "20px" }}
        />
      ) : (
        <span>Cargando...</span>
      )}
    </>
  );
};

export default OrganizationList;
