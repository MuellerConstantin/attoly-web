"use client";

import { StackTemplate } from "@/components/templates/StackTemplate";
import { Bug as BugIcon } from "lucide-react";
import { Link } from "@/components/atoms/Link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  return (
    <StackTemplate>
      <div className="relative isolate flex grow items-center justify-center overflow-hidden px-4 py-12">
        <section>
          <div className="mx-auto max-w-screen px-4 py-8 lg:px-6 lg:py-16">
            <div className="flex max-w-screen flex-col items-center gap-4">
              <h1 className="flex items-center gap-4 text-center text-7xl font-extrabold tracking-tight text-sky-500 lg:text-9xl dark:text-sky-500">
                <BugIcon className="h-16 w-16" />
              </h1>
              <p className="m-0 text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                {t("headline")}
              </p>
              <p className="m-0 text-center text-lg font-light text-gray-500 dark:text-gray-400">
                {t("description")}
              </p>
              {process.env.NODE_ENV !== "production" && (
                <div className="mx-4 w-fit max-w-full md:max-w-lg">
                  <pre className="mx-auto w-full overflow-auto rounded border-red-200 bg-red-50 p-3 text-left text-xs text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
                    {error.message}
                  </pre>
                </div>
              )}
              <Button variant="primary" onClick={reset}>
                {t("retry")}
              </Button>
              <Link variant="primary" href="/" className="block">
                {t("backToHomepage")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </StackTemplate>
  );
}
