import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/auth/signin",
  "/auth/register-business",
  "/auth/get-started",
];
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
     * Landing page-ul nu mai are sens pentru el — îl trimitem direct spre
     * /feed, la fel ca și când ar reveni pe o pagină de auth/onboarding.
     */
    if (token.is_validated === true) {
      if (isAuth || isOnboarding || isHome) {
        return NextResponse.redirect(new URL("/feed", req.url));
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
    "/feed/:path*",
    "/search/:path*",
    "/search-users/:path*",
    "/notifications/:path*",
    "/appointments/:path*",
    "/booking/:path*",
    "/business/:path*",
    "/employment-request/:path*",
    "/upload-video/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/settings/:path*",
  ],
};
