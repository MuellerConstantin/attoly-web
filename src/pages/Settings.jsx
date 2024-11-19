import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab } from "@headlessui/react";
import {
  UserIcon,
  LinkIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/atoms/Avatar";
import ChangeCurrentUserPasswordForm from "../components/organisms/settings/ChangeCurrentUserPasswordForm";
import DeleteCurrentUserForm from "../components/organisms/settings/DeleteCurrentUserForm";
import CurrentUserShortcutList from "../components/organisms/settings/CurrentUserShortcutList";
import StackTemplate from "../components/templates/StackTemplate";
import Link from "../components/atoms/Link";

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const principal = useSelector((state) => state.auth.principal);

  useEffect(() => {
    document.title = `Attoly | ${t("pages.settings.title")}`;
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
              <div className="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white p-2 rounded-full">
                <div className="h-10 aspect-square rounded-md">
                  <Avatar value={principal} />
                </div>
              </div>
              <div className="space-y-1 max-w-full overflow-hidden">
                <span className="block truncate">{principal}</span>
                <span className="block text-xs">
                  {t("pages.settings.personal-account")}
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
                    <UserIcon className="h-4" />
                    <div className="ml-2 truncate">
                      {t("pages.settings.user")}
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
                    <LinkIcon className="h-4" />
                    <div className="ml-2 truncate">
                      {t("pages.settings.shortcuts")}
                    </div>
                  </div>
                )}
              </Tab>
              <hr />
              <Link
                to="/logout"
                type="button"
                className="flex items-center justify-center space-x-2 !bg-gray-300 !text-gray-800 dark:!bg-gray-600 dark:!text-white"
              >
                <div>Logout</div>
                <ArrowLeftOnRectangleIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Tab.List>
          </div>
          <Tab.Panels as="div" className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
            <Tab.Panel>
              <div className="space-y-8">
                <ChangeCurrentUserPasswordForm />
                <DeleteCurrentUserForm onChange={() => navigate("/logout")} />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="space-y-8">
                <CurrentUserShortcutList />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </StackTemplate>
  );
}
