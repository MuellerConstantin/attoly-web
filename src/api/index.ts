import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

type RetriableAxiosConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let sessionSyncPromise: Promise<void> | null = null;

async function syncSession(): Promise<void> {
  if (!sessionSyncPromise) {
    sessionSyncPromise = (async () => {
      try {
        await getSession();
      } finally {
        sessionSyncPromise = null;
      }
    })();
  }

  return sessionSyncPromise;
}

export function createApi(locale: string) {
  const api = axios.create({
    baseURL: "/api/bff",
    timeout: 10_000,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Accept-Language": locale,
    },
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const response = error.response;
      const config = error.config as RetriableAxiosConfig | undefined;

      if (!response || !config) {
        return Promise.reject(error);
      }

      if (response.status === 401 && !config._retry) {
        config._retry = true;

        try {
          await syncSession();
          return api(config);
        } catch {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
