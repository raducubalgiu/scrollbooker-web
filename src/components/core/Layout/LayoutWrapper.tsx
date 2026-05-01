"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Layout from "./Layout";

type LayoutWrapperProps = { children: React.ReactNode };

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname() || "";

  const isNoLayoutPage = React.useMemo(() => {
    return (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/onboarding") ||
      pathname === "/not-found" ||
      pathname === "unathorized"
    );
  }, [pathname]);

  if (isNoLayoutPage) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
}
