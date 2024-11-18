import { useEffect, useState, useCallback } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import ExternalLink from "../components/atoms/ExternalLink";
import authSlice from "../store/slices/auth";
import { generateToken } from "../api/auth";
import { fetchCurrentUserRoles } from "../api/roles";

import Logo from "../assets/images/logo.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";

export default function Login() {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: yup.string().required(t("validation.required")),
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Attoly | ${t("pages.login.title")}`;
  }, [t]);

  const onLogin = useCallback(
    async (values) => {
      setLoading(true);
      setError(null);

      try {
        const tokenRes = await generateToken(values.email, values.password);

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
          if (err.response.data?.error === "AccountDisabledError") {
            setError(t("pages.login.disabled-error"));
          } else if (err.response.data?.error === "AccountLockedError") {
            setError(t("pages.login.locked-error"));
          } else {
            setError(t("pages.login.credentials-error"));
          }
        } else {
          setError(t("pages.login.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate, setLoading, setError, t]
  );

  return (
    <StackTemplate>
      <div
        className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-12 space-y-4"
        style={{
          backgroundImage: `url(${WallpaperImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
          <div>
            <img
              className="mx-auto h-10 md:h-12 lg:h-14 w-auto"
              src={Logo}
              alt="Logo"
            />
            <h1 className="mt-4 text-center lg:text-3xl text-2xl font-bold">
              {t("pages.login.headline")}
            </h1>
          </div>
          {error && <p className="text-center text-red-500">{error}</p>}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={onLogin}
          >
            {(props) => (
              <form
                className="space-y-4"
                onSubmit={props.handleSubmit}
                noValidate
              >
                <div>
                  <TextField
                    name="email"
                    type="email"
                    placeholder={t("pages.login.email-field")}
                    label={t("pages.login.email-field")}
                    disabled={loading}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    error={props.errors.email}
                    touched={props.errors.email && props.touched.email}
                  />
                </div>
                <div>
                  <TextField
                    name="password"
                    type="password"
                    placeholder={t("pages.login.password-field")}
                    label={t("pages.login.password-field")}
                    disabled={loading}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    error={props.errors.password}
                    touched={props.errors.password && props.touched.password}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!(props.isValid && props.dirty) || loading}
                  className="w-full flex justify-center"
                >
                  {!loading && <span>{t("pages.login.login")}</span>}
                  {loading && (
                    <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                  )}
                </Button>
              </form>
            )}
          </Formik>
          <hr />
          <div>
            <ExternalLink
              type="button"
              className="w-full flex justify-center items-center space-x-2 !bg-gray-900"
              href={`${
                new URL(process.env.REACT_APP_ATTOLY_API_URI).origin
              }/oauth2/authorization/github?redirect_uri=${encodeURIComponent(
                `${window.location.origin}/oauth2/redirect`
              )}`}
            >
              <FontAwesomeIcon icon={faGithub} className="h-4" />
              <span>{t("pages.login.login-github")}</span>
            </ExternalLink>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:space-x-2">
            <div className="text-center">
              <Link className="!text-sm" to="/reset-password">
                {t("pages.login.forgot-password")}
              </Link>
            </div>
            <div className="text-center">
              <Link className="!text-sm" to="/verify-user">
                {t("pages.login.verify-user")}
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            className="!text-sm !text-gray-800 !dark:text-white"
            to="/register"
          >
            {t("pages.login.no-account")}
          </Link>
        </div>
      </div>
    </StackTemplate>
  );
}
