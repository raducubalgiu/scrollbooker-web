"use client";

import React, { useRef } from "react";
import { LinearProgress, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopLoadingBar() {
  const { status: sessionStatus } = useSession();
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (prevPathname.current === null) {
      prevPathname.current = pathname ?? null;
      return;
    }

    if (prevPathname.current !== pathname) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      prevPathname.current = pathname;

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  if (!mounted) return null;

  const isSessionLoading = sessionStatus === "loading";

  const shouldShow = loading || isSessionLoading;

  if (!shouldShow) return null;

  return (
    <Box
      sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1301 }}
    >
      <LinearProgress />
    </Box>
  );
}
