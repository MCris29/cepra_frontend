import React from "react";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";

import ErrorInformation from "./ErrorInformation";
import LoadingInformation from "./LoadingInformation";
import ButtonDeleteTypeSurvey from "./ButtonDeleteTypeSurvey";

const columns = [
  {
    field: "actions",
    headerName: "",
    type: "actions",
    width: 100,
    renderCell: (data) => [
      <div key={data.row.id}>
        <ButtonDeleteTypeSurvey surveyType={data.row} />
      </div>,
    ],
  },
  { field: "itten_nombre", headerName: "Tipo de encuesta", width: 300 },
  { field: "itten_observacion", headerName: "Observación", width: 500 },
];

const TypeSurveyList = () => {
  const { data, error } = useSWR(`it/ittipoencuesta/`, fetcher);

  if (error) return <ErrorInformation />;
  if (!data) return <LoadingInformation />;
  if (data.data) {
    data.data.map((item) => {
      item.id = item.itten_codigo;
    });
  }

  return (
    <>
      <h4 className="title">Lista de tipos de encuesta</h4>
      <p className="paragraph">
        En esta tabla se presentan los tipos de encuestas.
      </p>
      {data.data ? (
        <>
          {
            <DataGrid
              rows={data.data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight={true}
              sx={{ marginTop: "20px", borderRadius: 0 }}
            />
          }
        </>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default TypeSurveyList;
