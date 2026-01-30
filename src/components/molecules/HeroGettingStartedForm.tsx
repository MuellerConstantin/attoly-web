"use client";

import { Formik } from "formik";
import { Form } from "@/components/atoms/Form";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export interface HeroGettingStartedFormProps {
  onSubmit?: (url: string) => void;
  isDisabled?: boolean;
  defaultValue?: string;
}

export function HeroGettingStartedForm({
  onSubmit,
  isDisabled,
  defaultValue,
}: HeroGettingStartedFormProps) {
  const router = useRouter();
  const t = useTranslations("HeroGettingStartedForm");
  const validationT = useTranslations("ValidationMessages");

  const schema = yup.object().shape({
    url: yup
      .string()
      .url(validationT("invalidUrl"))
      .required(validationT("required")),
  });

  return (
    <div className="relative">
      <Formik
        enableReinitialize
        initialValues={{ url: defaultValue || "" }}
        validationSchema={schema}
        onSubmit={(values) =>
          onSubmit
            ? onSubmit(values.url)
            : router.push(
                `/getting-started?url=${encodeURIComponent(values.url)}`,
              )
        }
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit} validationBehavior="aria">
            <input
              name="url"
              placeholder={t("placeholder")}
              className="w-full rounded-full border border-slate-300 bg-white/95 px-6 py-4 pr-32 text-slate-900 placeholder-slate-400 ring-0 transition outline-none focus:ring-4 focus:ring-white/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-white/20"
              value={props.values.url}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              disabled={isDisabled}
            />
            <button
              type="submit"
              disabled={!(props.isValid && props.dirty)}
              className="cursor-pointer rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-orange-300 md:absolute md:top-1/2 md:right-2 md:-translate-y-1/2"
            >
              {t("cta")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
