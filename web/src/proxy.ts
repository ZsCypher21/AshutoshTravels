import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, localeCookie } from "@/i18n/config";

/**
 * Language routing.
 * - /ja/...      → served as Japanese
 * - /en/...      → redirected to the unprefixed URL (English lives at /)
 * - everything else is English, rewritten internally to /en/..., unless the
 *   visitor chose Japanese (cookie) or, on a first visit, their browser prefers it.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/ja" || pathname.startsWith("/ja/")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const chosen = request.cookies.get(localeCookie)?.value;
  const prefersJapanese =
    chosen === "ja" ||
    (!chosen && /^ja\b/i.test(request.headers.get("accept-language")?.split(",")[0]?.trim() ?? ""));

  if (prefersJapanese) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ja" : `/ja${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next.js internals and any file with an extension (images, sitemap.xml, robots.txt…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
