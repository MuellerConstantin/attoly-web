"use client";

import { usePathname } from "next/navigation";
import { ListBox, ListBoxItem } from "@/components/atoms/ListBox";
import { CreditCard, User, Link as LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Link } from "react-aria-components";

export function SettingsNavigation() {
  const t = useTranslations("SettingsPage");
  const pathname = usePathname();

  const normalizedPathname = useMemo(
    () => pathname.replace(/^\/[a-z]{2}(\/|$)/, "/"),
    [pathname],
  );

  return (
    <ListBox
      selectionMode="single"
      selectedKeys={[normalizedPathname]}
      selectionBehavior="replace"
    >
      <ListBoxItem id="/settings/account">
        {({ isSelected }) => (
          <Link
            href="/settings/account"
            className={`flex w-full items-center gap-2 hover:no-underline focus:ring-0 focus:outline-none ${
              isSelected
                ? "bg-orange-500 text-white"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <User className="h-5 w-5" />
            <span>{t("account")}</span>
          </Link>
        )}
      </ListBoxItem>
      <ListBoxItem id="/settings/plan">
        {({ isSelected }) => (
          <Link
            href="/settings/plan"
            className={`flex w-full items-center gap-2 hover:no-underline focus:ring-0 focus:outline-none ${
              isSelected
                ? "bg-orange-500 text-white"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>{t("plan")}</span>
          </Link>
        )}
      </ListBoxItem>
      <ListBoxItem id="/settings/shortcuts">
        {({ isSelected }) => (
          <Link
            href="/settings/shortcuts"
            className={`flex w-full items-center gap-2 hover:no-underline focus:ring-0 focus:outline-none ${
              isSelected
                ? "bg-orange-500 text-white"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <LinkIcon className="h-5 w-5" />
            <span>{t("shortLinks")}</span>
          </Link>
        )}
      </ListBoxItem>
    </ListBox>
  );
}
