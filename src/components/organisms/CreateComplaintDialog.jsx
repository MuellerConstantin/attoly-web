import React, { Fragment, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  CheckIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import * as yup from "yup";
import { Formik } from "formik";
import { createComplaint } from "../../api/complaints";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";

export default function CreateComplaintDialog({ tag, onClose, isOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reasons] = useState(["SPAM", "PHISHING", "MALWARE", "DEFACEMENT"]);

  const schema = yup.object().shape({
    reason: yup
      .string()
      .required(t("validation.required"))
      .matches(/^(?!DEFAULT$).+/, t("validation.select")),
    comment: yup.string().required(t("validation.required")),
  });

  const onSubmit = useCallback(
    async (values, { setFieldError, resetForm }) => {
      setLoading(true);
      setError(null);

      try {
        await createComplaint(tag, {
          reason: values.reason,
          comment: values.comment,
        });

        resetForm();

        if (onClose) onClose();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/logout");
        } else if (err.response && err.response.status === 422) {
          err.response.data.details?.forEach((detail) =>
            setFieldError(detail.field, detail.message)
          );
        } else {
          setError(t("pages.redirect.error"));
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, t, tag, onClose]
  );

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
            <Dialog.Panel className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
              <div className="flex justify-between items-center">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  {t("components.create-complaint-dialog.title")}
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
              <div>{t("components.create-complaint-dialog.description")}</div>
              {error && <p className="text-center text-red-500">{error}</p>}
              <div className="space-y-4">
                <Formik
                  initialValues={{
                    reason: "DEFAULT",
                    comment: "",
                  }}
                  validationSchema={schema}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <form
                      className="space-y-4"
                      onSubmit={props.handleSubmit}
                      noValidate
                    >
                      <div>
                        <Listbox
                          name="reason"
                          value={props.values.reason}
                          onChange={(reason) =>
                            props.setFieldValue("reason", reason)
                          }
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-600 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
                              <span className="block truncate">
                                {t(
                                  `components.create-complaint-dialog.reason.${props.values.reason}`
                                )}
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
                                {reasons.map((reason) => (
                                  <Listbox.Option
                                    key={reason}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-gray-100 dark:bg-gray-700"
                                          : "text-gray-800 dark:text-white"
                                      }`
                                    }
                                    value={reason}
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
                                          {t(
                                            `components.create-complaint-dialog.reason.${reason}`
                                          )}
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
                      <TextArea
                        name="comment"
                        placeholder={t(
                          "components.create-complaint-dialog.comment"
                        )}
                        value={props.values.comment}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        error={props.errors.comment}
                        touched={props.errors.comment && props.touched.comment}
                      />
                      <Button
                        type="submit"
                        disabled={!(props.isValid && props.dirty) || loading}
                        className="w-full flex justify-center"
                      >
                        {!loading && (
                          <span>
                            {t("components.create-complaint-dialog.assign")}
                          </span>
                        )}
                        {loading && (
                          <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
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
