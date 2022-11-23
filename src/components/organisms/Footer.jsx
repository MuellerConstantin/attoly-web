import { useTranslation } from "react-i18next";
import ExternalLink from "../atoms/ExternalLink";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="text-center bg-orange-500 text-gray-800 dark:text-white">
      <div className="text-center p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
        {t("components.footer.creation-notice.odd")}&nbsp;
        <ExternalLink
          href="https://github.com/0x1c1b"
          target="_blank"
          rel="noreferrer"
          className="font-semibold"
        >
          {t("components.footer.creation-notice.even")}
        </ExternalLink>
      </div>
    </div>
  );
}
