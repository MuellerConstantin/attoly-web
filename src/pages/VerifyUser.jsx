import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import { requestVerificationEmail, verifyUser } from "../api/users";

import Logo from "../assets/images/logo.svg";
import UserVerifiedImage from "../assets/images/user-verified.svg";
import ErrorImage from "../assets/images/error.svg";

const schema = yup.object().shape({
  email: yup.string().email("Must be a valid email").required("Is required"),
});

function VerifyUserConfirmation() {
  const [searchParams] = useSearchParams();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onVerifyUser = useCallback(async (token) => {
    setSuccess(null);
    setError(null);

    try {
      await verifyUser({ verificationToken: token });

      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.status === 410) {
        setError(
          "The verification link is not valid. The token used may have expired."
        );
      } else {
        setError("An unexpected error occurred, please retry!");
      }

      throw err;
    }
  }, []);

  useEffect(() => {
    onVerifyUser(searchParams.get("token"));
  }, [searchParams, onVerifyUser]);

  if (success) {
    return (
      <div className="h-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3">
              <img
                className="w-full h-full"
                src={UserVerifiedImage}
                alt="User Verified"
              />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-4xl">E-Mail verified.</div>
              <div>
                The account has been activated, to log in click&nbsp;
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
      <div className="h-full bg-white dark:bg-gray-600 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3">
              <img className="w-full h-full" src={ErrorImage} alt="Error" />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-4xl">Oops! Something get wrong</div>
              <div>
                {error}&nbsp;To try again click&nbsp;
                <Link to="/verify-user">here</Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center p-2 pt-6">
      <div className="w-10 h-10 border-b-2 border-sky-500 rounded-full animate-spin" />
    </div>
  );
}

function VerifyUserRequest() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onResend = useCallback(async (values, { resetForm }) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await requestVerificationEmail(values.email);

      resetForm();
      setSuccess("The email with the verification link was sent successfully.");
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
    <div className="h-full text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-12 space-y-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
        <div>
          <img
            className="mx-auto h-10 md:h-12 lg:h-14 w-auto"
            src={Logo}
            alt="Logo"
          />
          <h1 className="mt-4 text-center lg:text-3xl text-2xl font-bold">
            Resend user verification e-mail
          </h1>
        </div>
        <p>
          If the original e-mail with the link to verify the user did not
          arrive, or the link has already expired, a new e-mail can be sent
          here. Then follow the instructions in the email to activate the
          account.
        </p>
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
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={onResend}
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
                {!loading && <span>Resend e-mail</span>}
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Attoly | Verify User";
  }, []);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600">
        {searchParams.get("token") ? (
          <VerifyUserConfirmation />
        ) : (
          <VerifyUserRequest />
        )}
      </div>
    </StackTemplate>
  );
}
