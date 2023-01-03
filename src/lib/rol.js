import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
async function getById(id) {
  return await api.get(`it/itroles/${id}`);
}

async function create(data) {
  return await api.post(`it/itrolesusuarios/`, data);
}

async function update(id, data) {
  return await api.put(`it/itrolesusuarios/${id}`, data);
}

async function deleteRol(id) {
  return await api.delete(`it/itrolesusuarios/${id}`);
}

export const Roles = {
  getById,
  create,
  update,
  deleteRol,
};
