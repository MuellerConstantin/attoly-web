import api from "./index";

// eslint-disable-next-line import/prefer-default-export
export const createComplaint = (tag, data) => {
  return api.post(`/shortcuts/${tag}/complaints`, data);
};
