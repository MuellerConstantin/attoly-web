"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/components/atoms/Link";
import { Button, DialogTrigger } from "react-aria-components";
import { Popover } from "@/components/atoms/Popover";
import { Info } from "lucide-react";

export function AnonymousCreatorBadge() {
  const t = useTranslations("AnonymousCreatorBadge");

  return (
    <div>
      <DialogTrigger>
        <Button className="flex items-center gap-1 rounded-full bg-sky-500 px-2 py-1 text-xs text-white">
          <Info className="h-3 w-3" />
          {t("label")}
        </Button>
        <Popover className="max-w-xs p-4" showArrow>
          {t.rich("anonymousNotice", {
            link: (chunks) => <Link href="/pricing">{chunks}</Link>,
          })}
        </Popover>
      </DialogTrigger>
    </div>
  );
}
