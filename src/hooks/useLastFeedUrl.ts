"use client";

import { useEffect, useState } from "react";
import { AppRoutes } from "@/utils/routes";
import { getLastFeedUrl } from "@/components/modules/Marketplace/FeedModule/feedUrlState";

// Doar pentru href-ul static/fallback (prefetch, deschidere în tab nou,
// randare înainte de hidratare) — nu e sursa de adevăr la click. Începe ca
// /feed simplu (identic cu SSR-ul, fără mismatch de hidratare), apoi se
// actualizează o dată, la mount. Navigarea reală (onClick) citește mereu
// live, via getLastFeedUrl(), nu acest hook — vezi feedUrlState.ts.
export function useLastFeedUrl(): string {
  const [url, setUrl] = useState<string>(AppRoutes.feed());

  useEffect(() => {
    setUrl(getLastFeedUrl());
  }, []);

  return url;
}
