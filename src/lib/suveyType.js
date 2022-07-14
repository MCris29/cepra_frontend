import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getById(id) {
  return await api.get(`it/ittipoencuesta/${id}`);
}

async function create(data) {
  return await api.post(`it/ittipoencuesta/`, data);
}

async function update(id, data) {
  return await api.put(`it/ittipoencuesta/${id}`, data);
}

async function deleteSurveyType(id) {
  return await api.delete(`it/ittipoencuesta/${id}`);
}

export const SurveyTypes = {
  getById,
  create,
  update,
  deleteSurveyType,
};
