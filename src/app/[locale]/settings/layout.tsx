import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { StackTemplate } from "@/components/templates/StackTemplate";
import ServerAuthGuard from "@/components/organisms/ServerAuthGuard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SettingsPage" });

  return {
    title: t("meta.title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServerAuthGuard>
      <StackTemplate>{children}</StackTemplate>
    </ServerAuthGuard>
  );
}
