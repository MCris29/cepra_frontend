import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getAll() {
  return await api.get(`it/datosGrafico2/`)
}

async function getById(id) {
  return await api.get(`it/encuestaPreguntas/${id}`)
    .then((response) => {
      return response.data
    });
}

async function create(data) {
  return await api.post(`it/encuesta/`, data);
}

async function getWithCategoriesById(id) {
  return await api.get(`it/encuesta/${id}`)
      .then((response) => {
        return response.data
      });
}
export const SurveyTemplates = {
  getAll,
  getById,
  create,
  getWithCategoriesById,
};
