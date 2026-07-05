import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n-config";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.slice(0, 2).toLowerCase();
  return locales.includes(preferred as (typeof locales)[number])
    ? preferred
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)).*)",
  ],
};
