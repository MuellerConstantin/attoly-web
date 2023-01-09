import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { refreshToken } from "../api/auth";
import authSlice from "../store/slices/auth";
import { fetchCurrentUserRoles } from "../api/roles";

export default function OAuth2Redirect() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const getUrlParameter = useCallback(
    (name) => {
      return new URLSearchParams(search).get(name);
    },
    [search]
  );

  const onLogin = useCallback(
    async (_refreshToken) => {
      setError(null);

      try {
        const tokenRes = await refreshToken(_refreshToken);

        dispatch(
          authSlice.actions.setToken({
            accessToken: tokenRes.data.accessToken,
            accessExpiresIn: tokenRes.data.accessExpiresIn,
            refreshToken: tokenRes.data.refreshToken,
            refreshExpiresIn: tokenRes.data.refreshExpiresIn,
          })
        );

        dispatch(authSlice.actions.setPrincipal(tokenRes.data.principal));

        const rolesRes = await fetchCurrentUserRoles();

        dispatch(authSlice.actions.setRoles(rolesRes.data));

        navigate("/home");
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError(t("pages.oauth2-redirect.authentication-error"));
        } else {
          setError(t("pages.oauth2-redirect.error"));
        }

        throw err;
      }
    },
    [dispatch, navigate, setError, t]
  );

  useEffect(() => {
    document.title = `Attoly | ${t("pages.oauth2-redirect.title")}`;
  }, [t]);

  useEffect(() => {
    if (getUrlParameter("error")) {
      setError(getUrlParameter("error"));
    } else {
      onLogin(getUrlParameter("refresh_token"));
    }
  }, [onLogin, getUrlParameter, setError, t]);

  if (error) {
    console.error(error);
    return <Navigate to="/logout" />;
  }

  return null;
}
