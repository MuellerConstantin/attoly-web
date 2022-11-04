import api from "./index";

export const generateToken = (email, password) => {
  return api.post("/auth/token", {
    email,
    password,
  });
};

export const refreshToken = (token) => {
  return api.post("/auth/refresh", {
    refreshToken: token,
  });
};
