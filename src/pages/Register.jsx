import { useCallback, useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import Spinner from "../components/atoms/Spinner";
import { createUser } from "../api/users";

import Logo from "../assets/images/logo.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";

export default function Register() {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: yup.string().required(t("validation.required")),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.confirm-password"))
      .required(t("validation.required")),
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Attoly | ${t("pages.register.title")}`;
  }, [t]);

  const onCreate = useCallback(
    async (values, { setFieldError, resetForm }) => {
      setLoading(true);
      setSuccess(null);
      setError(null);

      try {
        await createUser({
          email: values.email,
          password: values.password,
        });

        resetForm();
        setSuccess(t("pages.register.success"));
      } catch (err) {
        if (err.response && err.response.status === 422) {
          err.response.data.details?.forEach((detail) =>
            setFieldError(detail.field, detail.message)
          );
        } else {
          setError(t("pages.register.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setSuccess, t]
  );

  return (
    <StackTemplate>
      <div
        className="grow flex flex-col items-center justify-center px-4 py-32 space-y-4"
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
              {t("pages.register.headline")}
            </h1>
          </div>
          {success && <p className="text-center text-green-500">{success}</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={schema}
            onSubmit={onCreate}
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
                    placeholder={t("pages.register.email-field")}
                    label={t("pages.register.email-field")}
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
                    placeholder={t("pages.register.password-field")}
                    label={t("pages.register.password-field")}
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
                    placeholder={t("pages.register.confirm-password-field")}
                    label={t("pages.register.confirm-password-field")}
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
                  {!loading && <span>{t("pages.register.register")}</span>}
                  {loading && (
                    <Spinner className="h-6 w-6 !text-gray-600 !fill-orange-500" />
                  )}
                </Button>
                <p className="text-center text-xs">
                  <Trans
                    t={t}
                    i18nKey="pages.register.usage-terms-notice"
                    components={{
                      "terms-hyperlink": <Link to="/terms-of-use" />,
                      "privacy-hyperlink": <Link to="/privacy-policy" />,
                    }}
                  />
                </p>
              </form>
            )}
          </Formik>
        </div>
        <div className="text-center">
          <Link
            className="!text-sm !text-gray-800 !dark:text-white"
            to="/login"
          >
            {t("pages.register.have-account")}
          </Link>
        </div>
      </div>
    </StackTemplate>
  );
}
