import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getById(id) {
  return await api.get(`it/itencuesta/${id}`);
}

async function create(data) {
  return await api.post(`it/itencuesta/`, data);
}

async function update(id, data) {
  return await api.get(`it/itencuesta/${id}`, data);
}

async function deleteSurvey(id) {
  return await api.get(`it/itencuesta/${id}`);
}

export const Surveys = {
  getById,
  create,
  update,
  deleteSurvey,
};
