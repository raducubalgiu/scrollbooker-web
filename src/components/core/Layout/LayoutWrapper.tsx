"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { usePathname } from "next/navigation";
import AdminLayout from "./Admin/AdminLayout";
import MarketplaceLayout from "./Marketplace/MarketplaceLayout";

const ADMIN_PREFIXES = ["/admin"];

type LayoutWrapperProps = { children: React.ReactNode };

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { status } = useSession();
  const pathname = usePathname() || "";

  const isAdminArea = React.useMemo(
    () => ADMIN_PREFIXES.some((p) => pathname.startsWith(p)),
    [pathname]
  );

  const isLoginPage = React.useMemo(
    () => pathname === "/api/auth/signin",
    [pathname]
  );

  const LayoutComp = React.useMemo(
    () => (isAdminArea ? AdminLayout : MarketplaceLayout),
    [isAdminArea]
  );

  if (status === "loading") return null;

  if (isAdminArea) {
    return <LayoutComp>{children}</LayoutComp>;
  }
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <LayoutComp>{children}</LayoutComp>;
}
