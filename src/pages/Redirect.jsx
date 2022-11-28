import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import StackTemplate from "../components/templates/StackTemplate";
import ExternalLink from "../components/atoms/ExternalLink";
import { fetchShortcut } from "../api/shortcuts";

export default function Redirect() {
  const { t } = useTranslation();

  const { tag } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shortcut, setShortcut] = useState(null);

  const onLoad = useCallback(
    async (_tag) => {
      setShortcut(null);
      setError(null);
      setLoading(true);

      try {
        const res = await fetchShortcut(_tag);

        setShortcut(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          navigate("/not-found");
        } else {
          setError(t("pages.redirect.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t]
  );

  useEffect(() => {
    document.title = `Attoly | ${t("pages.redirect.title")}`;
  }, [t]);

  useEffect(() => {
    onLoad(tag);
  }, [tag, onLoad]);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white">
        <div className="h-full flex flex-col">
          <div
            className={`${
              error ? "bg-red-500" : "bg-sky-500"
            } text-white dark:text-gray-800`}
          >
            <div className="mx-auto max-w-[100rem] py-10 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-12 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("pages.redirect.headline")}
                </h2>
                <p className="lg:w-1/2">{t("pages.redirect.description")}</p>
              </div>
              {loading && (
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="w-10 h-10 border-b-2 border-orange-500 rounded-full animate-spin" />
                </div>
              )}
              {shortcut && (
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow w-full lg:w-fit">
                    <ExternalLink
                      href={shortcut.url}
                      rel="noreferrer"
                      type="button"
                      className="w-full px-8 py-3 md:py-4 md:px-10 md:text-lg !bg-orange-500 !focus:outline-orange-500"
                    >
                      {t("pages.redirect.redirect-me")}
                    </ExternalLink>
                  </div>
                </div>
              )}
              {error && (
                <div className="mt-8 flex flex-col lg:mt-0 lg:flex-shrink-0">
                  <div className="flex justify-center">
                    <ExclamationTriangleIcon className="h-12 w-12" />
                  </div>
                  <div className="text-center">{error}</div>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 h-72 grow">
            <div className="h-full">
              <div className="h-full rounded-lg border-4 border-dashed border-gray-200 dark:border-gray-800 flex justify-center items-center">
                <h2 className="text-gray-200 dark:text-gray-800 font-bold text-2xl text-center">
                  {t("pages.redirect.advertising")}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
