import api from "./index";

export const fetchCurrentUserRoles = () => {
  return api.get("/user/me/roles");
};

export const fetchRoles = () => {
  return api.get("/roles");
};

export const fetchRolesOfUser = (userId) => {
  return api.get(`/users/${userId}/roles`);
};

export const assignRoleToUser = (userId, roleId) => {
  return api.post(`/users/${userId}/roles/${roleId}`);
};

export const removeRoleFromUser = (userId, roleId) => {
  return api.delete(`/users/${userId}/roles/${roleId}`);
};
