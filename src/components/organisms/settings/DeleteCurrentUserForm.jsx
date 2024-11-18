import { useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteCurrentUserDialog from "./DeleteCurrentUserDialog";
import Button from "../../atoms/Button";

export default function DeleteUserForm({ onChange, disabled }) {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="text-gray-800 dark:text-white space-y-4">
      <div>
        <h2 className="text-2xl text-red-500">
          {t("components.delete-current-user-form.title")}
        </h2>
        <hr className="border-red-500 mt-2" />
      </div>
      <p>{t("components.delete-current-user-form.description")}</p>
      <div className="w-full">
        <DeleteCurrentUserDialog
          onSubmit={() => {
            setShowDeleteModal(false);
            if (onChange) onChange();
          }}
          onClose={() => setShowDeleteModal(false)}
          isOpen={showDeleteModal}
        />
        <Button
          type="button"
          disabled={disabled}
          className="!bg-red-100 dark:!bg-red-400 !text-red-500 dark:!text-red-900 border-solid border border-red-500 dark:border-red-900"
          onClick={() => setShowDeleteModal(true)}
        >
          {t("components.delete-current-user-form.delete")}
        </Button>
      </div>
    </div>
  );
}
