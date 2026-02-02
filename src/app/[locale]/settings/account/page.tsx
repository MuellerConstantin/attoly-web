"use client";

import { ChangePasswordForm } from "@/components/organisms/settings/ChangePasswordForm";
import { DeleteAccountForm } from "@/components/organisms/settings/DeleteAccountForm";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/types/error";
import { Me } from "@/lib/types/users";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useSWR from "swr";

export default function AccountSettings() {
  const api = useApi();
  const t = useTranslations("AccountSettingsPage");

  const { data } = useSWR<Me, AxiosError<ApiError>, string>(
    "/user/me",
    (url) => api.get(url).then((res) => res.data),
    {
      refreshInterval: 300000, // 5 minutes
    },
  );

  const isLocalUser = useMemo(() => {
    return data?.identityProvider === "LOCAL";
  }, [data]);

  return (
    <div className="flex flex-col gap-8">
      {isLocalUser && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              {t("changePassword")}
            </h2>
            <hr className="border border-slate-200 dark:border-slate-700" />
          </div>
          <ChangePasswordForm />
        </div>
      )}
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
