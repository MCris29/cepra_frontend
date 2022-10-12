import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getById(id) {
  return await api.get(`it/obtenerArchivos/${id}`);
}

async function create(data) {
  return await api.post(`it/subirArchivo/`, data);
}

async function deleteStaticGraphic(id) {
  return await api.delete(`it/eliminarArchivo/${id}`);
}

export const StaticGraphics = {
  getById,
  create,
  deleteStaticGraphic,
};
