import api from "./index";

export const createShortcut = (data) => {
  return api.post("/shortcuts", data);
};

export const fetchShortcut = (tag) => {
  return api.get(`/shortcuts/${tag}`);
};

export const fetchShortcuts = ({ page, perPage, filter, sort }) => {
  return api.get("/shortcuts", {
    params: { page, perPage, filter, sort },
  });
};

export const fetchCurrentUserShortcuts = ({ page, perPage }) => {
  return api.get("/user/me/shortcuts", {
    params: { page, perPage },
  });
};

export const deleteShortcut = (tag) => {
  return api.delete(`/shortcuts/${tag}`);
};
