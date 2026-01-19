import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/components/atoms/Link";

export function Footer() {
  const t = useTranslations("Footer");

  const [isPrivacySettingsDialogOpen, setIsPrivacySettingsDialogOpen] =
    useState(false);

  const navigation = useMemo(() => {
    return [
      { name: t("termsOfService"), href: "/terms-of-service" },
      { name: t("privacyPolicy"), href: "/privacy-policy" },
      { name: t("imprint"), href: "/imprint" },
    ];
  }, [t]);

  return (
    <div className="border-t border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <div className="p-4 md:flex md:items-center md:justify-between">
        <span className="inline-flex flex-wrap space-x-2 text-sm sm:text-center">
          <span>
            © {new Date().getFullYear()}{" "}
            <Link href="https://github.com/MuellerConstantin">
              Constantin Müller
            </Link>
            .
          </span>
          <span>{t("allRightsReserved")}</span>
        </span>
        <ul className="mt-3 flex flex-wrap items-center space-x-4 text-sm font-medium sm:mt-0">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
