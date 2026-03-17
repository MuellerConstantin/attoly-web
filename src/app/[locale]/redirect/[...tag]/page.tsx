import { ResolvePasswordProtectedShortcut } from "@/components/organisms/ResolvePasswordProtectedShortcut";
import { Shortcut } from "@/lib/types/shortcuts";
import { ApiError } from "@/lib/types/error";
import { notFound, redirect } from "next/navigation";

export default async function Redirect({
  params,
}: {
  params: Promise<{
    tag: string;
  }>;
}) {
  const { tag } = await params;

  const res = await fetch(
    `${process.env.ATTOLY_API_URL}${process.env.ATTOLY_API_PREFIX}/shortcuts/${tag}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    const apiError: ApiError = await res.json();

    if (
      res.status === 403 &&
      apiError?.error === "ShortcutPasswordRequiredError"
    ) {
      return (
        <div className="relative flex w-full grow flex-col items-center justify-center gap-4 bg-gradient-to-br from-orange-500 via-orange-400 to-sky-500 px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/80" />
          <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-transparent to-sky-400/80" />
          <div className="absolute inset-0 bg-black/5" />

          <ResolvePasswordProtectedShortcut tag={tag} />
        </div>
      );
    }

    throw new Error(`Failed to fetch shortcut (${res.status})`);
  }

  const shortcut: Shortcut = await res.json();

  redirect(shortcut.url);
}
