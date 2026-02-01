"use client";

import { Button } from "@/components/atoms/Button";
import { Form } from "@/components/atoms/Form";
import { Spinner } from "@/components/atoms/Spinner";
import { TextField } from "@/components/atoms/TextField";
import { useApi } from "@/hooks/useApi";
import { AxiosError } from "axios";
import { Formik, FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import * as yup from "yup";

export function ChangePasswordForm() {
  const api = useApi();
  const t = useTranslations("ChangePasswordForm");
  const validationT = useTranslations("ValidationMessages");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const schema = yup.object().shape({
    currentPassword: yup.string().required(validationT("required")),
    newPassword: yup.string().required(validationT("required")),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword")], validationT("confirmPassword"))
      .required(validationT("required")),
  });

  const onChangePassword = useCallback(
    async (
      {
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      }: {
        currentPassword: string;
        newPassword: string;
        newPasswordConfirmation: string;
      },
      {
        resetForm,
        setFieldError,
      }: FormikHelpers<{
        currentPassword: string;
        newPassword: string;
        newPasswordConfirmation: string;
      }>,
    ) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        await api.patch("/user/me/password", {
          currentPassword,
          newPassword,
        });
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
    [t],
  );

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      }}
      validationSchema={schema}
      onSubmit={onChangePassword}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} validationBehavior="aria">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{t("successMessage")}</p>}
          <TextField
            type="password"
            className="grow"
            placeholder={t("currentPasswordPlaceholder")}
            value={props.values.currentPassword}
            onBlur={props.handleBlur}
            onChange={(value) => {
              props.setFieldValue("currentPassword", value);
              props.setFieldTouched("currentPassword", true, false);
            }}
            isInvalid={
              !!props.touched.currentPassword && !!props.errors.currentPassword
            }
            errorMessage={props.errors.currentPassword}
            isDisabled={isLoading}
          />
          <TextField
            type="password"
            className="grow"
            placeholder={t("newPasswordPlaceholder")}
            value={props.values.newPassword}
            onBlur={props.handleBlur}
            onChange={(value) => {
              props.setFieldValue("newPassword", value);
              props.setFieldTouched("newPassword", true, false);
            }}
            isInvalid={
              !!props.touched.newPassword && !!props.errors.newPassword
            }
            errorMessage={props.errors.newPassword}
            isDisabled={isLoading}
          />
          <TextField
            type="password"
            className="grow"
            placeholder={t("newPasswordConfirmationPlaceholder")}
            value={props.values.newPasswordConfirmation}
            onBlur={props.handleBlur}
            onChange={(value) => {
              props.setFieldValue("newPasswordConfirmation", value);
              props.setFieldTouched("newPasswordConfirmation", true, false);
            }}
            isInvalid={
              !!props.touched.newPasswordConfirmation &&
              !!props.errors.newPasswordConfirmation
            }
            errorMessage={props.errors.newPasswordConfirmation}
            isDisabled={isLoading}
          />
          <Button
            type="submit"
            className="flex w-fit justify-center"
            isDisabled={!(props.isValid && props.dirty) || isLoading}
          >
            {!isLoading && <span>{t("changePassword")}</span>}
            {isLoading && <Spinner />}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
