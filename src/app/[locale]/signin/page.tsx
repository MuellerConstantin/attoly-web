"use client";

import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/atoms/Form";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { TextField } from "@/components/atoms/TextField";
import { Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useCallback, useState } from "react";

export default function SignIn() {
  const t = useTranslations("SignInPage");
  const validationT = useTranslations("ValidationMessages");
  const router = useRouter();

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
    [router],
  );

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationT("invalidEmail"))
      .required(validationT("required")),
    password: yup.string().required(validationT("required")),
  });

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex w-fit items-center overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/70">
        <div className="bg-isometric hidden aspect-square h-[35rem] lg:block" />
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
