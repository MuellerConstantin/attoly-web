import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Pricing() {
  const t = await getTranslations("PricingPage");

  const plans = [
    {
      href: "/getting-started",
      name: t("plans.anonymous.name"),
      price: t("plans.anonymous.price"),
      cta: t("plans.anonymous.cta"),
      headline: t("plans.anonymous.headline"),
      features: [
        t("plans.anonymous.features.0"),
        t("plans.anonymous.features.1"),
        t("plans.anonymous.features.2"),
        t("plans.anonymous.features.3"),
      ],
      recommended: false,
    },
    {
      href: "/signup",
      name: t("plans.free.name"),
      price: t("plans.free.price"),
      cta: t("plans.free.cta"),
      headline: t("plans.free.headline"),
      plus: t("plans.free.plus"),
      features: [
        t("plans.free.features.0"),
        t("plans.free.features.1"),
        t("plans.free.features.2"),
      ],
      recommended: true,
    },
  ];

  return (
    <div className="mx-auto my-8 flex w-full max-w-[80rem] flex-col items-center gap-12 p-4">
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
                  {t("plans.recommended")}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-8 p-4 text-slate-800 dark:text-white">
              <div className="flex items-end gap-2">
                <div className="text-5xl font-bold">{plan.price}</div>
                <div className="text-slate-600 dark:text-slate-400">
                  /{t("plans.month")}
                </div>
              </div>
              <div>
                <Link
                  className={`block w-full cursor-pointer rounded-lg border border-black/10 px-5 py-2 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition hover:no-underline dark:border-white/10 dark:shadow-none ${plan.recommended ? "pressed:bg-orange-700 bg-orange-500 text-white hover:bg-orange-600 dark:text-white" : "pressed:bg-gray-300 dark:pressed:bg-slate-400 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500"}`}
                  href={plan.href}
                >
                  {plan.cta}
                </Link>
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
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
