import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import { requestResetEmail, resetPassword } from "../api/users";

import Logo from "../assets/images/logo.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";
import PasswordResetImage from "../assets/images/password-reset.svg";
import ErrorImage from "../assets/images/error.svg";

function ResetPasswordConfirmation() {
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
    async (values) => {
      setLoading(true);
      setSuccess(null);
      setError(null);

      try {
        await resetPassword({
          resetToken: searchParams.get("token"),
          password: values.password,
        });

        setSuccess(true);
      } catch (err) {
        if (err.response && err.response.status === 410) {
          setError(
            "The reset link is not valid. The token used may have expired."
          );
        } else {
          setError("An unexpected error occurred, please retry!");
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [searchParams, setLoading, setSuccess, setError]
  );

  if (success) {
    return (
      <div className="h-full flex items-center justify-center px-4 py-12">
        <div className="w-full md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 2xl:max-w-[100rem]">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3 xl:w-1/2">
              <img
                className="w-full h-full"
                src={PasswordResetImage}
                alt="Password Reset"
              />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-4xl">
                Password reset.
              </div>
              <div>
                The password has been reset successfully, to log in click&nbsp;
                <Link to="/login">here</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center px-4 py-12">
        <div className="w-full md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 2xl:max-w-[100rem]">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3 xl:w-1/2">
              <img className="w-full h-full" src={ErrorImage} alt="Error" />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-4xl">
                Oops! Something get wrong
              </div>
              <div>
                {error}&nbsp;To try again click&nbsp;
                <Link to="/reset-password">here</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Reset your account password
          </h1>
        </div>
        <p>
          Have you forgotten your password and you can no longer log in? No
          problem. Get an email with a link to reset your password.
        </p>
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
                  placeholder="Password"
                  label="Password"
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
                  placeholder="Confirm Password"
                  label="Confirm Password"
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
                {!loading && <span>Reset password</span>}
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

function ResetPasswordRequest() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Must be a valid email").required("Is required"),
  });

  const onSend = useCallback(async (values, { resetForm }) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await requestResetEmail(values.email);

      resetForm();
      setSuccess("The email with the reset link was sent successfully.");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No account could be found with this email.");
      } else {
        setError("An unexpected error occurred, please retry!");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
            Reset your account password
          </h1>
        </div>
        <p>
          Have you forgotten your password and you can no longer log in? No
          problem. Get an email with a link to reset your password.
        </p>
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
                  placeholder="E-Mail"
                  label="E-Mail"
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
                {!loading && <span>Send e-mail</span>}
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

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Attoly | Reset Password";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white">
        {searchParams.get("token") ? (
          <ResetPasswordConfirmation />
        ) : (
          <ResetPasswordRequest />
        )}
      </div>
    </StackTemplate>
  );
}
