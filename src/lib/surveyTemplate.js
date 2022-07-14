import api from "@/lib/api";

let config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

async function create(data) {
  return await api.post(`it/encuesta/`, data);
}

export const SurveyTemplates = {
  create,
};
