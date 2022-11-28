import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import { requestVerificationEmail, verifyUser } from "../api/users";

import Logo from "../assets/images/logo.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";

function VerifyUserConfirmation() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onVerifyUser = useCallback(
    async (token) => {
      setSuccess(null);
      setError(null);
      setLoading(true);

      try {
        await verifyUser({ verificationToken: token });

        setSuccess(t("pages.verify-user.verify-success"));
      } catch (err) {
        if (err.response && err.response.status === 410) {
          setError(t("pages.verify-user.expiry-error"));
        } else {
          setError(t("pages.verify-user.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    onVerifyUser(searchParams.get("token"));
  }, [searchParams, onVerifyUser]);

  return (
    <div
      className="h-full text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-12 space-y-4"
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
            {t("pages.verify-user.headline")}
          </h1>
        </div>
        <p>{t("pages.verify-user.description")}</p>
        {loading && (
          <div className="w-full flex justify-center p-2 pt-6">
            <div className="w-10 h-10 border-b-2 border-sky-500 rounded-full animate-spin" />
          </div>
        )}
        {success && <p className="text-center text-green-500">{success}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function VerifyUserRequest() {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSend = useCallback(
    async (values, { resetForm }) => {
      setLoading(true);
      setSuccess(null);
      setError(null);

      try {
        await requestVerificationEmail(values.email);

        resetForm();
        setSuccess(t("pages.verify-user.email-sent-success"));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(t("pages.verify-user.unknown-email-error"));
        } else {
          setError(t("pages.verify-user.error"));
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
      className="h-full text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-12 space-y-4"
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
            {t("pages.verify-user.headline")}
          </h1>
        </div>
        <p>{t("pages.verify-user.description")}</p>
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
                  placeholder={t("pages.verify-user.email-field")}
                  label={t("pages.verify-user.email-field")}
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
                {!loading && <span>{t("pages.verify-user.send-email")}</span>}
                {loading && (
                  <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                )}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default function VerifyUser() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = `Attoly | ${t("pages.reset-password.title")}`;
  }, [t]);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white">
        {searchParams.get("token") ? (
          <VerifyUserConfirmation />
        ) : (
          <VerifyUserRequest />
        )}
      </div>
    </StackTemplate>
  );
}
