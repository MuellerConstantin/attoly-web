import { Trans, useTranslation } from "react-i18next";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import ExternalLink from "../atoms/ExternalLink";
import Link from "../atoms/Link";

import LogoTextLight from "../../assets/images/logo-text-light.svg";
import LogoTextDark from "../../assets/images/logo-text-dark.svg";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-[100rem] mx-auto text-center md:text-left">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
          <div className="flex flex-col items-center md:items-start">
            <img
              className="block dark:hidden h-8 w-auto"
              src={LogoTextDark}
              alt="Attoly Logo"
            />
            <img
              className="hidden dark:block h-8 w-auto"
              src={LogoTextLight}
              alt="Attoly Logo"
            />
            <p className="mt-2 text-justify">
              {t("components.footer.description")}
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <div>
              <h2 className="uppercase text-orange-500 font-semibold mb-4 flex justify-center md:justify-start">
                {t("components.footer.product")}
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="!text-gray-800 dark:!text-white">
                    {t("components.footer.about-us")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/get-started"
                    className="!text-gray-800 dark:!text-white"
                  >
                    {t("components.footer.get-started")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <div>
              <h6 className="uppercase text-orange-500 font-semibold mb-4 flex justify-center md:justify-start">
                {t("components.footer.legal")}
              </h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/imprint"
                    className="!text-gray-800 dark:!text-white"
                  >
                    {t("components.footer.imprint")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-use"
                    className="!text-gray-800 dark:!text-white"
                  >
                    {t("components.footer.terms-of-use")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="!text-gray-800 dark:!text-white"
                  >
                    {t("components.footer.privacy-policy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <div>
              <h6 className="uppercase text-orange-500 font-semibold mb-4 flex justify-center md:justify-start">
                {t("components.footer.contribution")}
              </h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/donate"
                    className="!text-gray-800 dark:!text-white"
                  >
                    {t("components.footer.donate")}
                  </Link>
                </li>
                <li>
                  <ExternalLink
                    href={`${
                      new URL(process.env.REACT_APP_ATTOLY_API_URI).origin
                    }/site/docs/v1/index.html`}
                    target="_blank"
                    rel="noreferrer"
                    className="!text-gray-800 dark:!text-white"
                  >
                    <div className="inline-flex items-center hover:underline">
                      {t("components.footer.api")}
                      <ArrowTopRightOnSquareIcon className="inline-block w-4 h-4 ml-1" />
                    </div>
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-4 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Trans
          t={t}
          i18nKey="components.footer.creation-notice"
          components={{
            hyperlink: (
              <ExternalLink
                href="https://github.com/0x1c1b"
                target="_blank"
                rel="noreferrer"
                className="font-semibold"
              />
            ),
          }}
        />
      </div>
    </div>
  );
}
