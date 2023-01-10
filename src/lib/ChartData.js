import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getAll() {
  return await api.get(`it/datosGrafico1/`);
}

async function getById(id) {
  return await api.get(`it/datosGrafico1/${id}`);
}

async function getGraphic3ById(id) {
  return await api.get(`it/datosGrafico3/${id}`);
}

async function contactoGraficoDes(id) {
  return await api.get(`it/contactoGraficoDes/${id}`);
}

async function contactoGraficoEst(id) {
  return await api.get(`it/contactoGraficoEst/${id}`);
}

async function orgGraficoSector(id) {
  return await api.get(`it/orgGraficoSector/${id}`);
}

async function orgGraficoProvincia(id) {
  return await api.get(`it/orgGraficoProvincia/${id}`);
}

async function orgGraficoCiudad(id) {
  return await api.get(`it/orgGraficoCiudad/${id}`);
}

async function graficoContinuo(itenc_codigo, itepr_codigo, select) {
  return await api.get(
    `it/graficoContinuo?itenc_codigo=${itenc_codigo}&itepr_codigo=${itepr_codigo}&select=${select}`
  );
}

export const ChartData = {
  getAll,
  getById,
  getGraphic3ById,

  //Gráficos dinámicos con cada indicador
  orgGraficoSector,
  orgGraficoProvincia,
  orgGraficoCiudad,
  contactoGraficoDes,
  contactoGraficoEst,

  //Gráficos continuos
  graficoContinuo,
};
