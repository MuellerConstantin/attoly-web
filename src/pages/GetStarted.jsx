import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import { createShortcut } from "../api/shortcuts";

import LogoTextLight from "../assets/images/logo-text-light.svg";
import LogoTextDark from "../assets/images/logo-text-dark.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";

const schema = yup.object().shape({
  url: yup.string().url("Must be a valid URL").required("Is required"),
});

export default function GetStarted() {
  const [error, setError] = useState(null);
  const [shortcut, setShortcut] = useState(null);
  const [loading, setLoading] = useState(false);

  const principal = useSelector((state) => state.auth.principal);

  const onGenerate = useCallback(
    async (values, { setFieldError, resetForm }) => {
      setLoading(true);
      setShortcut(null);
      setError(null);

      try {
        const res = await createShortcut({ url: values.url });
        resetForm();
        setShortcut(res.data);
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
    [setLoading, setError, setShortcut]
  );

  useEffect(() => {
    document.title = "Attoly | Get Started";
  }, []);

  return (
    <StackTemplate>
      <div
        className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-12 space-y-4"
        style={{
          backgroundImage: `url(${WallpaperImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
          <div>
            <img
              className="hidden dark:block mx-auto h-10 md:h-12 lg:h-14 w-auto"
              src={LogoTextLight}
              alt="Logo"
            />
            <img
              className="block dark:hidden mx-auto h-10 md:h-12 lg:h-14 w-auto"
              src={LogoTextDark}
              alt="Attoly Logo"
            />
            <h1 className="mt-4 text-center text-2xl font-bold">
              Paste the URL to be shortened
            </h1>
          </div>
          {error && <p className="text-center text-red-500">{error}</p>}
          <Formik
            initialValues={{ url: "" }}
            validationSchema={schema}
            onSubmit={onGenerate}
          >
            {(props) => (
              <form
                className="space-y-4"
                onSubmit={props.handleSubmit}
                noValidate
              >
                <div>
                  <TextField
                    name="url"
                    type="url"
                    placeholder="URL"
                    disabled={loading}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.url}
                    error={props.errors.url}
                    touched={props.errors.url && props.touched.url}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!(props.isValid && props.dirty) || loading}
                  className="w-full flex justify-center"
                >
                  {!loading && (
                    <span>Generate shortcut{!principal && "*"}</span>
                  )}
                  {loading && (
                    <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                  )}
                </Button>
                <p className="text-center text-xs">
                  By clicking &quot;Generate shortcut&quot; you agree to
                  our&nbsp;
                  <Link to="/terms-of-use">Terms of Use</Link>
                  &nbsp;and our&nbsp;
                  <Link to="/privacy-policy">Privacy Policy</Link>.
                </p>
                {!principal && (
                  <p className="text-center text-xs">
                    *You are not logged in. Your shortcuts will therefore expire
                    after some time and will be removed. To change this
                    click&nbsp;
                    <Link to="/login">here</Link>.
                  </p>
                )}
              </form>
            )}
          </Formik>
        </div>
        {shortcut && (
          <div className="w-full max-w-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
            <h1 className="mt-4 text-center text-2xl font-bold mt-0">
              Your shortened URL
            </h1>
            <div className="flex space-x-2 w-full">
              <div className="bg-white grow dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-500 block w-full px-3 py-2 scroll-px-3 rounded-md focus:outline-none whitespace-nowrap overflow-x-auto">
                {`${window.location.origin}/redirect/${shortcut.tag}`}
              </div>
              <Button
                type="submit"
                className="whitespace-nowrap"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/redirect/${shortcut.tag}`
                  );
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </StackTemplate>
  );
}
