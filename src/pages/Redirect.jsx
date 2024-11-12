import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import StackTemplate from "../components/templates/StackTemplate";
import ExternalLink from "../components/atoms/ExternalLink";
import { fetchShortcut } from "../api/shortcuts";

function Spinner({ timeLeft }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-10 h-10 text-gray-400 animate-spin fill-sky-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="absolute text-gray-800 dark:text-white text-sm font-semibold">
        {timeLeft}
      </span>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default function Redirect() {
  const { t } = useTranslation();

  const { tag } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shortcut, setShortcut] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const onLoad = useCallback(
    async (_tag) => {
      setShortcut(null);
      setError(null);
      setLoading(true);

      try {
        const res = await fetchShortcut(_tag);

        setShortcut(res.data);
        setTimeLeft(10);
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

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }

    if (!timeLeft) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, shortcut]);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white">
        <div className="h-full flex flex-col">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
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
                  {timeLeft ? (
                    <Spinner timeLeft={timeLeft} />
                  ) : (
                    <div className="inline-flex rounded-md shadow w-full lg:w-fit">
                      <ExternalLink
                        href={shortcut.url}
                        rel="noreferrer"
                        type="button"
                        className="w-full px-8 py-3 md:py-4 md:px-10 md:text-lg !bg-orange-500 !focus:outline-orange-500"
                        onClick={(element) => {
                          if (timeLeft) {
                            element.preventDefault();
                          } else {
                            element.click();
                          }
                        }}
                      >
                        <div className="flex justify-center items-center space-x-2">
                          {t("pages.redirect.redirect-me")}
                        </div>
                      </ExternalLink>
                    </div>
                  )}
                </div>
              )}
              {error && (
                <div className="mt-8 flex flex-col lg:mt-0 lg:flex-shrink-0 text-red-500">
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
