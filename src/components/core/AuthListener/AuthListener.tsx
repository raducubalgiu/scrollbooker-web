"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AppRoutes, useAppNavigation } from "@/utils/routes";

export default function AuthListener() {
  const { navigateTo } = useAppNavigation();
  const { status } = useSession();
  const prev = useRef<typeof status | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prev.current === "authenticated" && status === "unauthenticated") {
      const isAuthRoute =
        pathname.startsWith("/api/auth") || pathname.startsWith("/auth");

      if (!isAuthRoute) {
        navigateTo(AppRoutes.login(), { replace: true });
      }
    }

    prev.current = status;
  }, [status, navigateTo, pathname]);

  return null;
}
