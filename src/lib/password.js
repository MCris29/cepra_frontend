import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function reset(data) {
  return await api.post(`it/cambioPassword/`, data);
}

export const Passwords = {
  reset,
};
