import { getTranslations } from "next-intl/server";
import { StackTemplate } from "@/components/templates/StackTemplate";
import ServerAuthGuard from "@/components/organisms/ServerAuthGuard";
import { CreditCard, User, UserCircle, Link as LinkIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { ListBox, ListBoxItem } from "@/components/atoms/ListBox";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("SettingsPage");
  const session = await getServerSession(authOptions);

  return (
    <ServerAuthGuard>
      <StackTemplate>
        <div className="mx-auto my-8 flex w-full max-w-[80rem] grow flex-col gap-4 gap-12 p-4 md:flex-row">
          <div className="flex w-full shrink-0 flex-col gap-4 md:w-1/3 xl:w-1/4">
            <div className="flex items-center gap-4 rounded-md border border-slate-200 bg-orange-500 p-4 text-white">
              <UserCircle className="h-10 w-10" />
              <span className="truncate text-sm font-bold">
                {session!.user.id}
              </span>
            </div>
            <ListBox>
              <ListBoxItem href="/settings/account">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{t("account")}</span>
                </div>
              </ListBoxItem>
              <ListBoxItem href="/settings/billing">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>{t("billing")}</span>
                </div>
              </ListBoxItem>
              <ListBoxItem href="/settings/shortcuts">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  <span>{t("shortLinks")}</span>
                </div>
              </ListBoxItem>
            </ListBox>
          </div>
          <div className="flex grow flex-col">{children}</div>
        </div>
      </StackTemplate>
    </ServerAuthGuard>
  );
}
