import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";

import DeleteSurvey from "@/components/DeleteSurvey";
import LoadingInformation from "@/components/LoadingInformation";
import ErrorInformation from "@/components/ErrorInformation";

function handleDate(dateTime) {
  if (dateTime !== null) {
    var formatDate = new Date(dateTime);
    return formatDate.toLocaleDateString("es-ES");
  } else {
    return "N/A";
  }
}

const columns = [
  {
    field: "actions",
    headerName: "",
    type: "actions",
    width: 150,
    renderCell: (data) => [
      <div key={data.row.id}>
        {/* Redirecciona a una página para visualizar las preguntas de la encuesta seleccionada */}
        <Link
          key={`${Routes.SURVEY}/${data.row.id}`}
          href={`${Routes.SURVEY}/${data.row.id}`}
        >
          <IconButton style={{ color: "#05579f" }}>
            <Tooltip title="Ver encuesta" placement="top-start" followCursor>
              <VisibilityIcon />
            </Tooltip>
          </IconButton>
        </Link>
        {/* Redirecciona a una página para visualizar los gráficos estáticos de cada encuesta */}
        <Link
          key={`${Routes.SURVEY}/${data.row.id}/graficos-estaticos`}
          href={`${Routes.SURVEY}/${data.row.id}/graficos-estaticos`}
        >
          <IconButton style={{ color: "#0c89cb" }}>
            <Tooltip
              title="Ver gráficos estáticos"
              placement="top-start"
              followCursor
            >
              <InsertChartOutlinedTwoToneIcon />
            </Tooltip>
          </IconButton>
        </Link>
        <DeleteSurvey
          surveyId={data.row.id}
          surveyName={data.row.itenc_observacion}
        />
      </div>,
    ],
  },
  { field: "itenc_observacion", headerName: "Encuesta", width: 425 },
  { field: "itten_nombre", headerName: "Tipo de encuesta", width: 225 },
  {
    field: "itenc_fecha_vigente",
    headerName: "Fecha",
    type: "dateTime",
    width: 125,
    renderCell: (data) => {
      return handleDate(data.row.itenc_fecha_vigente);
    },
  },
];

const SurveyList = () => {
  const { data, error } = useSWR("it/itencuesta/", fetcher);

  if (!data) return <LoadingInformation />;
  if (error) return <ErrorInformation />;
  if (data) {
    data.data.map((item) => {
      item.id = item.itenc_codigo;
    });
  }

  return (
    <>
      <h4 className="title">Lista de encuestas</h4>
      <p className="paragraph">
        En esta tabla se presentan todas las encuestas guardadas, presiona el
        botón <VisibilityIcon sx={{ margin: "-3px 0" }} fontSize="x-small" />{" "}
        para visualizar la encuesta y{" "}
        <InsertChartOutlinedTwoToneIcon
          sx={{ margin: "-3px 0" }}
          fontSize="x-small"
        />{" "}
        para visualizar los gráficos estáticos.
      </p>
      {data ? (
        <DataGrid
          rows={data.data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight={true}
          sx={{ marginTop: "20px", borderRadius: 0 }}
        />
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default SurveyList;
