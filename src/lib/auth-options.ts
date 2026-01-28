import type { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessExpiresAt: number;
    refreshExpiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessExpiresAt?: number;
    refreshExpiresAt?: number;
  }
}

type TokenResponse = {
  principal: string;
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
};

async function retrieveAccessToken(
  email: string,
  password: string,
): Promise<TokenResponse> {
  const baseUrl = `${process.env.ATTOLY_API_URL}${process.env.ATTOLY_API_PREFIX}`;

  if (!baseUrl) throw new Error("ATTOLY_API_URL is not set");

  const res = await fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json();
    const status = res.status;

    if (status === 401 && body.error === "InvalidCredentialsError") {
      throw new Error("InvalidCredentials");
    }

    if (status === 401 && body.error === "AccountDisabledError") {
      throw new Error("AccountDisabled");
    }

    throw new Error("AuthenticationFailed");
  }

  return (await res.json()) as TokenResponse;
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<TokenResponse> {
  const baseUrl = `${process.env.ATTOLY_API_URL}${process.env.ATTOLY_API_PREFIX}`;

  if (!baseUrl) throw new Error("ATTOLY_API_URL is not set");

  const res = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("AuthenticationRefreshFailed");
  }

  return (await res.json()) as TokenResponse;
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const tokens = await retrieveAccessToken(email, password);

        return {
          id: tokens.principal,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessExpiresAt: Date.now() + tokens.accessExpiresIn,
          refreshExpiresAt: Date.now() + tokens.refreshExpiresIn,
        };
      },
    }),
    CredentialsProvider({
      id: "oauth2-exchange",
      name: "OAuth2 Exchange",
      credentials: {
        refreshToken: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.refreshToken) return null;

        try {
          const refreshed = await refreshAccessToken(
            credentials.refreshToken as string,
          );

          return {
            id: refreshed.principal,
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
            accessExpiresAt: Date.now() + refreshed.accessExpiresIn,
            refreshExpiresAt: Date.now() + refreshed.refreshExpiresIn,
          };
        } catch (err) {
          throw new Error("OAuth2ExchangeFailed", { cause: err });
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any).id;
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.accessExpiresAt = (user as any).accessExpiresAt;
        token.refreshExpiresAt = (user as any).refreshExpiresAt;

        return token;
      }

      if (
        token.accessExpiresAt &&
        Date.now() < token.accessExpiresAt - 10_000
      ) {
        return token;
      }

      if (token.refreshExpiresAt && Date.now() > token.refreshExpiresAt) {
        throw new Error("RefreshTokenExpired");
      }

      try {
        const refreshed = await refreshAccessToken(
          token.refreshToken as string,
        );

        token.accessToken = refreshed.accessToken;
        token.refreshToken = refreshed.refreshToken;
        token.accessExpiresAt = Date.now() + refreshed.accessExpiresIn;
        token.refreshExpiresAt = Date.now() + refreshed.refreshExpiresIn;
      } catch (error) {
        throw new Error("TokenRefreshFailed", { cause: error });
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string | undefined;
      }

      session.accessToken = token.accessToken;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/signin",
  },
};
