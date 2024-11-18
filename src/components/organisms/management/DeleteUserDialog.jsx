import React, { Fragment, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../atoms/Button";
import Spinner from "../../atoms/Spinner";
import { deleteUser } from "../../../api/users";

export default function DeleteUserDialog({
  onSubmit,
  onClose,
  isOpen,
  userId,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmitModal = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteUser(userId);
      onSubmit();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/logout");
      } else if (err.response && err.response.status === 409) {
        setError(err.response.data.message);
      } else {
        setError(t("components.delete-user-dialog.error"));
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate, onSubmit, t, userId]);

  const onCloseModal = () => {
    if (!loading) {
      onClose();
    }
  };

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
            <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
              <div className="flex justify-between items-center">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  {t("components.delete-user-dialog.title")}
                </Dialog.Title>
                <button
                  type="button"
                  onClick={onCloseModal}
                  disabled={loading}
                  className="p-1 rounded-full text-gray-600 hover:text-gray-00 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {error && <p className="text-center text-red-500">{error}</p>}
              <div>{t("components.delete-user-dialog.description")}</div>
              <div className="flex justify-between">
                <Button
                  onClick={onSubmitModal}
                  disabled={loading}
                  className="!bg-gray-200 hover:!bg-gray-300 focus:!outline-green-500 !text-green-500 w-32 flex justify-center"
                >
                  {!loading && (
                    <span>{t("components.delete-user-dialog.yes")}</span>
                  )}
                  {loading && (
                    <Spinner className="h-6 w-6 !text-gray-600 !fill-orange-500" />
                  )}
                </Button>
                <Button
                  onClick={onCloseModal}
                  disabled={loading}
                  className="!bg-gray-200 hover:!bg-gray-300 focus:!outline-red-500 !text-red-500 w-32"
                >
                  {t("components.delete-user-dialog.no")}
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
