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

export const ChartData = {
  getAll,
  getById,
};
