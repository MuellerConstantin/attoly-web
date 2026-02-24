"use client";

import { Link } from "@/components/atoms/Link";
import { Pagination } from "@/components/molecules/Pagination";
import { useApi } from "@/hooks/useApi";
import { Page } from "@/lib/types/pagination";
import { ShortcutDetails } from "@/lib/types/shortcuts";
import { CalendarDays, Hourglass, Save, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR, { useSWRConfig } from "swr";
import { Button } from "@/components/atoms/Button";
import { TooltipTrigger } from "react-aria-components";
import { Tooltip } from "@/components/atoms/Tooltip";
import { AnimatedDialogModal } from "@/components/molecules/AnimatedDialogModal";
import { ConfirmShortcutDeletionDialog } from "@/components/molecules/settings/ConfirmShortcutDeletionDialog";

function ShortcutIcon({ url }: { url: string }) {
  const [error, setError] = useState(false);

  const domain = new URL(url).hostname;

  return (
    <Image
      src={error ? "/images/logo.svg" : `/api/logo?domain=${domain}`}
      width={32}
      height={32}
      alt="Shortcut Icon"
      className="block h-8 w-auto"
      onError={() => setError(true)}
      objectFit="contain"
    />
  );
}

interface ListItemProps {
  shortcut: ShortcutDetails;
  selected: string | null;
  onSelect: (key: string) => void;
}

function ListItem({ shortcut, selected, onSelect }: ListItemProps) {
  const api = useApi();
  const { mutate } = useSWRConfig();
  const t = useTranslations("MyShortcutsList");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isExpired =
    !shortcut.permanent &&
    shortcut.expiresAt &&
    new Date(shortcut.expiresAt) < new Date();

  const onDelete = useCallback(async () => {
    api.delete(`/user/me/shortcuts/${shortcut.tag}`).then(() => {
      mutate(
        (key) =>
          typeof key === "string" && key.startsWith("/user/me/shortcuts"),
      );
    });
  }, [api, shortcut.tag, t]);

  return (
    <li
      key={shortcut.id}
      className={`flex cursor-pointer flex-col gap-4 p-2 py-4 hover:rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 ${
        selected === `item-${shortcut.id}`
          ? "rounded-md bg-slate-100 dark:bg-slate-900"
          : ""
      }`}
      onClick={() => onSelect(`item-${shortcut.id}`)}
    >
      <div className="flex justify-between gap-x-6">
        <div className="flex min-w-0 items-center gap-x-4">
          <div className="relative flex h-fit w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white p-2 dark:border-slate-700">
            <ShortcutIcon url={shortcut.url} />
          </div>
          <div className="min-w-0 flex-auto truncate">
            <Link href={`${window.location.origin}/r/${shortcut!.tag}`}>
              {`${window.location.origin}/r/${shortcut!.tag}`}
            </Link>
            <p className="mt-1 truncate text-xs/5 text-slate-500">
              {shortcut.url}
            </p>
          </div>
        </div>
        <div className="flex hidden shrink-0 flex-col gap-1 sm:flex sm:flex-col sm:items-end">
          {selected !== `item-${shortcut.id}` && (
            <p className="text-xs/5 text-slate-500">
              {t("createdAt")}{" "}
              <time dateTime={shortcut.createdAt}>
                {new Date(shortcut.createdAt).toLocaleString()}
              </time>
            </p>
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {selected === `item-${shortcut.id}` && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="flex flex-col gap-4"
          >
            <hr className="border border-slate-200 dark:border-slate-700" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-x-4">
                <div className="flex items-center gap-1 text-xs/5 text-slate-500">
                  <CalendarDays className="inline-block h-3 w-3" />
                  <div>
                    {t("createdAt")}{" "}
                    <time dateTime={shortcut.createdAt}>
                      {new Date(shortcut.createdAt).toLocaleString()}
                    </time>
                  </div>
                </div>
                {shortcut.expiresAt && (
                  <div className="flex items-center gap-1 text-xs/5 text-slate-500">
                    <Hourglass className="inline-block h-3 w-3" />
                    <div>
                      {t("expiresAt")}{" "}
                      <time dateTime={shortcut.expiresAt}>
                        {new Date(shortcut.expiresAt).toLocaleString()}
                      </time>
                    </div>
                  </div>
                )}
              </div>
              {shortcut.permanent && (
                <div className="flex w-fit items-center gap-1 rounded-md bg-green-500/20 px-2 py-0.5 font-mono text-xs font-medium text-green-500">
                  <Save className="h-3 w-3" />
                  {t("permanent")}
                </div>
              )}
              {!shortcut.permanent && isExpired && (
                <div className="flex w-fit items-center gap-1 rounded-md bg-red-500/20 px-2 py-0.5 font-mono text-xs font-medium text-red-500">
                  <Hourglass className="h-3 w-3" />
                  {t("expired")}
                </div>
              )}
              <div className="flex w-full flex-wrap justify-end">
                <TooltipTrigger>
                  <Button
                    variant="danger"
                    className="rounded-full p-2"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Tooltip>{t("deleteTooltip")}</Tooltip>
                </TooltipTrigger>
              </div>
            </div>
            <AnimatedDialogModal
              isOpen={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
            >
              <ConfirmShortcutDeletionDialog onDelete={onDelete} />
            </AnimatedDialogModal>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function MyShortcutsList() {
  const t = useTranslations("MyShortcutsList");
  const api = useApi();

  const [page, setPage] = useState(1);
  const [perPage] = useState(25);
  const [selected, setSelected] = useState<string | null>(null);

  const url = useMemo(() => {
    const apiPage = Math.max(page - 1, 0);

    const params = new URLSearchParams({
      perPage: String(perPage),
      page: String(apiPage),
    });

    return `/user/me/shortcuts?${params.toString()}`;
  }, [page, perPage]);

  const { data, isLoading, error } = useSWR<
    Page<ShortcutDetails>,
    unknown,
    string | null
  >(url, (url) => api.get(url).then((res) => res.data));

  const onSelect = useCallback((key: string) => {
    setSelected((prev) => (prev === key ? null : key));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <ul
            role="list"
            className="divide-y divide-slate-100 dark:divide-slate-700"
          >
            {Array.from(Array(10).keys()).map((key) => (
              <li key={key} className="flex justify-between gap-x-6 p-2 py-5">
                <div className="flex min-w-0 items-center gap-x-4">
                  <div className="relative flex h-10 w-10 shrink-0 animate-pulse items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-slate-200 dark:border-slate-700 dark:bg-slate-700" />
                  <div className="min-w-0 flex-auto truncate">
                    <div className="h-4 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="mt-1 h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-4">
          <ul
            role="list"
            className="divide-y divide-slate-100 dark:divide-slate-700"
          >
            {Array.from(Array(10).keys()).map((key) => (
              <li key={key} className="flex justify-between gap-x-6 p-2 py-5">
                <div className="flex min-w-0 items-center gap-x-4">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-red-300 dark:border-slate-700 dark:bg-red-800" />
                  <div className="min-w-0 flex-auto truncate">
                    <div className="h-4 w-64 rounded bg-red-300 dark:bg-red-800" />
                    <div className="mt-1 h-3 w-3/4 rounded bg-red-300 dark:bg-red-800" />
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="h-3 w-32 rounded bg-red-300 dark:bg-red-800" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : data?.content.length === 0 ? (
        <p className="w-full text-center text-slate-800 dark:text-white">
          {t.rich("empty", {
            link: (chunks) => <Link href="/getting-started">{chunks}</Link>,
          })}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <ul
            role="list"
            className="divide-y divide-slate-100 dark:divide-slate-700"
          >
            {data?.content.map((shortcut) => (
              <ListItem
                key={shortcut.id}
                shortcut={shortcut}
                selected={selected}
                onSelect={onSelect}
              />
            ))}
          </ul>
          <Pagination
            currentPage={page}
            totalPages={data!.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
