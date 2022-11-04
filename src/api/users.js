import api from "./index";

// eslint-disable-next-line import/prefer-default-export
export const createUser = (data) => {
  return api.post("/users", data);
};
