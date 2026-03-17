"use client";

import { Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Form } from "@/components/atoms/Form";
import * as yup from "yup";
import { useCallback, useState } from "react";
import { TextField } from "@/components/atoms/TextField";
import { Button } from "@/components/atoms/Button";
import { useApi } from "@/hooks/useApi";
import { Shortcut } from "@/lib/types/shortcuts";
import { AxiosError } from "axios";

export interface ResolvePasswordProtectedShortcutProps {
  tag: string;
}

export function ResolvePasswordProtectedShortcut({
  tag,
}: ResolvePasswordProtectedShortcutProps) {
  const api = useApi();
  const t = useTranslations("ResolvePasswordProtectedShortcut");
  const validationT = useTranslations("ValidationMessages");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shortcut, setShortcut] = useState<Shortcut | null>(null);

  const schema = yup.object().shape({
    password: yup.string().required(validationT("required")),
  });

  const onRedirect = useCallback(
    async (
      values: { password: string },
      helpers: { setFieldError: (field: string, message: string) => void },
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await api.post(`/shortcuts/${tag}/resolve`, {
          password: values.password,
        });

        setShortcut(res.data);
        window.location.href = res.data.url;
      } catch (err) {
        if (err instanceof AxiosError) {
          if (
            err.response?.status === 403 &&
            err.response.data.error === "InvalidShortcutPasswordError"
          ) {
            helpers.setFieldError("password", err.response.data.message);
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
        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <Formik<{
          password: string;
        }>
          enableReinitialize
          initialValues={{
            password: "",
          }}
          validationSchema={schema}
          onSubmit={onRedirect}
        >
          {(props) => (
            <Form
              onSubmit={props.handleSubmit}
              validationBehavior="aria"
              className="flex w-full flex-col items-center gap-4"
            >
              <TextField
                name="password"
                type="password"
                className="w-full"
                placeholder={t("passwordPlaceholder")}
                value={props.values.password}
                onBlur={props.handleBlur}
                onChange={(value) => props.setFieldValue("password", value)}
                errorMessage={props.errors.password}
                isInvalid={!!props.errors.password}
              />
              <Button
                type="submit"
                className="w-full"
                isDisabled={!(props.isValid && props.dirty)}
              >
                {t("redirect")}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
