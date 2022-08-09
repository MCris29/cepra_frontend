import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getAll() {
    return await api.get(`it/itrespuesta/`);
}

async function getById(id) {
  return await api.get(`it/itrespuesta/${id}`);
}

async function create(data) {
  return await api.post(`it/itrespuesta/`, data);
}

async function update(id, data) {
  return await api.put(`it/itrespuesta/${id}`, data);
}

async function deleteReply(id) {
  return await api.delete(`it/itrespuesta/${id}`);
}

export const Surveys = {
  getAll,
  getById,
  create,
  update,
  deleteReply
};
