"use client";

import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { useApi } from "@/hooks/useApi";
import { ApiError } from "@/lib/types/error";
import { UsageInfo } from "@/lib/types/usage";
import { Me } from "@/lib/types/users";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

function UsageStats() {
  const api = useApi();
  const t = useTranslations("PlanSettingsPage.usage");

  const { data, isLoading, error } = useSWR<UsageInfo>(
    "/user/me/usage",
    (url) => api.get(url).then((res) => res.data),
    {
      refreshInterval: 300000, // 5 minutes
    },
  );

  return (
    <div className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
      <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
        {t("title")}
      </h4>
      <p>{t("description")}</p>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from(Array(5).keys()).map((key) => (
            <div key={key} className="w-full">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col gap-4">
          {Array.from(Array(5).keys()).map((key) => (
            <div key={key} className="w-full">
              <div className="h-4 w-48 rounded bg-red-300 dark:bg-red-800" />
              <div className="mt-2 h-4 w-2/3 rounded bg-red-300 dark:bg-red-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <h6 className="font-semibold">{t("permanentShortcuts")}</h6>
            <ProgressBar
              className="w-full max-w-sm"
              label={`${data?.currentUsage.currentPermanentShortcuts ?? 0} / ${data?.usageLimits.maxPermanentShortcuts ?? 0}`}
              value={data?.currentUsage.currentPermanentShortcuts ?? 0}
              maxValue={data?.usageLimits.maxPermanentShortcuts ?? 0}
            />
          </div>
          <div className="w-full">
            <h6 className="font-semibold">{t("expirableShortcuts")}</h6>
            <ProgressBar
              className="w-full max-w-sm"
              label={`${data?.currentUsage.currentExpirableShortcuts ?? 0} / ${data?.usageLimits.maxExpirableShortcuts ?? 0}`}
              value={data?.currentUsage.currentExpirableShortcuts ?? 0}
              maxValue={data?.usageLimits.maxExpirableShortcuts ?? 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanSettings() {
  const api = useApi();
  const router = useRouter();
  const t = useTranslations("PlanSettingsPage");

  const { data, isLoading, error } = useSWR<Me, AxiosError<ApiError>, string>(
    "/user/me",
    (url) => api.get(url).then((res) => res.data),
    {
      refreshInterval: 300000, // 5 minutes
    },
  );

  const onManagePlan = useCallback(async () => {
    if (!data) return;

    const res = await api.post<{ url: string }>("/payment/portal");
    router.push(res.data.url);
  }, [data, api, router]);

  const onUpgradePlan = useCallback(() => {
    router.push("/pricing");
  }, [router]);

  const hasActiveSubscription = useMemo(() => {
    return data?.billing.status && data?.billing.status !== "CANCELED";
  }, [data]);

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
          <div className="flex flex-col gap-6 rounded-md border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <div className="h-6 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="h-6 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="mt-1 h-4 w-5/6 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            </div>
            <Button isDisabled className="w-fit">
              {t("managePlan")}
            </Button>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-6 rounded-md border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <div className="h-6 w-16 rounded-md bg-red-300 dark:bg-red-800" />
            <div>
              <div className="h-6 w-32 rounded-md bg-red-300 dark:bg-red-800" />
              <div className="mt-2 h-4 w-full rounded-md bg-red-300 dark:bg-red-800" />
              <div className="mt-1 h-4 w-5/6 rounded-md bg-red-300 dark:bg-red-800" />
            </div>
            <Button isDisabled className="w-fit">
              {t("managePlan")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 rounded-md border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <div className="w-fit rounded-md bg-orange-500/20 px-2 py-0.5 font-mono text-xs font-medium font-semibold text-orange-500">
              {data!.plan}
            </div>
            <div>
              <h4 className="text-lg font-bold">
                {data!.plan === "PRO"
                  ? t(`proPlan.title`)
                  : t(`freePlan.title`)}
              </h4>
              <p>
                {data!.plan === "PRO"
                  ? t(`proPlan.description`)
                  : t(`freePlan.description`)}
              </p>
            </div>
            <Button
              onPress={hasActiveSubscription ? onManagePlan : onUpgradePlan}
              className="w-fit"
            >
              {hasActiveSubscription ? t("managePlan") : t("upgradePlan")}
            </Button>
            {!hasActiveSubscription && (
              <>
                <hr className="border border-slate-200 dark:border-slate-700" />
                <Link href="/pricing" className="w-fit">
                  {t("discoverPlans")}
                </Link>
              </>
            )}
          </div>
        )}
        <UsageStats />
      </div>
    </div>
  );
}
