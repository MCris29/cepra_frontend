import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function getAll() {
  return await api.get(`it/itorganizacion/`);
}

async function getById(id) {
  return await api.get(`it/itorganizacion/${id}`);
}

async function create(data) {
  return await api.post(`it/itorganizacion/`, data);
}

async function update(id, data) {
  return await api.put(`it/itorganizacion/${id}`, data);
}

async function deleteOrganization(id) {
  return await api.delete(`it/itorganizacion/${id}`);
}

export const Organizations = {
  getAll,
  getById,
  create,
  update,
  deleteOrganization,
};
