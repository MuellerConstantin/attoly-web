import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TextField from "../atoms/TextField";
import Button from "../atoms/Button";

export default function FilteringAndSortingForm({ onFilter, disabled }) {
  const { t } = useTranslation();

  const [filter, setFilter] = useState(null);

  const schema = yup.object().shape({
    search: yup.string().required(t("validation.required")),
  });

  useEffect(() => {
    onFilter(filter);
  }, [filter, onFilter]);

  return (
    <div className="space-y-2">
      <div className="w-full">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values, { resetForm }) => {
            setFilter(values.search);
            resetForm();
          }}
          validationSchema={schema}
        >
          {(props) => (
            <form
              className="flex w-full"
              onSubmit={props.handleSubmit}
              noValidate
            >
              <TextField
                type="text"
                name="search"
                placeholder={t("components.filtering-and-sorting-form.search")}
                value={props.values.search}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                disabled={disabled}
                className="rounded-r-none grow focus:!outline-sky-500"
              />
              <Button
                type="submit"
                disabled={disabled}
                className="border-l-0 rounded-l-none !bg-sky-500 focus:!outline-sky-500"
              >
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </form>
          )}
        </Formik>
      </div>
      {filter && (
        <div className="flex max-w-full text-xs">
          <div className="block max-w-full p-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setFilter(null)}
              className="rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="truncate p-1">
              <span className="font-normal">Filter:</span>
              &nbsp;
              {filter}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
