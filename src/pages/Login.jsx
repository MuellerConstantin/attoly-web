import { useEffect, useState, useCallback } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import authSlice from "../store/slices/auth";
import { generateToken } from "../api/auth";

import Logo from "../assets/images/logo.svg";

const schema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Is required"),
  password: yup.string().required("Is required"),
});

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "TaskCare | Login";
  }, []);

  const onLogin = useCallback(
    async (values) => {
      setLoading(true);
      setError(null);

      try {
        const res = await generateToken(values.email, values.password);

        dispatch(
          authSlice.actions.setAuthentication({
            accessToken: res.data.accessToken,
            accessExpiresIn: res.data.accessExpiresIn,
            refreshToken: res.data.refreshToken,
            refreshExpiresIn: res.data.refreshExpiresIn,
            principal: res.data.principal,
          })
        );

        navigate("/home");
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Either username or password are wrong!");
        } else {
          setError("An unexpected error occurred, please retry!");
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate, setLoading, setError]
  );

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-12 space-y-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
          <div>
            <img
              className="mx-auto h-10 md:h-12 lg:h-14 w-auto"
              src={Logo}
              alt="Logo"
            />
            <h1 className="mt-4 text-center lg:text-3xl text-2xl font-bold">
              Sign in to your account
            </h1>
          </div>
          {error && (
            <div className="flex justify-center">
              <p className="text-left text-red-500">{error}</p>
            </div>
          )}
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
                <Button
                  type="submit"
                  disabled={!(props.isValid && props.dirty) || loading}
                  className="w-full flex justify-center"
                >
                  {!loading && <span>Login</span>}
                  {loading && (
                    <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                  )}
                </Button>
              </form>
            )}
          </Formik>
          <div className="flex flex-col md:flex-row justify-center md:space-x-2">
            <div className="text-center">
              <Link className="!text-sm" to="/reset-password">
                Forgot your password?
              </Link>
            </div>
            <div className="hidden md:block">|</div>
            <div className="text-center">
              <Link className="!text-sm" to="/verify-user">
                Activate your account?
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link className="!text-sm" to="/register">
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </StackTemplate>
  );
}
