import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import StackTemplate from "../components/templates/StackTemplate";
import ExternalLink from "../components/atoms/ExternalLink";
import Link from "../components/atoms/Link";
import Spinner from "../components/atoms/Spinner";
import CreateComplaintDialog from "../components/organisms/CreateComplaintDialog";
import { fetchShortcut } from "../api/shortcuts";

export default function Redirect() {
  const { t } = useTranslation();

  const { tag } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shortcut, setShortcut] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

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
      <CreateComplaintDialog
        tag={tag}
        onClose={() => setShowComplaintModal(false)}
        isOpen={showComplaintModal}
      />
      <div className="grow">
        <div className="h-full flex flex-col">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <div className="mx-auto max-w-[100rem] py-10 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-12 lg:px-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("pages.redirect.headline")}
                </h2>
                <p className="lg:w-1/2 mt-2 text-xs">
                  {t("pages.redirect.description")}
                </p>
                <Link
                  href="/"
                  className="!text-xs"
                  onClick={(element) => {
                    element.preventDefault();
                    setShowComplaintModal(true);
                  }}
                >
                  File a complaint
                </Link>
              </div>
              {loading && (
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <Spinner className="h-6 w-6 !text-gray-600 !fill-orange-500" />
                </div>
              )}
              {shortcut && (
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  {timeLeft ? (
                    <div className="flex justify-center items-center w-full">
                      <Spinner label={timeLeft} />
                    </div>
                  ) : (
                    <div className="inline-flex rounded-md shadow w-full lg:w-fit">
                      <ExternalLink
                        href={shortcut.url}
                        rel="noreferrer"
                        type="button"
                        className="w-full px-8 py-3 !bg-orange-500 !focus:outline-orange-500"
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
              <div className="h-full rounded-lg border-4 border-dashed border-gray-200 dark:border-gray-900 flex justify-center items-center">
                <h2 className="text-gray-200 dark:text-gray-900 font-bold text-2xl text-center">
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
