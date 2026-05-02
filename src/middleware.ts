import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/auth/signin", "/auth/register"];
const PUBLIC_ERROR_ROUTES = ["/unauthorized", "/not-found", "/_not-found"];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route);
}

function isOnboardingRoute(pathname: string) {
  return pathname.startsWith("/onboarding");
}

function isPublicOrErrorRoute(pathname: string) {
  return PUBLIC_ERROR_ROUTES.includes(pathname);
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const isAuth = isAuthRoute(pathname);
    const isOnboarding = isOnboardingRoute(pathname);
    const isPublicOrError = isPublicOrErrorRoute(pathname);

    /**
     * 1. User nelogat
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
     * 2. Excepție pentru pagini publice/eroare (ex: /unauthorized)
     * Dacă userul e logat, îi permitem să vadă aceste pagini indiferent de starea onboarding-ului
     */
    if (isPublicOrError) {
      return NextResponse.next();
    }

    /**
     * 3. User logat, dar onboarding nefinalizat (is_validated === false)
     */
    if (token.is_validated === false) {
      if (isOnboarding) {
        return NextResponse.next();
      }
      // Redirect către onboarding (asigură-te că app/onboarding/page.tsx sau sub-rutele există)
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    /**
     * 4. User logat și validat (is_validated === true)
     */
    if (token.is_validated === true) {
      if (isAuth || isOnboarding) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    if (!isOnboarding && !isPublicOrError) {
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
    "/unauthorized",
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
