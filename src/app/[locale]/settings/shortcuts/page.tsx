"use client";

import { MyShortcutsList } from "@/components/organisms/settings/MyShortcutsList";
import { useTranslations } from "next-intl";

export default function ShortcutSettings() {
  const t = useTranslations("ShortcutSettingsPage");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {t("myShortcuts")}
          </h2>
          <hr className="border border-slate-200 dark:border-slate-700" />
        </div>
        <MyShortcutsList />
      </div>
    </div>
  );
}
