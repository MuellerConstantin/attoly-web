"use client";

import { Button } from "@/components/atoms/Button";
import { InfoTooltip } from "@/components/molecules/InfoTooltip";
import { useApi } from "@/hooks/useApi";
import { Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

function FeatureSection() {
  const t = useTranslations("PricingPage.features");

  const generalFeatures: {
    key: string;
    label: string;
    tooltip?: string;
    values: (string | boolean)[];
    render?: (value: string | boolean) => React.ReactNode;
  }[] = useMemo(
    () => [
      {
        key: "price",
        label: t("table.generalFeatures.price"),
        values: [
          t("plans.anonymous.price"),
          t("plans.free.price"),
          t("plans.pro.price"),
        ],
        render: (value) => (
          <div className="flex grow items-end justify-center gap-2">
            <div className="text-lg font-bold">{value}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              /{t("table.month")}
            </div>
          </div>
        ),
      },
      {
        key: "temporaryLinks",
        label: t("table.generalFeatures.temporaryLinks"),
        values: [
          t("plans.anonymous.temporaryLinks"),
          t("plans.free.temporaryLinks"),
          t("plans.pro.temporaryLinks"),
        ],
        render: (value) => <span>{value}</span>,
      },
      {
        key: "permanentLinks",
        label: t("table.generalFeatures.permanentLinks"),
        values: [
          false,
          t("plans.free.permanentLinks"),
          t("plans.pro.permanentLinks"),
        ],
        render: (value) => (
          <span>
            {typeof value === "boolean" ? (
              value ? (
                <Check className="mx-auto h-5 w-5 text-green-500" />
              ) : (
                <X className="mx-auto h-5 w-5 text-red-500" />
              )
            ) : (
              value
            )}
          </span>
        ),
      },
      {
        key: "qrCodes",
        label: t("table.generalFeatures.qrCodes"),
        values: [true, true, true],
      },
      {
        key: "adFreeRedirects",
        label: t("table.generalFeatures.adFreeRedirects"),
        values: [true, true, true],
      },
      {
        key: "linkManagement",
        label: t("table.generalFeatures.linkManagement"),
        tooltip: t("table.generalFeatures.linkManagementTooltip"),
        values: [false, true, true],
      },
      {
        key: "expiryLinks",
        label: t("table.generalFeatures.expiryLinks"),
        values: [false, false, true],
      },
      {
        key: "oneTimeLinks",
        label: t("table.generalFeatures.oneTimeLinks"),
        values: [false, false, true],
      },
      {
        key: "passwordProtection",
        label: t("table.generalFeatures.passwordProtection"),
        tooltip: t("table.generalFeatures.passwordProtectionTooltip"),
        values: [false, false, true],
      },
    ],
    [t],
  );

  const statisticFeatures: {
    key: string;
    label: string;
    values: (string | boolean)[];
    tooltip?: string;
    render?: (value: string | boolean) => React.ReactNode;
  }[] = useMemo(
    () => [
      {
        key: "clickAnalytics",
        label: t("table.statisticsFeatures.clickAnalytics"),
        tooltip: t("table.statisticsFeatures.clickAnalyticsTooltip"),
        values: [false, true, true],
      },
      {
        key: "activityOverTime",
        label: t("table.statisticsFeatures.activityOverTime"),
        tooltip: t("table.statisticsFeatures.activityOverTimeTooltip"),
        values: [false, false, true],
      },
    ],
    [t],
  );

  return (
    <section className="mx-auto my-8 flex w-full max-w-[80rem] flex-col items-center gap-12 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          {t("subtitle")}
        </p>
      </div>
      <div className="max-w-full p-4">
        <div className="overflow-x-auto text-slate-800 dark:text-white">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 rounded-t-3xl border border-slate-300 dark:border-slate-400 dark:bg-slate-900">
            <thead>
              <tr>
                <th className="max-w-[150px] rounded-tl-3xl border border-slate-300 p-4 text-left dark:border-slate-400">
                  <h3 className="text-lg font-semibold whitespace-nowrap text-slate-900 dark:text-white">
                    {t("table.headline")}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed font-normal text-slate-600 dark:text-slate-400">
                    {t("table.description")}
                  </p>
                </th>
                <th className="max-w-[150px] space-y-4 border border-slate-300 p-4 text-center whitespace-nowrap dark:border-slate-400">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t("plans.anonymous.name")}
                  </h3>
                </th>
                <th className="max-w-[150px] space-y-4 border border-slate-300 p-4 text-center whitespace-nowrap dark:border-slate-400">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t("plans.free.name")}
                  </h3>
                </th>
                <th className="max-w-[150px] space-y-4 rounded-tr-3xl border border-slate-300 p-4 text-center whitespace-nowrap dark:border-slate-400">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t("plans.pro.name")}
                  </h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {generalFeatures.map((feature) => (
                <tr key={feature.key}>
                  <td className="border border-slate-300 px-4 py-3 font-medium dark:border-slate-400">
                    <div className="flex items-center gap-1 font-medium">
                      {feature.label}
                      {feature.tooltip && (
                        <InfoTooltip tooltip={feature.tooltip} />
                      )}
                    </div>
                  </td>
                  {feature.values.map((value, index) => (
                    <td
                      key={index}
                      className="border border-slate-300 px-4 py-3 text-center dark:border-slate-400"
                    >
                      {feature.render ? (
                        feature.render(value)
                      ) : value === true ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td
                  colSpan={4}
                  className="border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold tracking-wide text-slate-700 uppercase dark:border-slate-400 dark:bg-slate-800 dark:text-slate-300"
                >
                  {t("table.statistics")}
                </td>
              </tr>
              {statisticFeatures.map((feature) => (
                <tr key={feature.key}>
                  <td className="border border-slate-300 px-4 py-3 font-medium dark:border-slate-400">
                    <div className="flex items-center gap-1 font-medium">
                      {feature.label}
                      {feature.tooltip && (
                        <InfoTooltip tooltip={feature.tooltip} />
                      )}
                    </div>
                  </td>
                  {feature.values.map((value, index) => (
                    <td
                      key={index}
                      className="border border-slate-300 px-4 py-3 text-center dark:border-slate-400"
                    >
                      {feature.render ? (
                        feature.render(value)
                      ) : value === true ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  const api = useApi();
  const router = useRouter();
  const t = useTranslations("PricingPage.plans");
  const { status } = useSession();

  const plans = useMemo(
    () => [
      {
        id: "anonymous",
        name: t("anonymous.name"),
        price: t("anonymous.price"),
        cta: t("anonymous.cta"),
        headline: t("anonymous.headline"),
        features: [
          t("anonymous.features.0"),
          t("anonymous.features.1"),
          t("anonymous.features.2"),
          t("anonymous.features.3"),
        ],
        recommended: false,
      },
      {
        id: "free",
        name: t("free.name"),
        price: t("free.price"),
        cta: t("free.cta"),
        headline: t("free.headline"),
        plus: t("free.plus"),
        features: [
          t("free.features.0"),
          t("free.features.1"),
          t("free.features.2"),
        ],
        recommended: false,
      },
      {
        id: "pro",
        name: t("pro.name"),
        price: t("pro.price"),
        cta: t("pro.cta"),
        headline: t("pro.headline"),
        features: [
          t("pro.features.0"),
          t("pro.features.1"),
          t("pro.features.2"),
          t("pro.features.3"),
        ],
        recommended: true,
      },
    ],
    [status, t],
  );

  const onChoosePlan = useCallback(
    async (plan: "anonymous" | "free" | "pro") => {
      if (plan === "pro") {
        if (status === "authenticated") {
          const res = await api.post<{ url: string }>(
            "/payment/session?priceId=price_1Sxy0Y43QEC8b8prmAVfYRO5",
          );
          router.push(res.data.url);
        } else {
          router.push("/signin");
        }
      } else if (plan === "free") {
        if (status === "authenticated") {
          router.push("/getting-started");
        } else {
          router.push("/signin");
        }
      } else {
        router.push("/getting-started");
      }
    },
    [status, router, api],
  );

  return (
    <section className="mx-auto my-8 flex w-full max-w-[80rem] flex-col items-center gap-12 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          {t("subtitle")}
        </p>
      </div>
      <div className="flex w-full flex-col flex-wrap gap-8 md:flex-row md:justify-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="w-full rounded-3xl border border-slate-200 bg-white md:w-[20rem] dark:border-slate-700 dark:bg-slate-800"
          >
            <div
              className={`flex h-16 items-center justify-between gap-4 rounded-t-3xl p-4 font-bold text-white ${plan.recommended ? "bg-orange-500" : "bg-slate-900"}`}
            >
              <h2 className="text-lg">{plan.name}</h2>
              {plan.recommended && (
                <span className="rounded-lg bg-white p-1 text-sm text-slate-800">
                  {t("recommended")}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8 p-4 text-slate-800 dark:text-white">
              <div className="flex items-end gap-2">
                <div className="text-5xl font-bold">{plan.price}</div>
                <div className="text-slate-600 dark:text-slate-400">
                  /{t("month")}
                </div>
              </div>
              <div>
                <Button
                  variant={plan.recommended ? "primary" : "secondary"}
                  onPress={() =>
                    onChoosePlan(plan.id as "anonymous" | "free" | "pro")
                  }
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-bold">{plan.headline}</h3>
                  {plan.plus && <span className="text-xs">{plan.plus}</span>}
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <div>
      <PlansSection />
      <FeatureSection />
    </div>
  );
}
