import axios from "axios";
import authSlice from "../store/slices/auth";
import i18n from "../i18n";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_ATTOLY_API_URI,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state = store.getState();

  if (state.auth.accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${state.auth.accessToken}`;
  }

  // eslint-disable-next-line no-param-reassign
  config.headers["Accept-Language"] = i18n.resolvedLanguage;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response, config } = err;

    if (response && config.url !== "/auth/refresh") {
      // eslint-disable-next-line no-underscore-dangle
      if (response.status === 401 && !config._retry) {
        // eslint-disable-next-line no-underscore-dangle
        config._retry = true;
        const state = store.getState();

        if (state.auth.refreshToken) {
          try {
            const refreshRes = await api.post("/auth/refresh", {
              refreshToken: state.auth.refreshToken,
            });

            store.dispatch(
              authSlice.actions.setToken({
                accessToken: refreshRes.data.accessToken,
                accessExpiresIn: refreshRes.data.accessExpiresIn,
                refreshToken: refreshRes.data.refreshToken,
                refreshExpiresIn: refreshRes.data.refreshExpiresIn,
              })
            );

            config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
            return axios(config);
          } catch (refeshError) {
            return Promise.reject(refeshError);
          }
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
