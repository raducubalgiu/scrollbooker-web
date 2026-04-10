export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/notifications",
    "/admin/:path*",
    "/my-business/:path*",
    "/appointments/:path*",
    "/businesses/:path*",
    "/nomenclatures/:path*",
    "/api/my-business/:path*",
    "/api/appointments/:path*",
    "/api/businesses/:path*",
  ],
};
