import { AnonymousCreatorBadge } from "@/components/molecules/AnonymousCreatorBadge";
import { GettingStartedGenerateShortcut } from "@/components/organisms/GettingStartedGenerateShortcut";
import { authOptions } from "@/lib/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

type Props = {
  searchParams: Promise<{ url?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { url } = await searchParams;

  return {
    robots: {
      index: !url,
      follow: !url,
    },
  };
}

export default async function GettingStarted({ searchParams }: Props) {
  const { url } = await searchParams;

  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-4 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      <GettingStartedGenerateShortcut url={url} />
      {!session?.authenticated && (
        <div className="z-10">
          <AnonymousCreatorBadge />
        </div>
      )}
    </div>
  );
}
