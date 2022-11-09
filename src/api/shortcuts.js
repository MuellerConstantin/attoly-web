import api from "./index";

export const createShortcut = (data) => {
  return api.post("/shortcuts", data);
};

export const fetchShortcut = (tag) => {
  return api.get(`/shortcuts/${tag}`);
};
