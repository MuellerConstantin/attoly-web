import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { useTranslation, Trans } from "react-i18next";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { QRCodeCanvas } from "qrcode.react";
import StackTemplate from "../components/templates/StackTemplate";
import TextField from "../components/atoms/TextField";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import { createShortcut } from "../api/shortcuts";

import LogoTextLight from "../assets/images/logo-text-light.svg";
import LogoTextDark from "../assets/images/logo-text-dark.svg";
import WallpaperImage from "../assets/images/wallpaper.svg";

export default function GetStarted() {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    url: yup
      .string()
      .url(t("validation.url"))
      .required(t("validation.required")),
  });

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
          setError(t("pages.get-started.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setShortcut, t]
  );

  useEffect(() => {
    document.title = `Attoly | ${t("pages.get-started.title")}`;
  }, [t]);

  return (
    <StackTemplate>
      <div
        className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col items-center justify-center px-4 py-32 space-y-4"
        style={{
          backgroundImage: `url(${WallpaperImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {shortcut ? (
          <div className="flex flex-col items-center w-full max-w-2xl">
            <div className="w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
              <h1 className="mt-4 text-center text-2xl font-bold mt-0">
                {t("pages.get-started.response-headline")}
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
                  {t("pages.get-started.copy-url")}
                </Button>
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-lg font-bold mt-0">
                  {t("pages.get-started.share-url")}
                </h2>
                <div className="space-x-2">
                  <EmailShareButton
                    url={`${window.location.origin}/redirect/${shortcut.tag}`}
                    subject="Check out this URL"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <FacebookShareButton
                    url={`${window.location.origin}/redirect/${shortcut.tag}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={`${window.location.origin}/redirect/${shortcut.tag}`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={`${window.location.origin}/redirect/${shortcut.tag}`}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <TelegramShareButton
                    url={`${window.location.origin}/redirect/${shortcut.tag}`}
                  >
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              </div>
              <div className="space-y-2 text-center flex flex-col items-center">
                <h2 className="text-lg font-bold mt-0">
                  {t("pages.get-started.share-qrcode")}
                </h2>
                <div className="w-fit p-2 bg-white">
                  <QRCodeCanvas
                    id="qrcode"
                    size="194"
                    className="w-full h-auto max-w-[20rem]"
                    value={`${window.location.origin}/redirect/${shortcut.tag}`}
                  />
                </div>
                <Button
                  onClick={() => {
                    const qrCodeURL = document
                      .getElementById("qrcode")
                      .toDataURL("image/png")
                      .replace("image/png", "image/octet-stream");

                    const link = document.createElement("a");
                    link.href = qrCodeURL;
                    link.download = "QR-Code.png";
                    link.click();
                  }}
                >
                  {t("pages.get-started.download-qrcode")}
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <Link
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  setShortcut(null);
                }}
                className="!text-gray-800 !dark:text-white"
              >
                {t("pages.get-started.short-another")}
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white shadow-md rounded-md p-8 space-y-6">
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
                {t("pages.get-started.request-headline")}
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
                      placeholder={t("pages.get-started.url-field")}
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
                      <span>
                        {t("pages.get-started.generate-shortcut")}
                        {!principal && "*"}
                      </span>
                    )}
                    {loading && (
                      <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                    )}
                  </Button>
                  <p className="text-center text-xs">
                    <Trans
                      t={t}
                      i18nKey="pages.get-started.usage-terms-notice"
                      components={{
                        "terms-hyperlink": <Link to="/terms-of-use" />,
                        "privacy-hyperlink": <Link to="/privacy-policy" />,
                      }}
                    />
                  </p>
                  {!principal && (
                    <p className="text-center text-xs">
                      *
                      <Trans
                        t={t}
                        i18nKey="pages.get-started.expiry-notice"
                        components={{
                          hyperlink: <Link to="/login" />,
                        }}
                      />
                    </p>
                  )}
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </StackTemplate>
  );
}
