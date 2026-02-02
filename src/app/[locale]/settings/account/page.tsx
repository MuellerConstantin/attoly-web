import { ChangePasswordForm } from "@/components/organisms/settings/ChangePasswordForm";
import { DeleteAccountForm } from "@/components/organisms/settings/DeleteAccountForm";
import { getTranslations } from "next-intl/server";

export default async function AccountSettings() {
  const t = await getTranslations("AccountSettingsPage");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {t("changePassword")}
          </h2>
          <hr className="border border-slate-200 dark:border-slate-700" />
        </div>
        <ChangePasswordForm />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-red-500">
            {t("deleteAccount")}
          </h2>
          <hr className="border border-slate-200 dark:border-slate-700" />
        </div>
        <DeleteAccountForm />
      </div>
    </div>
  );
}
