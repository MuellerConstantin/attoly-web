"use client";

import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/atoms/Form";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { TextField } from "@/components/atoms/TextField";
import { Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { api } from "@/api";
import { AxiosError } from "axios";

export default function SignUp() {
  const t = useTranslations("SignUpPage");
  const validationT = useTranslations("ValidationMessages");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(validationT("invalidEmail"))
      .required(validationT("required")),
    password: yup.string().required(validationT("required")),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], validationT("confirmPassword"))
      .required(validationT("required")),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signUp = useCallback(
    async (
      { email, password }: { email: string; password: string },
      {
        setFieldError,
        resetForm,
      }: FormikHelpers<{
        email: string;
        password: string;
        passwordConfirmation: string;
      }>,
    ) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        await api.post("/users", { email, password });
        setSuccess(true);
        resetForm();
      } catch (err) {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 422 &&
            err.response.data.error === "ValidationError"
          ) {
            err.response.data.details?.forEach(
              (detail: { field: string; message: string }) =>
                setFieldError(detail.field, detail.message),
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
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={schema}
            onSubmit={signUp}
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
                  placeholder={t("emailPlaceholder")}
                  value={props.values.email}
                  onBlur={props.handleBlur}
                  onChange={(value) => {
                    props.setFieldValue("email", value);
                    props.setFieldTouched("email", true, false);
                  }}
                  isInvalid={!!props.touched.email && !!props.errors.email}
                  errorMessage={props.errors.email}
                  isDisabled={isLoading}
                />
                <TextField
                  type="password"
                  className="grow"
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
                  isDisabled={isLoading}
                />
                <TextField
                  type="password"
                  className="grow"
                  placeholder={t("passwordConfirmationPlaceholder")}
                  value={props.values.passwordConfirmation}
                  onBlur={props.handleBlur}
                  onChange={(value) => {
                    props.setFieldValue("passwordConfirmation", value);
                    props.setFieldTouched("passwordConfirmation", true, false);
                  }}
                  isInvalid={
                    !!props.touched.passwordConfirmation &&
                    !!props.errors.passwordConfirmation
                  }
                  errorMessage={props.errors.passwordConfirmation}
                  isDisabled={isLoading}
                />
                <Button
                  type="submit"
                  className="flex w-full justify-center"
                  isDisabled={!(props.isValid && props.dirty) || isLoading}
                >
                  {!isLoading && <span>{t("signUp")}</span>}
                  {isLoading && <Spinner />}
                </Button>
                <p className="text-center text-xs">
                  {t.rich("termsNotice", {
                    "terms-hyperlink": (chunks) => (
                      <Link href="/terms-of-use">{chunks}</Link>
                    ),
                    "privacy-hyperlink": (chunks) => (
                      <Link href="/privacy-policy">{chunks}</Link>
                    ),
                  })}
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <div className="bg-isometric hidden aspect-square h-[35rem] lg:block" />
      </div>
      <div className="relative z-10">
        <Link
          variant="secondary"
          href="/signin"
          className="text-sm text-white decoration-white hover:decoration-white dark:text-white dark:decoration-white dark:hover:decoration-white"
        >
          {t("haveAccount")}
        </Link>
      </div>
    </div>
  );
}
