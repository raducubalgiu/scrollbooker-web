"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { usePathname } from "next/navigation";
import AdminLayout from "./Admin/AdminLayout";
import MarketplaceLayout from "./Marketplace/MarketplaceLayout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const pathname = usePathname() || "";

  if (status === "loading") return null;

  const adminPrefixes = [
    "/admin",
    "/calendar",
    "/my-business",
    "/appointments",
    "/businesses",
    "/nomenclatures",
    "/settings",
    "/notifications",
    "/onboarding",
  ];

  const isAdminArea = adminPrefixes.some((p) => pathname.startsWith(p));
  const isLoginPage = pathname === "/api/auth/signin";

  if (isAdminArea) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <MarketplaceLayout>{children}</MarketplaceLayout>;
}
