import { Shortcut } from "@/lib/types/shortcuts";
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
    throw new Error(`Failed to fetch shortcut (${res.status})`);
  }

  const shortcut: Shortcut = await res.json();

  redirect(shortcut.url);
}
