import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/auth/signin", "/auth/register"];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route);
}

function isOnboardingRoute(pathname: string) {
  return pathname.startsWith("/onboarding");
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const isAuth = isAuthRoute(pathname);
    const isOnboarding = isOnboardingRoute(pathname);

    /**
     * 1. User nelogat
     * Poate accesa doar /auth/signin și /auth/register
     */
    if (!token) {
      if (isAuth) {
        return NextResponse.next();
      }

      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

      return NextResponse.redirect(signInUrl);
    }

    /**
     * 2. User logat, dar onboarding nefinalizat
     * Poate accesa doar /onboarding
     */
    if (token.is_validated === false) {
      if (isOnboarding) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    /**
     * 3. User logat și validat
     * Poate accesa orice, exceptând /auth și /onboarding
     */
    if (token.is_validated === true) {
      if (isAuth || isOnboarding) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    /**
     * fallback safe:
     * dacă token există, dar is_validated e null/undefined,
     * tratează userul ca nevalidat
     */
    if (!isOnboarding) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/onboarding/:path*",
    "/notifications/:path*",
    "/admin/:path*",
    "/my-business/:path*",
    "/appointments/:path*",
    "/businesses/:path*",
    "/nomenclatures/:path*",
  ],
};
