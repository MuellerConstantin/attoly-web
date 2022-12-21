import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover, Switch } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { usePopper } from "react-popper";
import { useTranslation } from "react-i18next";
import Avatar from "../atoms/Avatar";
import Link from "../atoms/Link";
import themeSlice from "../../store/slices/theme";

export default function NavbarMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const principal = useSelector((state) => state.auth.principal);
  const roles = useSelector((state) => state.auth.roles);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const onThemeToggle = (value) => {
    dispatch(themeSlice.actions.setDarkMode(value));
  };

  const [popupButtonElement, setPopupButtonElement] = useState();
  const [popupDialogElement, setPopupDialogElement] = useState();
  const { styles, attributes } = usePopper(
    popupButtonElement,
    popupDialogElement,
    {
      placement: "bottom-end",
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: [
              "bottom-start",
              "top-end",
              "top-start",
              "left",
              "right",
            ],
          },
        },
      ],
    }
  );

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            ref={setPopupButtonElement}
            className="p-1 rounded-full text-gray-200 dark:text-gray-600 hover:text-white dark:text-gray-800 focus:outline-none"
          >
            {principal ? (
              <div className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white p-2 rounded-full">
                <div className="h-5 md:h-6 aspect-square rounded-md">
                  <Avatar value={principal} />
                </div>
              </div>
            ) : (
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </Popover.Button>
          <Popover.Panel
            ref={setPopupDialogElement}
            className="shadow-md border dark:border-gray-900 rounded-md z-50 w-screen max-w-xs sm:max-w-sm bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white"
            style={styles.popper}
            {...attributes.popper}
          >
            {principal ? (
              <div className="p-4 bg-white dark:bg-gray-800 flex space-x-4 items-center justify-between">
                <div className="flex space-x-4 items-center overflow-hidden">
                  <div className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white p-2 rounded-full">
                    <div className="h-10 aspect-square rounded-md">
                      <Avatar value={principal} />
                    </div>
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <div className="truncate">{principal}</div>
                  </div>
                </div>
                <div>
                  <Link
                    to="/logout"
                    className="p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  >
                    <ArrowLeftOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex md:hidden flex-col">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 flex space-x-4 items-center justify-between">
                  <Link to="/login" type="button" className="grow">
                    {t("components.navbar.navigation.login")}
                  </Link>
                  <Link to="/register" type="button" className="grow">
                    {t("components.navbar.navigation.register")}
                  </Link>
                </div>
              </div>
            )}
            <div className="p-2 text-gray-800 dark:text-white flex flex-col space-y-2">
              {principal &&
                roles.filter(
                  (role) =>
                    role.name === "ROLE_ADMIN" || role.name === "ROLE_MODERATOR"
                ).length > 0 && (
                  <Link
                    to="/management"
                    className="flex justify-left items-center p-2 hover:!no-underline !text-gray-800 dark:!text-white hover:!bg-gray-100 hover:dark:!bg-gray-700 hover:cursor-pointer rounded"
                  >
                    <div className="text-sm">
                      {t("components.navbar.menu.management")}
                    </div>
                  </Link>
                )}
              {principal && (
                <Link
                  to="/settings"
                  className="flex justify-left items-center p-2 hover:!no-underline !text-gray-800 dark:!text-white hover:!bg-gray-100 hover:dark:!bg-gray-700 hover:cursor-pointer rounded"
                >
                  <div className="text-sm">
                    {t("components.navbar.menu.settings")}
                  </div>
                </Link>
              )}
              <div className="flex justify-between items-center p-2 rounded">
                <div className="text-sm">
                  {t("components.navbar.menu.dark-mode")}
                </div>
                <div>
                  <Switch
                    checked={darkMode}
                    onChange={onThemeToggle}
                    className={`relative inline-flex flex-shrink-0 h-[24px] w-[44px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 ${
                      darkMode ? "bg-green-500" : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  >
                    <span className="sr-only">
                      {t("components.navbar.menu.toggle-dark-mode")}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
                        darkMode ? "translate-x-[20px]" : "translate-x-0"
                      }`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
