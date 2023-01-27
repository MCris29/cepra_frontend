import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function reset(data) {
  return await api.post(`it/cambioPassword/`, data);
}

async function resetUser(id, data) {
  return await api.put(`it/itPassword/${id}`, data);
}

export const Passwords = {
  reset,
  resetUser,
};
