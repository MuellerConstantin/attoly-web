import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab } from "@headlessui/react";
import { LinkIcon, UsersIcon } from "@heroicons/react/24/outline";
import StackTemplate from "../components/templates/StackTemplate";
import ShortcutList from "../components/organisms/management/ShortcutList";
import UserList from "../components/organisms/management/UserList";

import Logo from "../assets/images/logo.svg";

export default function Management() {
  const { t } = useTranslation();

  const isAdmin = useSelector(
    (state) =>
      state.auth.roles.filter((role) => role.name === "ROLE_ADMIN").length > 0
  );

  const isModerator = useSelector(
    (state) =>
      state.auth.roles.filter((role) => role.name === "ROLE_MODERATOR").length >
      0
  );

  const role = useMemo(() => {
    if (isAdmin) {
      return "Administrator";
    }
    if (isModerator) {
      return "Moderator";
    }
    return "User";
  }, [isAdmin, isModerator]);

  useEffect(() => {
    document.title = `Attoly | ${t("pages.management.title")}`;
  }, [t]);

  return (
    <StackTemplate>
      <div className="grow max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tab.Group
          as="div"
          className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8"
        >
          <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col space-y-6">
            <div className="w-full flex space-x-4 items-center max-w-full text-gray-800 dark:text-white">
              <img className="block h-10 w-auto" src={Logo} alt="Attoly Logo" />
              <div className="space-y-1 max-w-full overflow-hidden">
                <span className="block truncate">
                  {t("pages.management.headline")}
                </span>
                <span className="block text-xs">
                  {t("pages.management.logged-in-as", { role })}
                </span>
              </div>
            </div>
            <Tab.List className="rounded-xl w-full text-gray-700 dark:text-gray-200 space-y-2">
              <Tab
                className={({ selected }) =>
                  `w-full flex items-center space-x-2 text-sm leading-5 font-medium outline-none pl-1 border-l-4
                    ${selected ? "border-l-sky-500" : "border-transparent"}`
                }
              >
                {({ selected }) => (
                  <div
                    className={`truncate w-full h-full flex items-center rounded-lg p-2 text-gray-800 dark:text-white ${
                      selected
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 hover:dark:bg-gray-700"
                    }`}
                  >
                    <LinkIcon className="h-4" />
                    <div className="ml-2 truncate">
                      {t("pages.management.shortcuts")}
                    </div>
                  </div>
                )}
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full flex items-center space-x-2 text-sm leading-5 font-medium outline-none pl-1 border-l-4
                    ${selected ? "border-l-sky-500" : "border-transparent"}`
                }
              >
                {({ selected }) => (
                  <div
                    className={`truncate w-full h-full flex items-center rounded-lg p-2 text-gray-800 dark:text-white ${
                      selected
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 hover:dark:bg-gray-700"
                    }`}
                  >
                    <UsersIcon className="h-4" />
                    <div className="ml-2 truncate">
                      {t("pages.management.users")}
                    </div>
                  </div>
                )}
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels as="div" className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
            <Tab.Panel>
              <div className="space-y-8">
                <ShortcutList />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="space-y-8">
                <UserList />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </StackTemplate>
  );
}
