"use client";

import { useApi } from "@/hooks/useApi";
import { Shortcut } from "@/lib/types/shortcuts";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroGettingStartedForm } from "../molecules/HeroGettingStartedForm";
import { useSession } from "next-auth/react";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/atoms/TextField";
import { Button } from "@/components/atoms/Button";
import { Check, Copy, Share } from "lucide-react";
import { ReactQRCode, ReactQRCodeRef } from "@lglab/react-qr-code";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { AnonymousCreatorBadge } from "@/components/molecules/AnonymousCreatorBadge";

interface ShareButtonProps {
  text: string;
}

function ShareButton({ text }: ShareButtonProps) {
  if (!navigator.share) {
    return null;
  }

  const onShare = useCallback(async () => {
    await navigator.share({
      url: window.location.href,
    });
  }, [text]);

  return (
    <button
      onClick={onShare}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-500 p-2 text-white hover:bg-slate-600 dark:bg-slate-400 dark:hover:bg-slate-300"
    >
      <Share className="h-full w-full" />
    </button>
  );
}

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

interface SuccessSectionProps {
  shortcut: Shortcut;
}

function SuccessSection({ shortcut }: SuccessSectionProps) {
  const t = useTranslations("GettingStartedGenerateShortcut");

  const qrCodeRef = useRef<ReactQRCodeRef>(null);

  const onDownload = useCallback(
    (format: "png" | "svg") => {
      qrCodeRef.current?.download({
        name: `attoly-shortcut-${shortcut.tag}`,
        format,
        size: 1000,
      });
    },
    [shortcut],
  );

  return (
    <div className="z-10 flex w-full max-w-2xl flex-col gap-4">
      <h2 className="text-center text-2xl font-bold text-white">
        {t("success.headline")}
      </h2>
      <div className="flex w-full flex-col items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 px-4 py-8 text-slate-800 shadow-xl backdrop-blur-md md:p-8 md:px-8 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white">
        <div className="flex w-full items-center gap-2">
          <TextField
            className="grow"
            isReadOnly
            value={`${window.location.origin}/r/${shortcut!.tag}`}
          />
          <div className="w-fit shrink-0">
            <CopyButton text={`${window.location.origin}/r/${shortcut!.tag}`} />
          </div>
        </div>
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-bold">{t("success.share")}</h3>
          <div className="flex items-center gap-2">
            <EmailShareButton
              url={`${window.location.origin}/redirect/${shortcut.tag}`}
              subject="Check out this URL"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton
              url={`${window.location.origin}/redirect/${shortcut.tag}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`${window.location.origin}/redirect/${shortcut.tag}`}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url={`${window.location.origin}/redirect/${shortcut.tag}`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton
              url={`${window.location.origin}/redirect/${shortcut.tag}`}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <ShareButton
              text={`${window.location.origin}/redirect/${shortcut.tag}`}
            />
          </div>
        </div>
        <div className="w-full space-y-4 text-center">
          <h3 className="text-center text-lg font-bold">
            {t("success.qrCode")}
          </h3>
          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:justify-center">
            <div className="flex aspect-square h-[192px] shrink-0 justify-center overflow-hidden rounded-3xl border border-slate-400">
              <ReactQRCode
                ref={qrCodeRef}
                value={`${window.location.origin}/redirect/${shortcut.tag}`}
                size={192}
                background="#ffffff"
                imageSettings={{
                  src: "/images/logo.svg",
                  width: 32,
                  height: 32,
                  excavate: true,
                }}
              />
            </div>
            <div className="flex max-w-[15rem] grow flex-col gap-4">
              <Button className="w-full" onClick={() => onDownload("png")}>
                Download PNG
              </Button>
              <Button className="w-full" onClick={() => onDownload("svg")}>
                Download SVG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GettingStartedGenerateShortcutProps {
  url?: string;
}

export function GettingStartedGenerateShortcut({
  url,
}: GettingStartedGenerateShortcutProps) {
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
          <div className="max-w-full text-center text-xs md:max-w-2/3">
            {t.rich("termsNotice", {
              "terms-hyperlink": (chunks) => (
                <Link href="/terms-of-service">{chunks}</Link>
              ),
              "privacy-hyperlink": (chunks) => (
                <Link href="/privacy-policy">{chunks}</Link>
              ),
            })}
          </div>
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
      {!!shortcut && <SuccessSection shortcut={shortcut} />}
    </>
  );
}
