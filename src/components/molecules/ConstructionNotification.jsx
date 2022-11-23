import { useTranslation } from "react-i18next";
import ExternalLink from "../atoms/ExternalLink";

export default function ConstructionNotification() {
  const { t } = useTranslation();

  return (
    <div className="bg-sky-500 text-white dark:text-gray-800">
      <div className="mx-auto max-w-[100rem] py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("components.construction-notification.title")}
          </h2>
          <p className="lg:w-1/2">
            {t("components.construction-notification.description")}
          </p>
        </div>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="ml-3 inline-flex rounded-md shadow">
            <ExternalLink
              href="https://github.com/0x1c1b"
              target="_blank"
              rel="noreferrer"
              type="button"
              className="px-5 py-3 !bg-orange-500 !focus:outline-orange-500"
            >
              {t("components.construction-notification.learn-more")}
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
