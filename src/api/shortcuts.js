import api from "./index";

// eslint-disable-next-line import/prefer-default-export
export const createShortcut = (data) => {
  return api.post("/shortcuts", data);
};
