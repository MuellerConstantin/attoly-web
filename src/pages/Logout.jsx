import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import StackTemplate from "../components/templates/StackTemplate";
import Link from "../components/atoms/Link";
import authSlice from "../store/slices/auth";

import LogoutImage from "../assets/images/logout.svg";

export default function Logout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Attoly | ${t("pages.logout.title")}`;
  }, [t]);

  useEffect(() => {
    dispatch(authSlice.actions.clearAuthentication());
  }, [dispatch]);

  return (
    <StackTemplate>
      <div className="h-full bg-gray-50 dark:bg-gray-600 flex items-center justify-center px-4 py-32">
        <div className="w-full md:max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 2xl:max-w-[100rem]">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center text-gray-800 dark:text-white">
            <div className="w-1/2 sm:w-1/3 md:w-2/3 xl:w-1/3">
              <img className="w-full h-full" src={LogoutImage} alt="Logout" />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-4xl">
                {t("pages.logout.headline")}
              </div>
              <div>
                <Trans
                  t={t}
                  i18nKey="pages.logout.description"
                  components={{
                    hyperlink: <Link to="/login" />,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StackTemplate>
  );
}
