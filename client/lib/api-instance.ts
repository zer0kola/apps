import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 10000,
});

export default apiInstance;
