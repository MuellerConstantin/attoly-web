import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import TextField from "../../atoms/TextField";
import Button from "../../atoms/Button";
import { updateCurrentUser } from "../../../api/users";

export default function ChangeCurrentUserPasswordForm({ onChange, disabled }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    password: yup.string().required(t("validation.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.confirm-password"))
      .required(t("validation.required")),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onUpdate = async (values, { setFieldError, resetForm }) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const update = {
      password: values.password,
    };

    try {
      await updateCurrentUser(update);

      setSuccess(true);
      resetForm();

      if (onChange) onChange();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        err.response.data.details?.forEach((detail) =>
          setFieldError(detail.field, detail.message)
        );
      } else if (err.response && err.response.status === 401) {
        navigate("/logout");
      } else {
        setError(t("components.change-user-password-form.error"));
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800 dark:text-white space-y-4">
      <div>
        <h2 className="text-2xl">
          {t("components.change-user-password-form.title")}
        </h2>
        <hr className="border-gray-300 dark:border-gray-400 mt-2" />
      </div>
      <p>{t("components.change-user-password-form.description")}</p>
      {error && <p className="text-left text-red-500">{error}</p>}
      {success && (
        <p className="text-left text-green-500">
          {t("components.change-user-password-form.success")}
        </p>
      )}
      <div className="w-full">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={onUpdate}
          validationSchema={schema}
        >
          {(props) => (
            <form
              className="flex flex-col w-full space-y-4"
              onSubmit={props.handleSubmit}
              noValidate
            >
              <div>
                <TextField
                  type="password"
                  name="password"
                  placeholder={t(
                    "components.change-user-password-form.new-password"
                  )}
                  value={props.values.password}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.errors.password}
                  touched={props.errors.password && props.touched.password}
                  disabled={disabled || loading}
                  className="grow"
                />
              </div>
              <div>
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder={t(
                    "components.change-user-password-form.confirm-password"
                  )}
                  value={props.values.confirmPassword}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.errors.confirmPassword}
                  touched={
                    props.errors.confirmPassword &&
                    props.touched.confirmPassword
                  }
                  disabled={disabled || loading}
                  className="grow"
                />
              </div>
              <Button
                type="submit"
                disabled={
                  !(props.isValid && props.dirty) || disabled || loading
                }
                className="max-w-fit bg-green-500 focus:outline-green-500"
              >
                {t("components.change-user-password-form.submit")}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
