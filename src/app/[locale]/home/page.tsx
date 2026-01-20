import { getTranslations } from "next-intl/server";

async function Hero() {
  const t = await getTranslations("HomePage.hero");

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex w-full grow flex-col items-center justify-center gap-8">
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

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="h-[25rem] w-full"></div>
    </div>
  );
}
