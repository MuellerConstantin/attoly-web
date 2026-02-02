"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider refetchInterval={60} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}

export function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut({ callbackUrl: "/signin" });
    }
  }, [status]);

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null;
}
