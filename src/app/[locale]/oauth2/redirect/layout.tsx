import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function OAuth2RedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
