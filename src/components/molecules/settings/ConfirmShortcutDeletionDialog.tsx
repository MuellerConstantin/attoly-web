"use client";

import { DialogProps, Heading } from "react-aria-components";
import { Dialog } from "@/components/atoms/Dialog";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import { useTranslations } from "next-intl";

interface ConfirmShortcutDeletionDialogProps extends Omit<
  DialogProps,
  "children"
> {
  onDelete: () => Promise<void>;
}

export function ConfirmShortcutDeletionDialog(
  props: ConfirmShortcutDeletionDialogProps,
) {
  const t = useTranslations("ConfirmShortcutDeletionDialog");

  const { onDelete } = props;

  return (
    <Dialog {...props}>
      {({ close }) => (
        <>
          <Heading
            slot="title"
            className="my-0 text-xl leading-6 font-semibold"
          >
            {t("title")}
          </Heading>
          <div className="mt-4 flex flex-col gap-4">
            <p>{t("description")}</p>
            <div className="flex justify-start gap-4">
              <Button
                variant="secondary"
                onPress={() => close()}
                className="w-full"
              >
                {t("cancel")}
              </Button>
              <Button
                onPress={() => {
                  close();
                  onDelete();
                }}
                className="pressed:bg-red-700 flex w-full justify-center bg-red-500 text-white hover:bg-red-600"
              >
                {t("delete")}
              </Button>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
}
