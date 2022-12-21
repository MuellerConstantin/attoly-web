import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  accessExpiresAt: null,
  refreshExpiresAt: null,
  principal: null,
  roles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        accessExpiresAt: new Date(
          new Date().getTime() + action.payload.accessExpiresIn
        ).getTime(),
        refreshExpiresAt: new Date(
          new Date().getTime() + action.payload.refreshExpiresIn
        ).getTime(),
      };
    },
    clearToken: (state) => {
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        accessExpiresAt: null,
        refreshExpiresAt: null,
      };
    },
    setPrincipal: (state, action) => {
      return {
        ...state,
        principal: action.payload,
      };
    },
    clearPrincipal: (state) => {
      return {
        ...state,
        principal: null,
      };
    },
    setRoles: (state, action) => {
      return {
        ...state,
        roles: action.payload,
      };
    },
    clearRoles: (state) => {
      return {
        ...state,
        roles: [],
      };
    },
    clearAuthentication: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export default authSlice;
