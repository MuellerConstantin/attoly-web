import { useState, useEffect, useCallback } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../molecules/Pagination";
import UserListEntry, { UserSkeletonListEntry } from "./UserListEntry";
import FilteringAndSortingForm from "../../molecules/FilteringAndSortingForm";
import Link from "../../atoms/Link";
import { fetchUsers } from "../../../api/users";

export default function UserList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(null);
  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onFetchUsers = useCallback(
    async (_page, _filter) => {
      setError(null);
      setLoading(true);

      try {
        const res = await fetchUsers({
          page: _page,
          perPage: 10,
          filter: _filter && `email=like=*${_filter}*`,
        });

        setPage(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/logout");
        } else {
          setError(t("components.user-list.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t]
  );

  useEffect(() => {
    onFetchUsers(currentPage, filter);
  }, [onFetchUsers, currentPage, filter]);

  return (
    <div className="text-gray-800 dark:text-white space-y-4">
      <div>
        <h2 className="text-2xl">{t("components.user-list.title")}</h2>
        <hr className="border-gray-300 dark:border-gray-400 mt-2" />
      </div>
      <p>{t("components.user-list.description")}</p>
      <div className="flex space-x-1 items-center">
        <InformationCircleIcon className="h-4" />
        <p className="text-xs">
          <Trans
            t={t}
            i18nKey="components.user-list.disclaimer"
            components={{
              "privacy-policy-link": (
                <Link to="/privacy-policy" className="font-semibold" />
              ),
            }}
          />
        </p>
      </div>
      <FilteringAndSortingForm
        disabled={loading || error}
        onFilter={(query) => setFilter(query)}
      />
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
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {[...Array(4).keys()].map((key) => (
                <UserSkeletonListEntry key={key} error={error} />
              ))}
            </div>
          </div>
        )}
        {!loading && !error && page?.content?.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {page?.content.map((user) => (
              <UserListEntry
                key={user.id}
                user={user}
                onChange={() => onFetchUsers(0)}
              />
            ))}
          </div>
        )}
        {!loading && !error && page?.content?.length <= 0 && (
          <p className="text-center text-sm text-gray-800 dark:text-white">
            {t("components.user-list.no-users")}
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
