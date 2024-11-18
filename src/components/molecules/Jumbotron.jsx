import { useTranslation, Trans } from "react-i18next";
import Link from "../atoms/Link";

import JumbotronImage from "../../assets/images/jumbotron.svg";

export default function Jumbotron() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="max-w-[100rem] z-10 mx-auto relative overflow-hidden flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-10 lg:py-24">
        <div className="order-2 lg:order-1 text-center lg:text-left lg:w-2/3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <Trans
              t={t}
              i18nKey="components.jumbotron.title"
              components={{
                highlight: <span className="text-sky-500" />,
              }}
            />
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            {t("components.jumbotron.description")}
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                to="/get-started"
                type="button"
                className="w-full px-8 py-3"
              >
                {t("components.jumbotron.get-started")}
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                to="/register"
                type="button"
                className="w-full px-8 py-3 !bg-orange-500 !focus:outline-orange-500"
              >
                {t("components.jumbotron.register-now")}
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:w-1/3">
          <img
            className="w-full h-auto max-h-[20rem] object-scale-down p-6"
            src={JumbotronImage}
            alt="Jumbotron"
          />
        </div>
      </div>
    </div>
  );
}
