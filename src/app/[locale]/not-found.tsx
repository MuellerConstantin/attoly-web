import { StackTemplate } from "@/components/templates/StackTemplate";
import { SearchX as SearchXIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "@/components/atoms/Link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });

  return {
    title: t("meta.title"),
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <StackTemplate>
      <div className="relative isolate flex grow items-center justify-center overflow-hidden px-4 py-12">
        <section>
          <div className="mx-auto max-w-screen px-4 py-8 lg:px-6 lg:py-16">
            <div className="flex max-w-screen flex-col items-center gap-4">
              <h1 className="flex items-center gap-4 text-center text-7xl font-extrabold tracking-tight text-sky-500 lg:text-9xl dark:text-sky-500">
                <SearchXIcon className="h-16 w-16" />
              </h1>
              <p className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                {t("headline")}
              </p>
              <p className="text-center text-lg font-light text-gray-500 dark:text-gray-400">
                {t("description")}
              </p>
              <Link
                variant="primary"
                className="pressed:bg-orange-700 cursor-pointer rounded-lg border border-black/10 bg-orange-500 px-5 py-2 text-center text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition hover:bg-orange-600 dark:border-white/10 dark:text-white dark:shadow-none"
                href="/"
              >
                {t("backToHomepage")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </StackTemplate>
  );
}
