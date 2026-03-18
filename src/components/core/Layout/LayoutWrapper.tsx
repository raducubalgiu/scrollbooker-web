"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { usePathname } from "next/navigation";
import AdminLayout from "./Admin/AdminLayout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
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

  if (isAdminArea) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <>{children}</>;
}
