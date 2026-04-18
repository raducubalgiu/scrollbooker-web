import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  CircularProgress,
  Skeleton,
  Slider,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { alpha, Theme } from "@mui/material/styles";
import Hls from "hls.js";
import PostOverlay from "./PostOverlay";
import { PostUser } from "@/ts/models/social/Post";

type PostVideoPlayerProps = {
  isLoading?: boolean;
  src: string;
  isActive: boolean;
  user: PostUser | null;
  description: string | null;
  isVideoReview: boolean;
  preload?: "none" | "metadata" | "auto";
  resetOnInactive?: boolean;
};

const PROGRESS_EPSILON = 0.1;

const getSliderValue = (value: number | number[]): number => {
  if (Array.isArray(value)) {
    return value[0] ?? 0;
  }

  return value;
};

export const PostVideoPlayer = React.memo(function PostVideoPlayer({
  src,
  isActive,
  isLoading = false,
  user,
  description,
  isVideoReview,
  preload = "metadata",
  resetOnInactive = true,
}: PostVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const lastProgressRef = useRef(0);
  const wasPlayingBeforeSeekRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [seekValue, setSeekValue] = useState<number | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  const hasValidSource = Boolean(src?.trim());

  const destroyHlsInstance = useCallback(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  }, []);

  const resetUiState = useCallback(() => {
    lastProgressRef.current = 0;
    wasPlayingBeforeSeekRef.current = false;
    setIsReady(false);
    setIsPlaying(false);
    setIsEnded(false);
    setProgress(0);
    setDuration(0);
    setSeekValue(null);
    setIsSeeking(false);
    setIsBuffering(false);
    setHasError(false);
  }, []);

  const resetPlaybackState = useCallback(() => {
    lastProgressRef.current = 0;
    wasPlayingBeforeSeekRef.current = false;
    setProgress(0);
    setSeekValue(null);
    setIsSeeking(false);
    setIsEnded(false);
    setIsPlaying(false);
    setIsBuffering(false);
  }, []);

  const updateDuration = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextDuration = video.duration;

    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration((prev) => (prev === nextDuration ? prev : nextDuration));
    }
  }, []);

  const clearVideoSource = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.removeAttribute("src");
    video.load();
  }, []);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isActive || !isReady || hasError || !hasValidSource) {
      return;
    }

    try {
      await video.play();
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        return;
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Unexpected play() error:", error);
    }
  }, [hasError, hasValidSource, isActive, isReady]);

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

    const onLoadedMetadata = () => {
      updateDuration();
    };

    const onLoadedData = () => {
      updateDuration();
      setIsReady(true);
      setHasError(false);
    };

    const onCanPlay = () => {
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
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

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

        if (preload === "none") {
          hls.stopLoad();
        }
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        updateDuration();
      });

      hls.on(Hls.Events.LEVEL_LOADED, () => {
        setHasError(false);
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) {
          return;
        }

        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR: {
            setIsBuffering(true);
            hls.startLoad();
            break;
          }

          case Hls.ErrorTypes.MEDIA_ERROR: {
            hls.recoverMediaError();
            break;
          }

          default: {
            setHasError(true);
            setIsBuffering(false);
            setIsPlaying(false);
            setIsReady(false);
            destroyHlsInstance();
            break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      setIsBuffering(preload !== "none");
      video.preload = preload;
      video.src = src;
      video.load();
    } else {
      setHasError(true);
      setIsBuffering(false);
      setIsReady(false);
    }

    return () => {
      video.pause();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onCanPlay);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasValidSource || hasError) {
      return;
    }

    if (isActive && isReady) {
      void tryPlay();
      return;
    }

    video.pause();

    if (resetOnInactive) {
      if (video.readyState > 0 && Number.isFinite(video.duration)) {
        video.currentTime = 0;
      }

      resetPlaybackState();
      return;
    }

    setIsPlaying(false);
    setIsBuffering(false);
    wasPlayingBeforeSeekRef.current = false;
  }, [
    hasError,
    hasValidSource,
    isActive,
    isReady,
    resetOnInactive,
    resetPlaybackState,
    tryPlay,
  ]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
        return;
      }

      if (isActive && isReady && !hasError) {
        void tryPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasError, isActive, isReady, tryPlay]);

  const handleRetry = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !hasValidSource) return;

    setHasError(false);
    setIsReady(false);
    setIsBuffering(true);
    setIsEnded(false);
    setProgress(0);
    setSeekValue(null);
    lastProgressRef.current = 0;

    destroyHlsInstance();

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      });

      hlsRef.current = hls;
      hls.attachMedia(video);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        updateDuration();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;

        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            setHasError(true);
            setIsBuffering(false);
            setIsPlaying(false);
            setIsReady(false);
            destroyHlsInstance();
            break;
        }
      });

      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.preload = preload;
      video.src = src;
      video.load();
      return;
    }

    setHasError(true);
    setIsBuffering(false);
  }, [destroyHlsInstance, hasValidSource, preload, src, updateDuration]);

  const handleTogglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isReady || hasError || !hasValidSource) return;

    if (isEnded || video.ended) {
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
      setIsBuffering(true);

      try {
        await video.play();
      } catch {
        setIsBuffering(false);
        return;
      }
    } else {
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

      if (!isSeeking && video) {
        wasPlayingBeforeSeekRef.current = !video.paused;
      }

      setIsSeeking(true);
      setSeekValue(nextValue);
    },
    [isSeeking]
  );

  const handleSeekCommit = useCallback(
    async (_: Event | React.SyntheticEvent, value: number | number[]) => {
      const video = videoRef.current;
      if (!video || hasError) return;

      const nextValue = getSliderValue(value);
      const shouldResume = wasPlayingBeforeSeekRef.current;

      video.currentTime = nextValue;
      lastProgressRef.current = nextValue;

      setProgress(nextValue);
      setSeekValue(null);
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

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || isSeeking) return;

    const currentTime = video.currentTime;

    if (Math.abs(currentTime - lastProgressRef.current) < PROGRESS_EPSILON) {
      return;
    }

    lastProgressRef.current = currentTime;
    setProgress(currentTime);
  }, [isSeeking]);

  const displayProgress = useMemo(() => {
    return isSeeking ? (seekValue ?? progress) : progress;
  }, [isSeeking, seekValue, progress]);

  const progressRatio = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(displayProgress / duration, 1);
  }, [duration, displayProgress]);

  const progressFillSx = useMemo(
    () => ({
      ...styles.progressFill,
      transform: `scaleX(${progressRatio})`,
      transformOrigin: "left center",
      transition: isSeeking ? "none" : "transform 80ms linear",
    }),
    [progressRatio, isSeeking]
  );

  const sliderSx = useMemo(
    () => ({
      ...styles.slider,
      opacity: isHovered || isSeeking ? 1 : 0,
      pointerEvents: isHovered || isSeeking ? "auto" : "none",
    }),
    [isHovered, isSeeking]
  );

  const volumeButtonIcon = isMuted ? (
    <VolumeOffRoundedIcon sx={{ color: "#fff" }} fontSize="large" />
  ) : (
    <VolumeUpRoundedIcon sx={{ color: "#fff" }} fontSize="large" />
  );

  const showPausedOverlay =
    !hasError && !isBuffering && !isPlaying && isReady && !isEnded;

  const showReplayOverlay =
    !hasError && !isBuffering && !isPlaying && isEnded && isReady;

  if (isLoading) {
    return (
      <Box sx={styles.skeletonContainer}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  return (
    <Box sx={styles.root} onClick={handleTogglePlay}>
      <video
        ref={videoRef}
        controls={false}
        playsInline
        muted={isMuted}
        preload={preload}
        loop={false}
        onLoadedMetadata={updateDuration}
        onLoadedData={updateDuration}
        onDurationChange={updateDuration}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => {
          if (!isSeeking) {
            setIsBuffering(true);
          }
        }}
        onPlaying={() => {
          setIsPlaying(true);
          setIsBuffering(false);
          setIsReady(true);
          setHasError(false);
        }}
        onCanPlay={() => {
          setIsReady(true);
          setIsBuffering(false);
        }}
        onSeeking={() => setIsBuffering(true)}
        onSeeked={() => setIsBuffering(false)}
        style={videoStyles}
      />

      <Box sx={styles.centerOverlay}>
        {hasError ? (
          <Box sx={styles.stateCard}>
            <ErrorOutlineRoundedIcon sx={styles.stateIcon} />
            <Typography sx={styles.stateTitle}>Video indisponibil</Typography>
            <Typography sx={styles.stateSubtitle}>
              Nu am putut reda acest video.
            </Typography>

            <Box
              sx={styles.stateActionButton}
              onClick={(event) => {
                event.stopPropagation();
                void handleRetry();
              }}
            >
              Reîncearcă
            </Box>
          </Box>
        ) : isBuffering ? (
          <Box sx={styles.stateCard}>
            <CircularProgress size={42} sx={{ color: "#fff" }} />
          </Box>
        ) : showReplayOverlay ? (
          <ReplayRoundedIcon sx={styles.centerIcon} />
        ) : showPausedOverlay ? (
          <PlayArrowRoundedIcon sx={styles.centerIcon} />
        ) : null}
      </Box>

      <Box sx={styles.volumeButton} onClick={handleToggleMute}>
        {volumeButtonIcon}
      </Box>

      <Box
        sx={styles.progressWrapper}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={styles.progressTrack} />
        <Box sx={progressFillSx} />

        <Slider
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(displayProgress, duration || 0)}
          onChange={handleSeekChange}
          onChangeCommitted={handleSeekCommit}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          sx={sliderSx}
        />
      </Box>

      {!isLoading && user && (
        <PostOverlay
          user={user}
          description={description ?? ""}
          isVideoReview={isVideoReview}
        />
      )}
    </Box>
  );
});

const videoStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 15,
  display: "block",
  backgroundColor: "black",
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "black",
  },
  skeletonContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: 3,
    overflow: "hidden",
  },
  centerOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: 6,
  },
  centerIcon: {
    fontSize: 150,
    color: "#fff",
    opacity: 0.65,
  },
  stateCard: {
    minWidth: 92,
    minHeight: 92,
    px: 2,
    py: 2,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    pointerEvents: "auto",
  },
  stateIcon: {
    fontSize: 42,
    color: "#fff",
    opacity: 0.95,
  },
  stateTitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 1.2,
    textAlign: "center",
  },
  stateSubtitle: {
    color: "rgba(255,255,255,0.82)",
    fontWeight: 400,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 1.35,
  },
  stateActionButton: {
    mt: 0.5,
    px: 1.5,
    py: 0.75,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.22)",
    },
  },
  volumeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 25,
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.18)",
    backdropFilter: "blur(6px)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.28)",
    },
  },
  progressWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 15,
    zIndex: 8,
    display: "flex",
    alignItems: "flex-end",
  },
  progressTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 7.5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  progressFill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 7.5,
    borderRadius: 999,
    backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.9),
  },
  slider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    py: 0,
    height: 7.5,
    color: "primary.main",
    transition: "opacity 120ms ease",
    "& .MuiSlider-rail": {
      opacity: 0,
    },
    "& .MuiSlider-track": {
      opacity: 0,
      border: "none",
    },
    "& .MuiSlider-thumb": {
      width: 10,
      height: 10,
      backgroundColor: "#fff",
      boxShadow: "0 1px 6px rgba(0,0,0,0.25)",
      transition: "transform 120ms ease",
      "&:hover, &.Mui-focusVisible, &.Mui-active": {
        boxShadow: "0 1px 8px rgba(0,0,0,0.3)",
      },
    },
  },
} as const;
