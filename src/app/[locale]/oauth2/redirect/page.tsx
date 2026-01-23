"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuth2Redirect() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const refreshToken = params.get("refresh_token");

    if (!refreshToken) {
      router.push("/signin?error=OAuth2Failed");
      return;
    }

    signIn("oauth2-exchange", {
      refreshToken,
      callbackUrl: "/",
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        router.push("/signin?error=OAuth2Failed");
        return;
      }

      router.push(res?.url ?? "/");
    });
  }, [router, params]);

  return null;
}
