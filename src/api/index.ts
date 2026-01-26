import axios from "axios";
import { signIn, signOut } from "next-auth/react";

let isHandlingAuthError = false;

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
    (response) => response,
    async (error) => {
      const { response, config } = error;
      const status = response?.status;
      const code = response?.data?.error;

      if (
        status === 401 &&
        code === "AuthenticationError" &&
        typeof window !== "undefined" &&
        !isHandlingAuthError &&
        !config?._retry
      ) {
        const pathname = window.location.pathname;

        if (!pathname.includes("/signin")) {
          isHandlingAuthError = true;
          (config as any)._retry = true;

          await signOut({ redirect: false });

          signIn(undefined, {
            callbackUrl: window.location.href,
          });
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
