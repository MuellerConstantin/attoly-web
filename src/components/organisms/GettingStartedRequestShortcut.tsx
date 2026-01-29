import Image from "next/image";
import { HeroGettingStartedForm } from "../molecules/HeroGettingStartedForm";
import { getTranslations } from "next-intl/server";

export async function GettingStartedRequestShortcut() {
  const t = await getTranslations("GettingStartedRequestShortcut");

  return (
    <div className="relative z-10 flex w-full max-w-2xl flex-col items-center items-stretch gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 px-4 py-8 text-slate-800 shadow-xl backdrop-blur-md md:p-8 md:px-8 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex w-fit items-center justify-center">
          <Image
            src="/images/logo-text-dark.svg"
            width={120}
            height={80}
            className="h-12 w-auto dark:hidden"
            alt="Attoly"
          />
          <Image
            src="/images/logo-text-light.svg"
            width={120}
            height={80}
            className="hidden h-12 w-auto dark:block"
            alt="Attoly"
          />
        </div>
        <h1 className="text-center text-xl font-bold tracking-tight text-slate-800 dark:text-white">
          {t("title")}
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          <HeroGettingStartedForm />
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {t("note")}
        </div>
      </div>
    </div>
  );
}
