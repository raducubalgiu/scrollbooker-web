"use client";

import { useEffect, useState } from "react";
import { AppRoutes } from "@/utils/routes";
import { LAST_FEED_URL_STORAGE_KEY } from "@/components/modules/Marketplace/FeedModule/feedUrlState";

// Starts as the plain /feed route (matches SSR output, no hydration mismatch),
// then upgrades to whatever feed position the user last left, once mounted.
export function useLastFeedUrl(): string {
  const [url, setUrl] = useState<string>(AppRoutes.feed());

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(LAST_FEED_URL_STORAGE_KEY);
      if (stored) setUrl(stored);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — keep the default.
    }
  }, []);

  return url;
}
