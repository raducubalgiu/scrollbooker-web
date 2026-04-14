import { useEffect, useRef } from "react";

type UseVideoNeighborsPreloadParams = {
  prevSrc?: string;
  nextSrc?: string;
};

export function useVideoNeighborsPreload({
  prevSrc,
  nextSrc,
}: UseVideoNeighborsPreloadParams) {
  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sources = [prevSrc, nextSrc].filter(Boolean) as string[];

    sources.forEach((src) => {
      if (preloadedRef.current.has(src)) return;

      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = src;
      video.muted = true;
      video.playsInline = true;

      preloadedRef.current.add(src);
    });
  }, [prevSrc, nextSrc]);
}
