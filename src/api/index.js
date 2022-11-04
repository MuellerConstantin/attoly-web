import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_ATTOLY_REST_URI,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

export default api;
