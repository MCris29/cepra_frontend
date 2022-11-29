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
  { field: "itorg_ruc", headerName: "RUC", width: 150 },
  { field: "itorg_nombre", headerName: "Organización", width: 200 },
  { field: "itorg_sector", headerName: "Sector", width: 150 },
  { field: "itorg_subsector", headerName: "Subsector", width: 150 },
  { field: "itorg_num_empleados", headerName: "# empleados", width: 100 },
];

const OrganizationList = () => {
  const { data, error } = useSWR("it/itorganizacion/", fetcher);

  if (error) return <>Error</>;
  if (!data) return <LoadingInformation />;
  if (data.data) {
    data.data.map((item) => {
      item.id = item.itorg_ruc;
    });
  }

  return (
    <>
      <h4 className="title">Lista de organizaciones</h4>
      <p className="paragraph">
        En esta tabla se presentan las organizaciones que han respondido una o
        más encuestas, se pueden editar los datos y ver los contactos que
        pertenecen a cada organización.
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

export default OrganizationList;
