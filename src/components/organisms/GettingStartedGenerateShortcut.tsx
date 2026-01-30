"use client";

import { useApi } from "@/hooks/useApi";
import { Shortcut } from "@/lib/types/shortcuts";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HeroGettingStartedForm } from "../molecules/HeroGettingStartedForm";
import { useSession } from "next-auth/react";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/atoms/TextField";
import { Button } from "@/components/atoms/Button";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

function CopyButton(props: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(props.text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [props.text]);

  return (
    <Button variant="primary" onPress={handleClick} className={props.className}>
      <div className="transition-all duration-300 ease-in-out">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </div>
    </Button>
  );
}

interface GettingStartedGenerateShortcutProps {
  url?: string;
}

export function GettingStartedGenerateShortcut({
  url,
}: GettingStartedGenerateShortcutProps) {
  const session = useSession();
  const router = useRouter();
  const api = useApi();
  const t = useTranslations("GettingStartedGenerateShortcut");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);

  const onCreate = useCallback(
    async (url: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await api.post<Shortcut>("/shortcuts", { url });
        setShortcut(res.data);
      } catch (err) {
        setError(t("error.unknownError"));
      } finally {
        setIsLoading(false);
      }
    },
    [api, t, router],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (url) {
        setIsLoading(true);
        onCreate(url);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="z-10 flex w-full max-w-2xl flex-col items-center items-stretch gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 px-4 py-8 text-slate-800 shadow-xl backdrop-blur-md md:p-8 md:px-8 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white">
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
            <HeroGettingStartedForm
              onSubmit={onCreate}
              isDisabled={isLoading || !!shortcut}
              defaultValue={url}
            />
          </div>
          {session.status !== "authenticated" && (
            <div className="max-w-full text-center text-xs md:max-w-2/3">
              {t.rich("anonymousNotice", {
                link: (chunks) => <Link href="/pricing">{chunks}</Link>,
              })}
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center">
              <Spinner size={32} />
            </div>
          )}
          {!isLoading && error && (
            <div className="text-center text-red-600">{error}</div>
          )}
        </div>
      </div>
      {!!shortcut && (
        <div className="z-10 flex w-full max-w-2xl flex-col gap-4">
          <h2 className="text-center text-2xl font-bold text-white">
            {t("success.headline")}
          </h2>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 px-4 py-8 text-slate-800 shadow-xl backdrop-blur-md md:p-8 md:px-8 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white">
            <TextField
              className="grow"
              isReadOnly
              value={`${window.location.origin}/r/${shortcut!.tag}`}
            />
            <div className="w-fit shrink-0">
              <CopyButton
                text={`${window.location.origin}/r/${shortcut!.tag}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
