import axios from "axios";

export const api = axios.create({
  baseURL: "/api/bff",
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
