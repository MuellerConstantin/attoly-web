import api from "./index";

// eslint-disable-next-line import/prefer-default-export
export const fetchCurrentUserRoles = () => {
  return api.get("/user/me/roles");
};
