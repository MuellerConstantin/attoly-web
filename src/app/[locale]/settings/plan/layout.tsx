import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PlanSettingsPage" });

  return {
    title: t("meta.title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PlanSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
