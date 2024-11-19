import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Spinner from "../components/atoms/Spinner";
import { requestResetEmail, resetPassword } from "../api/users";

import Logo from "../assets/images/logo.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";

function ResetPasswordConfirmation() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const schema = yup.object().shape({
    password: yup.string().required("Is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Is required"),
  });

  const onResetPassword = useCallback(
    async (values, { setFieldError, resetForm }) => {
      setLoading(true);
      setSuccess(null);
      setError(null);

      try {
        await resetPassword({
          resetToken: searchParams.get("token"),
          password: values.password,
        });

        resetForm();
        setSuccess(t("pages.reset-password.reset-success"));
      } catch (err) {
        if (err.response && err.response.status === 410) {
          setError(t("pages.reset-password.expiry-error"));
        } else if (err.response && err.response.status === 422) {
          err.response.data.details?.forEach((detail) =>
            setFieldError(detail.field, detail.message)
          );
        } else {
          setError(t("pages.reset-password.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [searchParams, setLoading, setSuccess, setError, t]
  );

  return (
    <div
      className="grow flex flex-col items-center justify-center px-4 py-32 space-y-4"
      style={{
        backgroundImage: `url(${WallpaperImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
        <div>
          <img
            className="mx-auto h-10 md:h-12 lg:h-14 w-auto"
            src={Logo}
            alt="Logo"
          />
          <h1 className="mt-4 text-center lg:text-3xl text-2xl font-bold">
            {t("pages.reset-password.headline")}
          </h1>
        </div>
        <p>{t("pages.reset-password.description")}</p>
        {success && <p className="text-center text-green-500">{success}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <Formik
          initialValues={{ password: "", passwordConfirmation: "" }}
          validationSchema={schema}
          onSubmit={onResetPassword}
        >
          {(props) => (
            <form
              className="space-y-4"
              onSubmit={props.handleSubmit}
              noValidate
            >
              <div>
                <TextField
                  name="password"
                  type="password"
                  placeholder={t("pages.reset-password.password-field")}
                  label={t("pages.reset-password.password-field")}
                  disabled={loading}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  error={props.errors.password}
                  touched={props.errors.password && props.touched.password}
                />
              </div>
              <div>
                <TextField
                  name="passwordConfirmation"
                  type="password"
                  placeholder={t("pages.reset-password.confirm-password-field")}
                  label={t("pages.reset-password.confirm-password-field")}
                  disabled={loading}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.passwordConfirmation}
                  error={props.errors.passwordConfirmation}
                  touched={
                    props.errors.passwordConfirmation &&
                    props.touched.passwordConfirmation
                  }
                />
              </div>
              <Button
                type="submit"
                disabled={!(props.isValid && props.dirty) || loading}
                className="w-full flex justify-center"
              >
                {!loading && (
                  <span>{t("pages.reset-password.reset-password")}</span>
                )}
                {loading && (
                  <Spinner className="h-6 w-6 !text-gray-600 !fill-orange-500" />
                )}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function ResetPasswordRequest() {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
  });

  const onSend = useCallback(
    async (values, { resetForm }) => {
      setLoading(true);
      setSuccess(null);
      setError(null);

      try {
        await requestResetEmail(values.email);

        resetForm();
        setSuccess(t("pages.reset-password.email-sent-success"));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(t("pages.reset-password.unknown-email-error"));
        } else {
          setError(t("pages.reset-password.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  return (
    <div
      className="h-full text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-32 space-y-4"
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
            {t("pages.reset-password.headline")}
          </h1>
        </div>
        <p>{t("pages.reset-password.description")}</p>
        {success && <p className="text-center text-green-500">{success}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={onSend}
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
                  placeholder={t("pages.reset-password.email-field")}
                  label={t("pages.reset-password.email-field")}
                  disabled={loading}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  error={props.errors.email}
                  touched={props.errors.email && props.touched.email}
                />
              </div>
              <Button
                type="submit"
                disabled={!(props.isValid && props.dirty) || loading}
                className="w-full flex justify-center"
              >
                {!loading && (
                  <span>{t("pages.reset-password.send-email")}</span>
                )}
                {loading && (
                  <Spinner className="h-6 w-6 !text-gray-600 !fill-orange-500" />
                )}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = `Attoly | ${t("pages.reset-password.title")}`;
  }, [t]);

  return (
    <StackTemplate>
      <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
        {searchParams.get("token") ? (
          <ResetPasswordConfirmation />
        ) : (
          <ResetPasswordRequest />
        )}
      </div>
    </StackTemplate>
  );
}
