import { NextRequest, NextResponse } from "next/server";

const locales = ["fr", "en", "de", "lb"];
const defaultLocale = "fr";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (locales.includes(maybeLocale)) {
    const locale = maybeLocale;
    const restPath = "/" + segments.slice(2).join("/");
    // Collapse any repeated slashes so `/en//evil.com` can never be
    // interpreted as an absolute URL (with `evil.com` as host) when
    // passed to `new URL(cleanPath, request.url)`. Without this, an
    // attacker-controlled path becomes an open redirect for the
    // default locale or an external rewrite for the others.
    const safePath = restPath.replace(/\/+/g, "/");
    const cleanPath = safePath === "/" ? "/" : safePath.replace(/\/$/, "");

    if (locale === defaultLocale) {
      return NextResponse.redirect(new URL(cleanPath, request.url), 301);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);

    const response = NextResponse.rewrite(new URL(cleanPath, request.url), {
      request: { headers: requestHeaders },
    });
    response.cookies.set("locale", locale, { path: "/", maxAge: 31536000, sameSite: "lax", secure: true });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", "fr");

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set("locale", "fr", { path: "/", maxAge: 31536000, sameSite: "lax", secure: true });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|api|admin|favicon\\.ico|robots\\.txt|sitemap\\.xml|og-image|images|icons).*)",
  ],
};
