import React from "react";
import styles from "@/styles/Survey.module.css";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataGrid } from "@mui/x-data-grid";
import QuestionList from "@/components/QuestionList";

const columns = [
  { field: "itten_codigo", headerName: "Encuesta", width: 150 },
  { field: "itenc_fecha_vigente", headerName: "Fecha de vigencia", width: 150 },
  { field: "itenc_observacion", headerName: "Observación", width: 300 },
  {
    field: "age",
    headerName: "Acciones",
    width: 150,
    renderCell: (data) => {
      return <QuestionList survey={data.row} />;
    },
  },
];

const SurveyList = () => {
  const { data, error } = useSWR("it/itencuesta/", fetcher);
  // console.log("data", data);

  if (error) return <>Error</>;
  if (!data) return <>Cargando...</>;
  if (data) {
    data.encuesta.map((item) => {
      item.id = item.itenc_codigo;
    });
  }

  return (
    <>
      <div>Lista de encuestas</div>
      {data ? (
        <DataGrid
          rows={data.encuesta}
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
