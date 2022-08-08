import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function handleDate(dateTime) {
  if (dateTime !== null) {
    var formatDate = new Date(dateTime);
    return formatDate.toLocaleDateString("es-ES");
  } else {
    return "N/A";
  }
}

const columns = [
  { field: "itten_nombre", headerName: "Encuesta", width: 175 },
  {
    field: "itenc_fecha_vigente",
    headerName: "Fecha de vigencia",
    type: "dateTime",
    width: 175,
    renderCell: (data) => {
      return handleDate(data.row.itenc_fecha_vigente);
    },
  },
  { field: "itenc_observacion", headerName: "Observación", width: 400 },
  {
    field: "actions",
    headerName: "",
    type: "actions",
    width: 200,
    getActions: (data) => [
      <Tooltip title="Ver" placement="top-start" followCursor>
        <Link href={`${Routes.SURVEY}/${data.row.id}`}>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Link>
      </Tooltip>,
    ],
  },
];

const SurveyList = () => {
  const { data, error } = useSWR("it/itencuesta/", fetcher);
  console.log("data", data);

  if (error) return <>Error</>;
  if (!data) return <>Cargando...</>;
  if (data) {
    data.data.map((item) => {
      item.id = item.itenc_codigo;
    });
  }

  return (
    <>
      <div>Lista de encuestas</div>
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
        <div>Cargando...</div>
      )}
    </>
  );
};

export default SurveyList;
