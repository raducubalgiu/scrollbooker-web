"use client";

import { useRouter } from "next/navigation";
import { AppRoutes } from "@/utils/routes";

export const useAppNavigation = () => {
  const router = useRouter();

  const navigateTo = (
    routeUrl: string,
    options?: { replace?: boolean; scroll?: boolean }
  ) => {
    if (options?.replace) {
      router.replace(routeUrl, { scroll: options.scroll ?? false });
    } else {
      router.push(routeUrl, { scroll: options?.scroll ?? false });
    }
  };

  const goBack = (fallbackUrl: string = AppRoutes.feed()) => {
    if (typeof window !== "undefined" && window.history.length <= 1) {
      router.replace(fallbackUrl);
      return;
    }
    router.back();
  };

  return { navigateTo, goBack };
};
