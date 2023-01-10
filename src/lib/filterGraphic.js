import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getBySector(id, data) {
  return await api.get(`it/grafico/encuesta-pregunta/${id}?sector=${data}`);
}

async function getBySubsector(id, data) {
  return await api.get(`it/grafico/encuesta-pregunta/${id}?subsector=${data}`);
}

async function getByProvince(id, data) {
  return await api.get(`it/grafico/encuesta-pregunta/${id}?provincia=${data}`);
}

async function getByCity(id, data) {
  return await api.get(`it/grafico/encuesta-pregunta/${id}?ciudad=${data}`);
}

export const filters = {
  getBySector,
  getBySubsector,
  getByProvince,
  getByCity,
};
