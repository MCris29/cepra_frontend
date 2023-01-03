import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function deleteUser(id) {
  return await api.delete(`it/itusuarios/${id}`);
}

export const Users = {
  deleteUser,
};
