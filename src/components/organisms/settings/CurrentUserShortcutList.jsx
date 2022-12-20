import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  ClockIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../molecules/Pagination";
import { fetchCurrentUserShortcuts } from "../../../api/shortcuts";

function ShortcutListEntry({ shortcut }) {
  return (
    <div className="bg-white dark:bg-gray-700 relative flex rounded-lg p-3 shadow-md focus:outline-none text-gray-800 dark:text-white">
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="flex flex-col w-full space-y-1">
          <p className="font-medium">{shortcut.tag}</p>
          <p className="text-sm text-gray-400 truncate">{shortcut.url}</p>
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-3" />
            <p className="text-xs text-gray-400">
              {new Date(shortcut.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:text-white focus:outline-none"
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/redirect/${shortcut.tag}`
            );
          }}
        >
          <ClipboardDocumentIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function ShortcutSkeletonListEntry({ error }) {
  return (
    <div className="bg-white dark:bg-gray-700 relative flex rounded-lg p-3 shadow-md focus:outline-none">
      <div className="flex w-full items-center justify-between">
        <div
          className={`flex flex-col w-full space-y-1 ${
            !error && "animate-pulse"
          }`}
        >
          <div
            className={`w-1/3 h-4 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div
            className={`w-1/2 h-3 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-3" />
            <div
              className={`w-1/4 h-3 rounded-lg ${
                error
                  ? "bg-red-200 dark:bg-red-400"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CurrentUserShortcutList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onFetchShortcuts = useCallback(
    async (_page) => {
      setError(null);
      setLoading(true);

      try {
        const res = await fetchCurrentUserShortcuts({ page: _page });

        setPage(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/logout");
        } else {
          setError(t("components.current-user-shortcut-list.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t]
  );

  useEffect(() => {
    onFetchShortcuts(currentPage);
  }, [onFetchShortcuts, currentPage]);

  return (
    <div className="text-gray-800 dark:text-white space-y-4">
      <div>
        <h2 className="text-2xl">
          {t("components.current-user-shortcut-list.title")}
        </h2>
        <hr className="border-gray-300 dark:border-gray-400 mt-2" />
      </div>
      <p>{t("components.current-user-shortcut-list.description")}</p>
      <div className="flex flex-col space-y-4">
        {(loading || error) && (
          <div className="w-full relative">
            {error && (
              <button
                type="button"
                className="group absolute z-10 top-2 left-2 flex items-start space-x-2 text-red-500"
              >
                <div className="rounded-full p-1 bg-gray-100 dark:bg-gray-800 opacity-80">
                  <ExclamationTriangleIcon className="h-6" />
                </div>
                <div className="invisible group-hover:visible group-focus:visible bg-gray-100 dark:bg-gray-700 rounded-md shadow-md text-xs p-2 opacity-80 max-w-xs line-clamp-4">
                  {error}
                </div>
              </button>
            )}
            <div className="space-y-2">
              {[...Array(4).keys()].map((key) => (
                <ShortcutSkeletonListEntry key={key} error={error} />
              ))}
            </div>
          </div>
        )}
        {!loading && !error && page?.content?.length > 0 && (
          <div className="space-y-2">
            {page?.content.map((shortcut) => (
              <ShortcutListEntry key={shortcut.id} shortcut={shortcut} />
            ))}
          </div>
        )}
        {!loading && !error && page?.content?.length <= 0 && (
          <p className="text-center text-sm text-gray-800 dark:text-white">
            {t("components.current-user-shortcut-list.no-shortcuts")}
          </p>
        )}
        {!loading && !error && page?.content?.length > 0 && (
          <Pagination
            currentPage={page?.page}
            perPage={page?.perPage}
            totalElements={page?.totalElements}
            onChange={(_page) => setCurrentPage(_page)}
          />
        )}
      </div>
    </div>
  );
}
