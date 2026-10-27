import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLatestRef } from "@/hooks/useLatestRef";

const MAX_RESUME_RETRIES = 5;
const RESUME_RETRY_DELAY_MS = 200;

export const getSliderValue = (value: number | number[]): number => {
  if (Array.isArray(value)) return value[0] ?? 0;
  return value;
};

type HlsSetupCallbacks = {
  updateDuration: () => void;
  setIsBuffering: (value: boolean) => void;
  setHasError: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
  setIsReady: (value: boolean) => void;
  destroyHlsInstance: () => void;
};

function attachHlsSource(
  video: HTMLVideoElement,
  src: string,
  preload: "none" | "metadata" | "auto",
  hlsRef: React.RefObject<Hls | null>,
  {
    updateDuration,
    setIsBuffering,
    setHasError,
    setIsPlaying,
    setIsReady,
    destroyHlsInstance,
  }: HlsSetupCallbacks
): boolean {
  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30,
    });
    hlsRef.current = hls;
    setIsBuffering(preload !== "none");
    hls.attachMedia(video);

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(src);
      if (preload === "none") hls.stopLoad();
    });
    hls.on(Hls.Events.MANIFEST_PARSED, () => updateDuration());
    hls.on(Hls.Events.LEVEL_LOADED, () => setHasError(false));
    hls.on(Hls.Events.ERROR, (_, data) => {
      if (!data.fatal) return;
      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
        setIsBuffering(true);
        hls.startLoad();
      } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
        hls.recoverMediaError();
      } else {
        setHasError(true);
        setIsBuffering(false);
        setIsPlaying(false);
        setIsReady(false);
        destroyHlsInstance();
      }
    });
    return true;
  }

  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    setIsBuffering(preload !== "none");
    video.preload = preload;
    video.src = src;
    video.load();
    return true;
  }

  return false;
}

export type UseVideoPlaybackParams = {
  src: string;
  isActive: boolean;
  preload: "none" | "metadata" | "auto";
  resetOnInactive: boolean;
};

