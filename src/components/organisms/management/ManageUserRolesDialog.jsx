import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
  ArrowsUpDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import * as yup from "yup";
import { Formik } from "formik";
import Button from "../../atoms/Button";
import Spinner from "../../atoms/Spinner";
import {
  fetchRoles,
  fetchRolesOfUser,
  assignRoleToUser,
  removeRoleFromUser,
} from "../../../api/roles";

export default function ManageUserRolesDialog({ userId, onClose, isOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const schema = yup.object().shape({
    role: yup.string(),
  });

  const onFetchRoles = useCallback(
    async (_userId) => {
      setLoading(true);
      setError(null);

      try {
        const rolesRes = await fetchRoles();
        const userRolesRes = await fetchRolesOfUser(_userId);

        setRoles(rolesRes.data);
        setUserRoles(userRolesRes.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/logout");
        } else if (err.response && err.response.status === 409) {
          setError(err.response.data.message);
        } else {
          setError(t("components.manage-user-roles-dialog.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t]
  );

  const onAssignRole = useCallback(
    async (values) => {
      try {
        await assignRoleToUser(
          userId,
          roles.filter((role) => role.name === values.role)[0].id
        );
        onFetchRoles(userId);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/logout");
        } else if (err.response && err.response.status === 409) {
          setError(err.response.data.message);
        } else {
          setError(t("components.manage-user-roles-dialog.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t, userId, onFetchRoles, roles]
  );

  const onRemoveRole = useCallback(
    async (_roleId) => {
      try {
        await removeRoleFromUser(userId, _roleId);
        onFetchRoles(userId);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/logout");
        } else if (err.response && err.response.status === 409) {
          setError(err.response.data.message);
        } else {
          setError(t("components.manage-user-roles-dialog.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t, userId, onFetchRoles]
  );

  const onCloseModal = () => {
    if (!loading) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      onFetchRoles(userId);
    }
  }, [onFetchRoles, isOpen, userId]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onCloseModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
              <div className="flex justify-between items-center">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  {t("components.manage-user-roles-dialog.title")}
                </Dialog.Title>
                <button
                  type="button"
                  onClick={onCloseModal}
                  disabled={loading}
                  className="p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>{t("components.manage-user-roles-dialog.description")}</div>
              {error && <p className="text-center text-red-500">{error}</p>}
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm">
                    {t("components.manage-user-roles-dialog.list-headline")}
                  </h2>
                  <hr className="mt-1" />
                </div>
                {!loading && userRoles.length > 0 && (
                  <div className="flex flex-col space-y-2 overflow-y-auto max-h-48">
                    {userRoles.map((role) => (
                      <div
                        key={role.id}
                        className="p-2 border-b border-gray-300 dark:border-gray-400 flex items-center justify-between space-x-2 text-xs"
                      >
                        <div className="space-y-1 overflow-hidden">
                          <div className="truncate">{role.name}</div>
                        </div>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => onRemoveRole(role.id)}
                          className="inline-flex items-center justify-center bg-transparent text-sky-500"
                        >
                          <MinusIcon className="h-4 w-4" aria-hidden="true" />
                          <div className="ml-1">
                            {t("components.manage-user-roles-dialog.remove")}
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {!loading && !error && userRoles.length <= 0 && (
                  <p className="text-center text-gray-800 dark:text-white">
                    {t("components.manage-user-roles-dialog.no-roles")}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm">
                    {t("components.manage-user-roles-dialog.assign-headline")}
                  </h2>
                  <hr className="mt-1" />
                </div>
                <Formik
                  initialValues={{
                    role: t("components.manage-user-roles-dialog.select"),
                  }}
                  validationSchema={schema}
                  onSubmit={onAssignRole}
                >
                  {(props) => (
                    <form
                      className="space-y-4"
                      onSubmit={props.handleSubmit}
                      noValidate
                    >
                      <div>
                        <Listbox
                          name="role"
                          value={props.values.role}
                          onChange={(role) =>
                            props.setFieldValue("role", role.name)
                          }
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-600 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                              <span className="block truncate">
                                {props.values.role}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ArrowsUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {roles.map((role) => (
                                  <Listbox.Option
                                    key={role.id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-gray-100 dark:bg-gray-700"
                                          : "text-gray-800 dark:text-white"
                                      }`
                                    }
                                    value={role}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {role.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-500">
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <Button
                        type="submit"
                        disabled={!(props.isValid && props.dirty) || loading}
                        className="w-full flex justify-center"
                      >
                        {!loading && (
                          <span>
                            {t("components.manage-user-roles-dialog.assign")}
                          </span>
                        )}
                        {loading && (
                          <Spinner className="h-6 w-6 !text-gray-600 !fill-orange-500" />
                        )}
                      </Button>
                    </form>
                  )}
                </Formik>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
