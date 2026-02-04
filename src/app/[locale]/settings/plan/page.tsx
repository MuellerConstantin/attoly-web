"use client";

import { Link } from "@/components/atoms/Link";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/types/error";
import { Me } from "@/lib/types/users";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import useSWR from "swr";

export default function PlanSettings() {
  const api = useApi();
  const t = useTranslations("PlanSettingsPage");

  const { data, isLoading, error } = useSWR<Me, AxiosError<ApiError>, string>(
    "/user/me",
    (url) => api.get(url).then((res) => res.data),
    {
      refreshInterval: 300000, // 5 minutes
    },
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {t("myPlan")}
          </h2>
          <hr className="border border-slate-200 dark:border-slate-700" />
        </div>
        <p className="text-slate-800 dark:text-white">
          {t("myPlanDescription")}
        </p>
        {isLoading ? (
          <div />
        ) : error ? (
          <div />
        ) : (
          <div className="flex flex-col gap-6 rounded-md border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <div className="w-fit rounded-md bg-orange-500/10 px-2 py-0.5 font-mono text-xs font-medium font-semibold text-orange-500">
              {data!.plan}
            </div>
            <div>
              <h4 className="text-lg font-bold">{t(`freePlan.title`)}</h4>
              <p>{t(`freePlan.description`)}</p>
            </div>
            <Link className="pressed:bg-orange-700 w-fit cursor-pointer rounded-lg border border-black/10 bg-orange-500 px-5 py-2 text-center text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition hover:bg-orange-600 hover:no-underline dark:border-white/10 dark:text-white dark:shadow-none">
              {t("managePlan")}
            </Link>
            <hr className="border border-slate-200 dark:border-slate-700" />
            <Link href="/pricing" className="w-fit">
              {t("discoverPlans")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
