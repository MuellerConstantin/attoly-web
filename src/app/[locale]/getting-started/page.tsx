import { GettingStartedCreateShortcut } from "@/components/organisms/GettingStartedCreateShortcut";
import { GettingStartedViewShortcut } from "@/components/organisms/GettingStartedViewShortcut";
import { Metadata } from "next";

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

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
      <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
      <div className="absolute inset-0 bg-black/5" />

      {url ? (
        <GettingStartedViewShortcut url={url} />
      ) : (
        <GettingStartedCreateShortcut />
      )}
    </div>
  );
}
