import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
async function getById(id) {
  return await api.get(`it/itroles/${id}`);
}

async function create(id, data) {
  return await api.post(`it/itroles/${id}`, data);
}

async function update(id, data) {
  return await api.put(`it/itroles/${id}`, data);
}

async function deleteRol(id) {
  return await api.delete(`it/itroles/${id}`);
}

export const Roles = {
  getById,
  create,
  update,
  deleteRol,
};
