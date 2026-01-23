"use client";

import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/atoms/Form";
import { Spinner } from "@/components/atoms/Spinner";
import { TextField } from "@/components/atoms/TextField";
import { Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { AxiosError } from "axios";
import { Link } from "@/components/atoms/Link";
import { useApi } from "@/hooks/useApi";

interface VerifyUserConfirmationProps {
  token: string;
}

function VerifyUserConfirmation({ token }: VerifyUserConfirmationProps) {
  const t = useTranslations("VerifyUserPage.confirmation");
  const api = useApi();

  const hasVerifiedRef = useRef(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showVerificationNotice, setShowVerificationNotice] =
    useState<boolean>(false);

  const onVerifyUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post("/user/verify", { verificationToken: token });
      setSuccess(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (
          err.response?.status === 410 &&
          err.response.data.error === "InvalidVerificationTokenError"
        ) {
          setError(t("error.invalidToken"));
          setShowVerificationNotice(true);
        } else {
          setError(t("error.unknownError"));
        }
      } else {
        setError(t("error.unknownError"));
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    if (hasVerifiedRef.current) return;

    hasVerifiedRef.current = true;
    onVerifyUser();
  }, [token, onVerifyUser]);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex w-fit items-center overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/70">
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
          <div className="flex flex-col gap-2">
            {isLoading && (
              <div className="flex w-full justify-center p-2 pt-6">
                <Spinner />
              </div>
            )}
            {success && (
              <>
                <p className="text-center text-green-500">
                  {t("successMessage")}
                </p>
                <p className="text-center">
                  <Link href="/signin">{t("backToSignin")}</Link>
                </p>
              </>
            )}
            {error && (
              <>
                <p className="text-center text-red-500">{error}</p>
                {showVerificationNotice ? (
                  <p className="text-center">
                    <Link href="/verify-user">{t("verificationNotice")}</Link>
                  </p>
                ) : (
                  <p className="text-center">
                    <Link href="/signin">{t("backToSignin")}</Link>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VerifyUserRequest() {
  const t = useTranslations("VerifyUserPage.request");
  const validationT = useTranslations("ValidationMessages");
  const api = useApi();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationT("invalidEmail"))
      .required(validationT("required")),
  });

  const onRequestVerify = useCallback(
    async (
      { email }: { email: string },
      {
        resetForm,
      }: FormikHelpers<{
        email: string;
      }>,
    ) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        await api.get(`/user/verify?email=${encodeURIComponent(email)}`);
        setSuccess(true);
        resetForm();
      } catch (err) {
        setError(t("error.unknownError"));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex w-fit items-center overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/70">
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
            initialValues={{ email: "" }}
            validationSchema={schema}
            onSubmit={onRequestVerify}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} validationBehavior="aria">
                {error && <p className="text-center text-red-500">{error}</p>}
                {success && (
                  <p className="text-center text-green-500">
                    {t("successMessage")}
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
                <Button
                  type="submit"
                  className="flex w-full justify-center"
                  isDisabled={!(props.isValid && props.dirty) || isLoading}
                >
                  {!isLoading && <span>{t("request")}</span>}
                  {isLoading && <Spinner />}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default function VerifyUser() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  return token ? (
    <VerifyUserConfirmation token={token} />
  ) : (
    <VerifyUserRequest />
  );
}
