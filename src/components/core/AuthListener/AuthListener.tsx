"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthListener() {
  const { status } = useSession();
  const prev = useRef<typeof status | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (prev.current === "authenticated" && status === "unauthenticated") {
      if (
        !pathname.startsWith("/api/auth") &&
        pathname !== "/api/auth/signin"
      ) {
        router.push("/api/auth/signin");
      }
    }
    prev.current = status;
  }, [status, router, pathname]);

  return null;
}
