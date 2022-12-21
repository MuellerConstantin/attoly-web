import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";

export default function Pagination({
  perPage,
  currentPage,
  totalElements,
  onChange,
}) {
  const { t } = useTranslation();

  if (currentPage > Math.ceil(totalElements / perPage)) {
    throw new Error(
      "Paging information is incorrect, the current page has a higher index than pages exist."
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        {t("components.pagination.showing")}&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage * perPage + 1}
        </span>
        &nbsp;{t("components.pagination.to")}&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(currentPage * perPage + perPage, totalElements)}
        </span>
        &nbsp;{t("components.pagination.of")}&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalElements}
        </span>
        &nbsp;{t("components.pagination.elements")}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <Button
          disabled={currentPage * perPage + 1 <= 1}
          className="border-r-0 rounded-r-none inline-flex !bg-sky-500 focus:!outline-sky-500"
          onClick={() => onChange(currentPage - 1)}
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" aria-hidden="true" />
          {t("components.pagination.previous")}
        </Button>
        <Button
          disabled={
            Math.min(currentPage * perPage + perPage, totalElements) >=
            totalElements
          }
          className="border-l-0 rounded-l-none inline-flex !bg-sky-500 focus:!outline-sky-500"
          onClick={() => onChange(currentPage + 1)}
        >
          {t("components.pagination.next")}
          <ArrowRightIcon className="h-6 w-6 ml-2" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
