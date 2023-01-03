import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Avatar from "../../atoms/Avatar";
import Link from "../../atoms/Link";
import DeleteUserDialog from "./DeleteUserDialog";
import ManageUserRolesDialog from "./ManageUserRolesDialog";
import { updateUser } from "../../../api/users";

export default function EditableUserListEntry({ user, onChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLock = useCallback(async () => {
    try {
      await updateUser(user.id, { locked: true });
      if (onChange) onChange();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/logout");
      }

      throw err;
    }
  }, [navigate, user.id, onChange]);

  const onUnlock = useCallback(async () => {
    try {
      await updateUser(user.id, { locked: false });
      if (onChange) onChange();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/logout");
      }

      throw err;
    }
  }, [navigate, user.id, onChange]);

  const [popupButtonElement, setPopupButtonElement] = useState();
  const [popupDialogElement, setPopupDialogElement] = useState();
  const { styles, attributes } = usePopper(
    popupButtonElement,
    popupDialogElement,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: [
              "bottom-end",
              "top-start",
              "top-end",
              "left",
              "right",
            ],
          },
        },
      ],
    }
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRolesDialog, setShowRolesDialog] = useState(false);

  return (
    <div className="flex w-full">
      <UserListEntry user={user} />
      <DeleteUserDialog
        userId={user.id}
        isOpen={showDeleteDialog}
        onSubmit={() => {
          setShowDeleteDialog(false);
          if (onChange) onChange();
        }}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
      />
      <ManageUserRolesDialog
        userId={user.id}
        isOpen={showRolesDialog}
        onClose={() => {
          setShowRolesDialog(false);
        }}
      />
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button
              ref={setPopupButtonElement}
              className="p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            >
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
            <Popover.Panel
              ref={setPopupDialogElement}
              className="shadow-md border dark:border-gray-900 rounded-md z-10 w-screen max-w-xs sm:max-w-sm bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
              style={styles.popper}
              {...attributes.popper}
            >
              <div className="p-2 text-gray-800 dark:text-white flex flex-col space-y-2">
                <button
                  type="button"
                  className="flex justify-left items-center p-2 hover:bg-gray-100 hover:cursor-pointer hover:dark:bg-gray-700 rounded"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <div className="text-sm">
                    {t("components.user-list-entry.menu.delete")}
                  </div>
                </button>
                <button
                  type="button"
                  className="flex justify-left items-center p-2 hover:bg-gray-100 hover:cursor-pointer hover:dark:bg-gray-700 rounded"
                  onClick={() => setShowRolesDialog(true)}
                >
                  <div className="text-sm">
                    {t("components.user-list-entry.menu.roles")}
                  </div>
                </button>
                {user.locked ? (
                  <button
                    type="button"
                    className="flex justify-left items-center p-2 hover:bg-gray-100 hover:cursor-pointer hover:dark:bg-gray-700 rounded"
                    onClick={onUnlock}
                  >
                    <div className="text-sm">
                      {t("components.user-list-entry.menu.unlock")}
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex justify-left items-center p-2 hover:bg-gray-100 hover:cursor-pointer hover:dark:bg-gray-700 rounded"
                    onClick={onLock}
                  >
                    <div className="text-sm">
                      {t("components.user-list-entry.menu.lock")}
                    </div>
                  </button>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
}

export function UserListEntry({ user }) {
  return (
    <div
      className={`w-full rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-4 flex items-center space-x-4 ${
        user.locked && "brightness-75"
      }`}
    >
      <div className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white p-1 rounded-lg">
        <div className="h-12 aspect-square">
          <Avatar value={user.email} />
        </div>
      </div>
      <div className="flex flex-col space-y-2 overflow-hidden">
        <div className="truncate overflow-hidden">
          <Link
            className="text-md font-semibold !text-gray-800 dark:!text-white"
            to={`/users/${user.id}`}
          >
            {user.email}
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-ellipsis">
            {user.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export function UserSkeletonListEntry({ error }) {
  return (
    <div className={`w-full ${!error && "animate-pulse"}`}>
      <div className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-4 flex items-center space-x-4">
        <div
          className={`h-12 aspect-square rounded-lg ${
            error
              ? "bg-red-200 dark:bg-red-400"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        />
        <div className="space-y-2 w-full">
          <div
            className={`w-2/3 h-4 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div
            className={`w-1/3 h-3 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
