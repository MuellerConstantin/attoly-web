import axios from "axios";

export function createApi(locale: string) {
  return axios.create({
    baseURL: "/api/bff",
    timeout: 10000,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Accept-Language": locale,
    },
  });
}
