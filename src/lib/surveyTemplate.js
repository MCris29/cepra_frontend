import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getById(id) {
  return await api.get(`it/encuestaPreguntas/${id}`)
    .then((response) => {
      return response.data
    });
}

async function create(data) {
  return await api.post(`it/encuesta/`, data);
}

export const SurveyTemplates = {
  getById,
  create,
};
