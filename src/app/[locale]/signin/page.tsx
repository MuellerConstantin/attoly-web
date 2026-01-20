"use client";

import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/atoms/Form";
import { Link } from "@/components/atoms/Link";
import { Spinner } from "@/components/atoms/Spinner";
import { TextField } from "@/components/atoms/TextField";
import { Formik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as yup from "yup";

export default function SignIn() {
  const t = useTranslations("SignInPage");
  const validationT = useTranslations("ValidationMessages");

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

      <div className="relative z-10 w-full max-w-[30rem] space-y-8 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/70">
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
          onSubmit={() => {}}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} validationBehavior="aria">
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
                isDisabled={props.isSubmitting}
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
                isInvalid={!!props.touched.password && !!props.errors.password}
                errorMessage={props.errors.password}
                isDisabled={props.isSubmitting}
              />
              <Button
                type="submit"
                className="flex w-full justify-center"
                isDisabled={
                  !(props.isValid && props.dirty) || props.isSubmitting
                }
              >
                {!props.isSubmitting && <span>{t("signIn")}</span>}
                {props.isSubmitting && <Spinner />}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="relative z-10">
        <Link variant="secondary" href="/signup" className="text-sm">
          {t("noAccount")}
        </Link>
      </div>
    </div>
  );
}
