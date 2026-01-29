"use client";

import { useApi } from "@/hooks/useApi";
import { Shortcut } from "@/lib/types/shortcuts";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { TextField } from "@/components/atoms/TextField";
import { Spinner } from "../atoms/Spinner";

interface GettingStartedGenerateShortcutProps {
  url: string;
}

export function GettingStartedGenerateShortcut({
  url,
}: GettingStartedGenerateShortcutProps) {
  const api = useApi();
  const t = useTranslations("GettingStartedGenerateShortcut");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);

  const onCreate = useCallback(async (url: string) => {
    setIsLoading(true);
    setShortcut(null);
    setError(null);

    try {
      const res = await api.post<Shortcut>("/shortcuts", { url });
      setShortcut(res.data);
    } catch (err) {
      setError(t("error.unknownError"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (url) {
      onCreate(url);
    }
  }, [onCreate, url]);

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
        {isLoading ? (
          <div className="flex w-full flex-col gap-8">
            <div>
              <TextField
                label={t("originalUrlLabel")}
                isReadOnly
                isDisabled
                value={url}
              />
            </div>
            <div className="flex justify-center">
              <Spinner size={32} />
            </div>
          </div>
        ) : error ? (
          <div className="flex w-full flex-col gap-8">
            <div>
              <TextField
                label={t("originalUrlLabel")}
                isReadOnly
                isDisabled
                value={url}
              />
            </div>
            <div className="text-center text-red-600">{error}</div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            <div>
              <TextField label={t("originalUrlLabel")} isReadOnly value={url} />
            </div>
            <div>
              <TextField
                label={t("shortUrlLabel")}
                isReadOnly
                value={`${window.location.origin}/r/${shortcut!.tag}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
