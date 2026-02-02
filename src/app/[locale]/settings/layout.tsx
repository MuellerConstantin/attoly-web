import { getTranslations } from "next-intl/server";
import { StackTemplate } from "@/components/templates/StackTemplate";
import { CreditCard, User, UserCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/organisms/AuthProvider";
import { SettingsNavigation } from "@/components/organisms/settings/SettingsNavigation";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("SettingsPage");
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <AuthGuard>
      <StackTemplate>
        <div className="mx-auto my-8 flex w-full max-w-[80rem] grow flex-col gap-8 p-4 md:flex-row">
          <div className="flex w-full shrink-0 flex-col gap-4 md:w-1/3 xl:w-1/4">
            <div className="flex items-center gap-4 rounded-md border border-slate-200 bg-sky-500 p-4 text-white">
              <UserCircle className="h-10 w-10" />
              <span className="truncate text-sm font-bold">
                {session!.user.id}
              </span>
            </div>
            <SettingsNavigation />
          </div>
          <div className="flex grow flex-col">{children}</div>
        </div>
      </StackTemplate>
    </AuthGuard>
  );
}
