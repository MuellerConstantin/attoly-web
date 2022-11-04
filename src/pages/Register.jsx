import { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";

import { createUser } from "../api/users";

import Logo from "../assets/images/logo.svg";

const schema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Is required"),
  password: yup.string().required("Is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Is required"),
});

export default function Register() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "TaskCare | Register";
  }, []);

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
        setSuccess(
          "The user account has been created successfully. To activate the account, follow the instructions in the email that will be sent to you."
        );
      } catch (err) {
        if (err.response && err.response.status === 422) {
          err.response.data.details?.forEach((detail) =>
            setFieldError(detail.field, detail.message)
          );
        } else {
          setError("An unexpected error occurred, please retry!");
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setSuccess]
  );

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
          <div>
            <img
              className="mx-auto h-10 md:h-12 lg:h-14 w-auto"
              src={Logo}
              alt="Logo"
            />
            <h1 className="mt-4 text-center lg:text-3xl text-2xl font-bold">
              Create your new account
            </h1>
          </div>
          {success && (
            <div className="flex justify-center">
              <p className="text-left text-green-500">{success}</p>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <p className="text-left text-red-500">{error}</p>
            </div>
          )}
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
                  {!loading && <span>Register</span>}
                  {loading && (
                    <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                  )}
                </Button>
                <p className="text-center text-xs">
                  By clicking &quot;Register&quot; you agree to our&nbsp;
                  <Link to="/terms-of-use">Terms of Use</Link>
                  &nbsp;and our&nbsp;
                  <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </Formik>
          <div className="text-center">
            <Link className="!text-sm" to="/login">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
