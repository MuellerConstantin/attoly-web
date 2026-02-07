"use client";

import { useApi } from "@/hooks/useApi";
import { Shortcut } from "@/lib/types/shortcuts";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/atoms/TextField";
import { Button } from "@/components/atoms/Button";
import { Check, ChevronDown, ChevronUp, Copy, Share } from "lucide-react";
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
import { Switch } from "@/components/atoms/Switch";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import { Form } from "@/components/atoms/Form";
import * as yup from "yup";
import { DatePicker } from "../atoms/DatePicker";
import { TimeField } from "../atoms/TimeField";
import { DateValue, TimeValue } from "react-aria-components";

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
  const validationT = useTranslations("ValidationMessages");
  const { status } = useSession();

  const schema = yup
    .object()
    .shape({
      url: yup
        .string()
        .url(validationT("invalidUrl"))
        .required(validationT("required")),
      permanent: yup.boolean(),
      expirable: yup.boolean(),
      expireDate: yup.mixed().when("expirable", {
        is: true,
        then: (schema) => schema.required(validationT("required")),
        otherwise: (schema) => schema.nullable(),
      }),
      expireTime: yup.mixed().when("expirable", {
        is: true,
        then: (schema) => schema.required(validationT("required")),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .test(
      "permanent-xor-expirable",
      validationT("permanentAndExpirableExclusive"),
      (values) => {
        if (!values) return true;
        return !(values.permanent && values.expirable);
      },
    );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);

  const onCreate = useCallback(
    async (
      values: {
        url: string;
        permanent: boolean;
        expirable: boolean;
        expireDate: DateValue | null;
        expireTime: TimeValue | null;
      },
      helpers: FormikHelpers<{
        url: string;
        permanent: boolean;
        expirable: boolean;
        expireDate: null;
        expireTime: null;
      }> | null,
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        let expiresAt = null;

        if (values.expirable && values.expireDate && values.expireTime) {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const date = values.expireDate.toDate(timeZone);
          const time = values.expireTime;

          date.setHours(
            time.hour,
            time.minute,
            time.second ?? 0,
            time.millisecond ?? 0,
          );

          expiresAt = date.toISOString();
        }

        const res = await api.post<Shortcut>("/shortcuts", {
          url: values.url,
          permanent: values.permanent,
          expiresAt: expiresAt,
        });
        setShortcut(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 403 &&
            err.response.data.error === "PermanentShortcutLimitExceededError"
          ) {
            setError(err.response.data.message);
          } else if (
            err.response?.status === 422 &&
            err.response.data.error === "ValidationError"
          ) {
            err.response.data.details?.forEach(
              (detail: { field: string; message: string }) =>
                helpers?.setFieldError(
                  detail.field === "expiresAt" ? "expireDate" : detail.field,
                  detail.message,
                ),
            );
          } else {
            setError(t("error.unknownError"));
          }
        } else {
          setError(t("error.unknownError"));
        }
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
        onCreate(
          {
            url,
            permanent: false,
            expirable: false,
            expireDate: null,
            expireTime: null,
          },
          null,
        );
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
        <div className="flex w-full flex-col items-center gap-4">
          <Formik
            enableReinitialize
            initialValues={{
              url: url || "",
              permanent: false,
              expirable: false,
              expireDate: null,
              expireTime: null,
            }}
            validationSchema={schema}
            onSubmit={onCreate}
          >
            {(props) => (
              <Form
                onSubmit={props.handleSubmit}
                validationBehavior="aria"
                className="flex w-full flex-col items-center gap-4"
              >
                <div className="relative flex w-full flex-col gap-4">
                  <input
                    name="url"
                    placeholder={t("placeholder")}
                    className="w-full rounded-full border border-slate-300 bg-white/95 px-6 py-4 pr-32 text-slate-900 placeholder-slate-400 ring-0 transition outline-none focus:ring-4 focus:ring-white/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-white/20"
                    value={props.values.url}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    disabled={isLoading || !!shortcut}
                  />
                  <button
                    type="submit"
                    disabled={
                      !(props.isValid && props.dirty) || isLoading || !!shortcut
                    }
                    className="cursor-pointer rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-orange-300 md:absolute md:top-1/2 md:right-2 md:-translate-y-1/2"
                  >
                    {t("cta")}
                  </button>
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
                {status === "authenticated" && (
                  <div className="flex w-full flex-col gap-4">
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-1 text-sm text-slate-600 hover:text-slate-800 disabled:cursor-not-allowed disabled:text-slate-400 dark:text-slate-400 dark:hover:text-white dark:disabled:text-slate-500"
                      onClick={() => setMoreOptionsVisible(!moreOptionsVisible)}
                      disabled={isLoading || !!shortcut}
                    >
                      {t("moreOptions")}
                      {moreOptionsVisible ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {moreOptionsVisible && (
                      <div className="flex flex-col gap-4 rounded-md border border-slate-300 bg-slate-100 p-4 dark:border-slate-600 dark:bg-slate-800">
                        <div className="flex gap-1">
                          <Switch
                            isSelected={props.values.permanent}
                            isDisabled={isLoading || !!shortcut}
                            onChange={(isPermanent) =>
                              props.setFieldValue("permanent", isPermanent)
                            }
                          >
                            {t("options.permanentLink")}
                          </Switch>
                        </div>
                        <div className="flex flex-col gap-4">
                          <Switch
                            isSelected={props.values.expirable}
                            isDisabled={
                              isLoading || !!shortcut || props.values.permanent
                            }
                            onChange={(isExpirable) =>
                              props.setFieldValue("expirable", isExpirable)
                            }
                          >
                            {t("options.expirableLink")}
                          </Switch>
                          {props.values.expirable && (
                            <div className="flex flex-wrap gap-4">
                              <DatePicker
                                value={props.values.expireDate}
                                onChange={(date) =>
                                  props.setFieldValue("expireDate", date)
                                }
                                isDisabled={isLoading || !!shortcut}
                                isInvalid={!!props.errors.expireDate}
                                errorMessage={props.errors.expireDate}
                              />
                              <TimeField
                                value={props.values.expireTime}
                                onChange={(time) =>
                                  props.setFieldValue("expireTime", time)
                                }
                                isDisabled={isLoading || !!shortcut}
                                isInvalid={!!props.errors.expireTime}
                                errorMessage={props.errors.expireTime}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Form>
            )}
          </Formik>
          {isLoading && (
            <div className="flex justify-center">
              <Spinner size={32} />
            </div>
          )}
          {!isLoading && error && (
            <div className="text-center text-sm text-red-600">{error}</div>
          )}
        </div>
      </div>
      {!!shortcut && <SuccessSection shortcut={shortcut} />}
    </>
  );
}
