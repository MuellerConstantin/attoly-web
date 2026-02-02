import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

async function proxyRequest(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return new Response(
      JSON.stringify({
        code: "LOGO_PROXY_ERROR",
        timestamp: new Date().toISOString(),
        path: null,
        message: "Missing domain parameter",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    const response = await fetch(googleFaviconUrl, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return new Response(
          JSON.stringify({
            code: "LOGO_PROXY_ERROR",
            timestamp: new Date().toISOString(),
            path: null,
            message: "Logo not found",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      } else {
        console.error("Proxy-Error:", response.status, await response.text());

        return new Response(
          JSON.stringify({
            code: "LOGO_PROXY_ERROR",
            timestamp: new Date().toISOString(),
            path: null,
            message: "Unexpected error while proxying request",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Proxy-Error:", error);

    return new Response(
      JSON.stringify({
        code: "LOGO_PROXY_ERROR",
        timestamp: new Date().toISOString(),
        path: null,
        message: "Unexpected error while proxying request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
