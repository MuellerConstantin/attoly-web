import { getTranslations } from "next-intl/server";
import {
  Link as LinkIcon,
  Share2 as ShareIcon,
  QrCode as QrCodeIcon,
} from "lucide-react";
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/atoms/Disclosure";
import Image from "next/image";

async function Hero() {
  const t = await getTranslations("HomePage.hero");

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex w-full grow flex-col items-center justify-center gap-8">
        <div className="relative flex w-fit items-center justify-center">
          <Image
            src="/images/logo-text-light.svg"
            width={42}
            height={32}
            className="h-16 w-auto lg:block dark:hidden"
            alt="Attoly"
          />
          <Image
            src="/images/logo-text-dark.svg"
            width={42}
            height={32}
            className="hidden h-16 w-auto dark:block"
            alt="Attoly"
          />
        </div>
        <div className="flex flex-col items-center gap-4 text-lg">
          <h1 className="text-center text-4xl font-bold text-white md:text-4xl lg:text-6xl dark:text-slate-900">
            {t("title")}
          </h1>
          <h4 className="text-center text-slate-200 dark:text-slate-600">
            {t("subtitle")}
          </h4>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="relative mx-auto w-full max-w-[40rem]">
            <input
              placeholder={t("placeholder")}
              className="w-full rounded-full border border-slate-300 bg-white/95 px-6 py-4 pr-32 text-slate-900 placeholder-slate-400 shadow-lg ring-0 transition outline-none focus:ring-4 focus:ring-white/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-white/20"
            />
            <button className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none">
              {t("cta")}
            </button>
          </div>
          <div className="text-sm text-slate-200 dark:text-slate-600">
            {t("note")}
          </div>
        </div>
      </div>
    </div>
  );
}

async function HowItWorksSection() {
  const t = await getTranslations("HomePage.howItWorks");

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 shadow-xl dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900/70">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <LinkIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              {t("step1.title")}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("step1.description")}
            </p>
            <span className="absolute top-4 right-4 text-5xl font-bold text-slate-100 dark:text-slate-800">
              1
            </span>
          </div>

          {/* Step 2 */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900/70">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
              <QrCodeIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              {t("step2.title")}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("step2.description")}
            </p>
            <span className="absolute top-4 right-4 text-5xl font-bold text-slate-100 dark:text-slate-800">
              2
            </span>
          </div>

          {/* Step 3 */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900/70">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
              <ShareIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              {t("step3.title")}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("step3.description")}
            </p>
            <span className="absolute top-4 right-4 text-5xl font-bold text-slate-100 dark:text-slate-800">
              3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

async function FAQSection() {
  const t = await getTranslations("HomePage.faq");

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          {t("subtitle")}
        </p>
      </div>
      <DisclosureGroup className="bg-white/80 backdrop-blur dark:bg-slate-900/70">
        <Disclosure>
          <DisclosureHeader>{t("q1.question")}</DisclosureHeader>
          <DisclosurePanel>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("q1.answer")}
            </p>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>{t("q2.question")}</DisclosureHeader>
          <DisclosurePanel>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("q2.answer")}
            </p>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>{t("q3.question")}</DisclosureHeader>
          <DisclosurePanel>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("q3.answer")}
            </p>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </section>
  );
}

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <Hero />
      <div className="mx-auto my-8 flex max-w-[80rem] flex-col items-center gap-12 p-4">
        <HowItWorksSection />
      </div>
      <div className="mx-auto my-8 flex max-w-[80rem] flex-col items-center gap-12 p-4">
        <FAQSection />
      </div>
    </div>
  );
}
