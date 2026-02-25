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
    const cleanPath = restPath === "/" ? "/" : restPath.replace(/\/$/, "");

    if (locale === defaultLocale) {
      return NextResponse.redirect(new URL(cleanPath, request.url), 301);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);

    const response = NextResponse.rewrite(new URL(cleanPath, request.url), {
      request: { headers: requestHeaders },
    });
    response.cookies.set("locale", locale, { path: "/", maxAge: 31536000 });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", "fr");

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set("locale", "fr", { path: "/", maxAge: 31536000 });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|api|admin|favicon\\.ico|robots\\.txt|sitemap\\.xml|og-image|images|icons).*)",
  ],
};
