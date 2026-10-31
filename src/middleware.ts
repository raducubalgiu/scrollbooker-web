import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import { deviceHeadersFromRequest } from "@/lib/auth/deviceHeaders";
import { needsRefresh, refreshSessionToken } from "@/lib/auth/refreshSession";
import {
  applySessionCookieUpdate,
  prepareSessionCookieUpdate,
  SessionCookieUpdate,
} from "@/lib/auth/sessionCookie";

const AUTH_ROUTES = [
  "/auth/signin",
  "/auth/register",
  "/auth/register-business",
  "/auth/get-started",
  "/auth/forgot-password",
  "/auth/reset-password",
];
const PUBLIC_ERROR_ROUTES = ["/unauthorized", "/not-found", "/_not-found"];

const GATED_ROUTE_PREFIXES = [
  "/unauthorized",
  "/auth",
  "/onboarding",
  "/feed",
  "/search",
  "/search-users",
  "/notifications",
  "/appointments",
  "/booking",
  "/business",
  "/employment-request",
  "/upload-video",
  "/user",
  "/admin",
  "/settings",
];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route);
}

function isOnboardingRoute(pathname: string) {
  return pathname.startsWith("/onboarding");
}

function isPublicOrErrorRoute(pathname: string) {
  return PUBLIC_ERROR_ROUTES.includes(pathname);
}

function isGatedRoute(pathname: string) {
  return (
    pathname === "/" ||
    GATED_ROUTE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  );
}

async function resolveSession(
  req: NextRequest
): Promise<{ token: JWT | null; cookieUpdate?: SessionCookieUpdate }> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET as string });
  if (!token || !needsRefresh(token)) return { token };

  const outcome = await refreshSessionToken(
    token,
    deviceHeadersFromRequest(req.headers)
  );
  if (outcome.kind === "unavailable") return { token };

  const nextToken = outcome.kind === "refreshed" ? outcome.token : null;
  return {
    token: nextToken,
    cookieUpdate: await prepareSessionCookieUpdate(req, nextToken),
  };
}

function gate(
  req: NextRequest,
  token: JWT | null,
  next: () => NextResponse
): NextResponse {
  const { pathname } = req.nextUrl;

  const isAuth = isAuthRoute(pathname);
  const isOnboarding = isOnboardingRoute(pathname);
  const isPublicOrError = isPublicOrErrorRoute(pathname);
  // Landing page-ul ("/") — tratat separat de AUTH_ROUTES, nu inclus în el:
  // dacă l-am pune acolo, un user validat care ajunge pe "/" ar lua
  // ramura "isAuth || isOnboarding → redirect spre /" de mai jos și s-ar
  // redirecționa către el însuși (buclă). Landing-ul trebuie vizibil doar
  // pentru vizitatorii nelogați — un user logat nu mai are ce căuta pe el.
  const isHome = pathname === "/";

  /**
   * 1. User nelogat
   */
  if (!token) {
    if (isAuth || isHome) {
      return next();
    }

    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  /**
   * 2. Excepție pentru pagini publice/eroare (ex: /unauthorized)
   * Dacă userul e logat, îi permitem să vadă aceste pagini indiferent de starea onboarding-ului
   */
  if (isPublicOrError) {
    return next();
  }

  /**
   * 3. User logat, dar onboarding nefinalizat (is_validated === false)
   */
  if (token.is_validated === false) {
    if (isOnboarding) {
      return next();
    }
    // Redirect către onboarding (asigură-te că app/onboarding/page.tsx sau sub-rutele există)
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  /**
   * 4. User logat și validat (is_validated === true)
   * Landing page-ul nu mai are sens pentru el — îl trimitem direct spre
   * /feed, la fel ca și când ar reveni pe o pagină de auth/onboarding.
   */
  if (token.is_validated === true) {
    if (isAuth || isOnboarding || isHome) {
      return NextResponse.redirect(new URL("/feed", req.url));
    }
    return next();
  }

  if (!isOnboarding && !isPublicOrError) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return next();
}

export default async function middleware(req: NextRequest) {
  const { token, cookieUpdate } = await resolveSession(req);
  const next = () => NextResponse.next({ request: { headers: req.headers } });

  const response = isGatedRoute(req.nextUrl.pathname)
    ? gate(req, token, next)
    : next();

  if (cookieUpdate) applySessionCookieUpdate(response, cookieUpdate);
  return response;
}

export const config = {
  runtime: "nodejs",
  // Toate paginile și proxy-ul /api/protected, ca refresh-ul să rescrie cookie-ul înainte de orice getServerSession.
  matcher: ["/((?!_next/static|_next/image|api/auth|.*\\..*).*)"],
};
