"use client";

import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/atoms/Form";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { TextField } from "@/components/atoms/TextField";
import { Formik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";

export default function SignIn() {
  const t = useTranslations("SignInPage");
  const validationT = useTranslations("ValidationMessages");
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerificationNotice, setShowVerificationNotice] =
    useState<boolean>(false);

  const onSignIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
          locale,
        });

        if (res?.error) {
          if (res.error === "InvalidCredentials") {
            setError(t("error.invalidCredentials"));
          } else if (res.error === "AccountDisabled") {
            setShowVerificationNotice(true);
            setError(t("error.accountDisabled"));
          } else {
            setError(t("error.unknownError"));
          }
        } else {
          router.push(res?.url ?? "/");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router, locale, t],
  );

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationT("invalidEmail"))
      .required(validationT("required")),
    password: yup.string().required(validationT("required")),
  });

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam === "OAuth2Failed") {
      setError(t("error.oauth2Failed"));
    }
  }, [searchParams, t]);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex w-fit items-center items-stretch overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/70">
        <div className="bg-isometric hidden aspect-square lg:block" />
        <div className="flex w-full max-w-[25rem] shrink-0 flex-col gap-8 p-8 lg:w-[25rem]">
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
          <div className="flex flex-col gap-4">
            <Formik
              enableReinitialize
              initialValues={{ email: "", password: "" }}
              validationSchema={schema}
              onSubmit={onSignIn}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit} validationBehavior="aria">
                  {error && <p className="text-center text-red-500">{error}</p>}
                  {showVerificationNotice && (
                    <p className="text-center">
                      <Link href="/verify-user">{t("verificationNotice")}</Link>
                    </p>
                  )}
                  <TextField
                    type="email"
                    className="grow"
                    isDisabled={isLoading}
                    placeholder={t("emailPlaceholder")}
                    value={props.values.email}
                    onBlur={props.handleBlur}
                    onChange={(value) => {
                      props.setFieldValue("email", value);
                      props.setFieldTouched("email", true, false);
                    }}
                    isInvalid={!!props.touched.email && !!props.errors.email}
                    errorMessage={props.errors.email}
                  />
                  <TextField
                    type="password"
                    className="grow"
                    isDisabled={isLoading}
                    placeholder={t("passwordPlaceholder")}
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    onChange={(value) => {
                      props.setFieldValue("password", value);
                      props.setFieldTouched("password", true, false);
                    }}
                    isInvalid={
                      !!props.touched.password && !!props.errors.password
                    }
                    errorMessage={props.errors.password}
                  />
                  <Button
                    type="submit"
                    className="flex w-full justify-center"
                    isDisabled={!(props.isValid && props.dirty) || isLoading}
                  >
                    {!isLoading && <span>{t("signIn")}</span>}
                    {isLoading && <Spinner />}
                  </Button>
                  <p className="text-sm">
                    <Link href="/reset-password">{t("resetNotice")}</Link>
                  </p>
                </Form>
              )}
            </Formik>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 flex-1 border-t border-slate-600 dark:border-slate-400"></div>
              <span className="text-sm text-gray-600 uppercase dark:text-slate-400">
                {t("or")}
              </span>
              <div className="w-16 flex-1 border-t border-gray-600 dark:border-slate-400"></div>
            </div>
            <Link
              className="pressed:bg-gray-800 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black/10 bg-black px-5 py-2 text-center text-sm text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition hover:bg-gray-900 hover:no-underline dark:border-white/10 dark:text-white dark:shadow-none"
              href={`/api/oauth2/authorization/github?redirect_uri=${encodeURIComponent(
                `${window.location.origin}/oauth2/redirect`,
              )}`}
            >
              <svg
                role="img"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path
                  fill="white"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              <span>Github</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <Link
          variant="secondary"
          href="/signup"
          className="text-sm text-white decoration-white hover:decoration-white dark:text-white dark:decoration-white dark:hover:decoration-white"
        >
          {t("noAccount")}
        </Link>
      </div>
    </div>
  );
}
