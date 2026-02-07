"use client";

import { Button } from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import { ConfirmAccountDeletionDialog } from "@/components/molecules/settings/ConfirmAccountDeletionDialog";
import { AnimatedDialogModal } from "@/components/molecules/AnimatedDialogModal";
import { useCallback, useState } from "react";
import { Trash } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { Spinner } from "@/components/atoms/Spinner";
import { signOut } from "next-auth/react";

export function DeleteAccountForm() {
  const api = useApi();
  const t = useTranslations("DeleteAccountForm");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await api.delete("/user/me");
      signOut({ callbackUrl: "/signin" });
    } catch (err) {
      setError(t("error.unknownError"));
    } finally {
      setIsLoading(false);
    }
  }, [api, t]);

  return (
    <div className="flex flex-col gap-4 text-slate-800 dark:text-white">
      <p>{t("description")}</p>
      <Button
        onPress={() => setShowDeleteDialog(true)}
        isDisabled={isLoading}
        className="pressed:bg-red-700 w-fit bg-red-500 text-white hover:bg-red-600"
      >
        <div className="flex items-center gap-2">
          {!isLoading && <Trash className="h-4 w-4" />}
          {isLoading && <Spinner size={16} />}
          <div>{t("delete")}</div>
        </div>
      </Button>
      <AnimatedDialogModal
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <ConfirmAccountDeletionDialog onDelete={onDelete} />
      </AnimatedDialogModal>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
