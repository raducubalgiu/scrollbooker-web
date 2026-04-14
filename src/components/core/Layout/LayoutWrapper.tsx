"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Layout from "./Layout";

type LayoutWrapperProps = { children: React.ReactNode };

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname() || "";

  const isLoginPage = React.useMemo(
    () => pathname === "/api/auth/signin",
    [pathname]
  );

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
}
