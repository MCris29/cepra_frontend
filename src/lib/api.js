import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: true,
});