export function useVideoPlayback({
  src,
  isActive,
  preload,
  resetOnInactive,
}: UseVideoPlaybackParams) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const wasPlayingBeforeSeekRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  // isBuffering e intenționat separat de isPlaying/isReady, nu fuzionat
  // într-un singur status — un video poate fi "playing" ȚI "buffering"
  // simultan (blocare temporară la lipsă de date, fără evenimentul
  // `pause`), iar UI-ul trebuie să arate spinner-ul peste orice altceva
  // în acel caz. Un enum plat ar pierde exact distincția asta.
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isSeekingRef = useRef(false);
  const sliderProgressRef = useRef(0);
  const isActiveRef = useLatestRef(isActive);
  const userPausedRef = useRef(false);
  const resumeRetryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const resumeRetryCountRef = useRef(0);

  const hasValidSource = Boolean(src?.trim());

  const destroyHlsInstance = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  }, []);

  const resetUiState = useCallback(() => {
    wasPlayingBeforeSeekRef.current = false;
    isSeekingRef.current = false;
    sliderProgressRef.current = 0;
    setIsReady(false);
    setIsPlaying(false);
    setIsEnded(false);
    setDuration(0);
    setSliderProgress(0);
    setIsSeeking(false);
    setIsBuffering(false);
    setHasError(false);
    if (containerRef.current) {
      containerRef.current.style.setProperty("--video-progress-ratio", "0");
    }
  }, []);

  const resetPlaybackState = useCallback(() => {
    wasPlayingBeforeSeekRef.current = false;
    isSeekingRef.current = false;
    sliderProgressRef.current = 0;
    setSliderProgress(0);
    setIsSeeking(false);
    setIsEnded(false);
    setIsPlaying(false);
    setIsBuffering(false);
    if (containerRef.current) {
      containerRef.current.style.setProperty("--video-progress-ratio", "0");
    }
  }, []);

  const updateDuration = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextDuration = video.duration;
    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration(nextDuration);
    }
  }, []);

  const clearVideoSource = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
  }, []);

  const tryPlayRef = useRef<() => Promise<void>>(async () => {});

  const scheduleResumeRetry = useCallback(() => {
    if (resumeRetryTimeoutRef.current) {
      clearTimeout(resumeRetryTimeoutRef.current);
      resumeRetryTimeoutRef.current = null;
    }
    if (
      !isActiveRef.current ||
      userPausedRef.current ||
      document.hidden ||
      resumeRetryCountRef.current >= MAX_RESUME_RETRIES
    ) {
      return;
    }
    resumeRetryCountRef.current += 1;
    resumeRetryTimeoutRef.current = setTimeout(() => {
      resumeRetryTimeoutRef.current = null;
      const current = videoRef.current;
      if (
        !current ||
        current.ended ||
        !current.paused ||
        !isActiveRef.current ||
        userPausedRef.current ||
        document.hidden
      ) {
        return;
      }
      void tryPlayRef.current();
    }, RESUME_RETRY_DELAY_MS);
  }, [isActiveRef]);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isActive || hasError || !hasValidSource) return;
    try {
      await video.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        scheduleResumeRetry();
        return;
      }
      setIsPlaying(false);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        return;
      }
      console.error("Unexpected play() error:", error);
    }
  }, [hasError, hasValidSource, isActive, scheduleResumeRetry]);

  useEffect(() => {
    tryPlayRef.current = tryPlay;
  }, [tryPlay]);

  const handleTimeUpdateNativ = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const dur = video.duration || 1;
    const ratio = Math.min(current / dur, 1);

    sliderProgressRef.current = current;

    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--video-progress-ratio",
        `${ratio}`
      );
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
      setIsPlaying(false);
      scheduleResumeRetry();
    };
    const onWaiting = () => {
      if (!isSeekingRef.current) setIsBuffering(true);
    };
    const onPlaying = () => {
      setIsPlaying(true);
      setIsBuffering(false);
      setIsReady(true);
      setHasError(false);
      resumeRetryCountRef.current = 0;
    };
    const onSeeking = () => setIsBuffering(true);
    const onSeeked = () => setIsBuffering(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("timeupdate", handleTimeUpdateNativ);

    return () => {
      if (resumeRetryTimeoutRef.current) {
        clearTimeout(resumeRetryTimeoutRef.current);
        resumeRetryTimeoutRef.current = null;
      }
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("timeupdate", handleTimeUpdateNativ);
    };
  }, [handleTimeUpdateNativ, scheduleResumeRetry]);

  // HLS & Init Effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    destroyHlsInstance();
    resetUiState();

    if (!hasValidSource) {
      clearVideoSource();
      setHasError(true);
      return;
    }

    const onLoadedMetadata = () => updateDuration();
    const onLoadedData = () => {
      updateDuration();
      setIsReady(true);
      setHasError(false);
    };
    const onCanPlay = () => {
      setIsReady(true);
      setIsBuffering(false);
    };
    const onCanPlayThrough = () => {
      setIsReady(true);
      setIsBuffering(false);
    };
    const onEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
      setIsBuffering(false);
    };
    const onError = () => {
      setHasError(true);
      setIsBuffering(false);
      setIsPlaying(false);
      setIsReady(false);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    const attached = attachHlsSource(video, src, preload, hlsRef, {
      updateDuration,
      setIsBuffering,
      setHasError,
      setIsPlaying,
      setIsReady,
      destroyHlsInstance,
    });

    if (!attached) {
      setHasError(true);
      setIsBuffering(false);
      setIsReady(false);
    }

    return () => {
      video.pause();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      destroyHlsInstance();
      clearVideoSource();
    };
  }, [
    src,
    preload,
    hasValidSource,
    destroyHlsInstance,
    resetUiState,
    updateDuration,
    clearVideoSource,
  ]);

  // Play/Pause effect
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasValidSource || hasError) return;

    if (isActive) {
      userPausedRef.current = false;
      resumeRetryCountRef.current = 0;
      void tryPlay();
      return;
    }

    video.pause();
    if (resetOnInactive) {
      if (video.readyState > 0 && Number.isFinite(video.duration)) {
        video.currentTime = 0;
      }
      resetPlaybackState();
    }
  }, [
    hasError,
    hasValidSource,
    isActive,
    resetOnInactive,
    resetPlaybackState,
    tryPlay,
  ]);

  // Visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else if (isActive && !hasError && !userPausedRef.current) {
        void tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [hasError, isActive, tryPlay]);

  const handleRetry = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !hasValidSource) return;

    setHasError(false);
    setIsReady(false);
    setIsBuffering(true);
    setIsEnded(false);
    sliderProgressRef.current = 0;
    setSliderProgress(0);
    if (containerRef.current) {
      containerRef.current.style.setProperty("--video-progress-ratio", "0");
    }

    destroyHlsInstance();

    const attached = attachHlsSource(video, src, preload, hlsRef, {
      updateDuration,
      setIsBuffering,
      setHasError,
      setIsPlaying,
      setIsReady,
      destroyHlsInstance,
    });

    if (!attached) {
      setHasError(true);
      setIsBuffering(false);
    }
  }, [destroyHlsInstance, hasValidSource, preload, src, updateDuration]);

  const handleTogglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isReady || hasError || !hasValidSource) return;

    if (isEnded || video.ended) {
      userPausedRef.current = false;
      video.currentTime = 0;
      setIsEnded(false);
      setIsBuffering(true);
      try {
        await video.play();
      } catch {
        return;
      }
      return;
    }

    if (video.paused) {
      userPausedRef.current = false;
      setIsBuffering(true);
      try {
        await video.play();
      } catch {
        setIsBuffering(false);
        return;
      }
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }, [hasError, hasValidSource, isEnded, isReady]);

  const handleToggleMute = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  const handleSeekChange = useCallback(
    (_: Event, value: number | number[]) => {
      const video = videoRef.current;
      const nextValue = getSliderValue(value);

      if (!isSeekingRef.current && video) {
        wasPlayingBeforeSeekRef.current = !video.paused;
        setSliderProgress(sliderProgressRef.current);
      }

      isSeekingRef.current = true;
      setIsSeeking(true);
      setSliderProgress(nextValue);

      const dur = duration || 1;
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--video-progress-ratio",
          `${nextValue / dur}`
        );
      }
    },
    [duration]
  );

  const handleSeekCommit = useCallback(
    async (_: Event | React.SyntheticEvent, value: number | number[]) => {
      const video = videoRef.current;
      if (!video || hasError) return;

      const nextValue = getSliderValue(value);
      const shouldResume = wasPlayingBeforeSeekRef.current;

      video.currentTime = nextValue;
      sliderProgressRef.current = nextValue;
      setSliderProgress(nextValue);
      isSeekingRef.current = false;
      setIsSeeking(false);
      setIsEnded(false);
      setIsBuffering(true);

      if (shouldResume && isActive) {
        await video.play().catch(() => {
          setIsBuffering(false);
        });
      } else {
        setIsBuffering(false);
      }

      wasPlayingBeforeSeekRef.current = false;
    },
    [hasError, isActive]
  );

  return {
    containerRef,
    videoRef,
    isReady,
    isPlaying,
    isMuted,
    duration,
    sliderProgress,
    isSeeking,
    isEnded,
    isBuffering,
    hasError,
    handleTogglePlay,
    handleToggleMute,
    handleSeekChange,
    handleSeekCommit,
    handleRetry,
  };
}
