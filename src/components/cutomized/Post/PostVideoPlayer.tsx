import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  Box,
  Typography,
  Skeleton,
  Fade,
  Slider,
  CircularProgress,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import Hls from "hls.js";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PostOverlay from "./PostOverlay";
import { Post } from "@/ts/models/social/Post";
import {
  PostActionCallbacks,
  PostActionLoaders,
} from "./actions/postActionTypes";

type PostVideoPlayerProps = {
  post: Post | null;
  loaders: PostActionLoaders;
  callbacks: PostActionCallbacks;
  src: string;
  isActive: boolean;
  isLoading?: boolean;
  preload?: "none" | "metadata" | "auto";
  resetOnInactive?: boolean;
  onOpenLinkedProducts: () => void;
};

const getSliderValue = (value: number | number[]): number => {
  if (Array.isArray(value)) return value[0] ?? 0;
  return value;
};

export const PostVideoPlayer = React.memo(function PostVideoPlayer({
  post,
  loaders,
  callbacks,
  src,
  isActive,
  isLoading = false,
  preload = "metadata",
  resetOnInactive = true,
  onOpenLinkedProducts,
}: PostVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const wasPlayingBeforeSeekRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  // Starea React este izolată doar pentru când utilizatorul face seek manual
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
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
    wasPlayingBeforeSeekRef.current = false;
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

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isActive || !isReady || hasError || !hasValidSource) return;
    try {
      await video.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setIsPlaying(false);
      if (
        !(error instanceof DOMException && error.name === "NotAllowedError")
      ) {
        console.error("Unexpected play() error:", error);
      }
    }
  }, [hasError, hasValidSource, isActive, isReady]);

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

    // 🚀 FAILSAFE ADĂUGAT: Dacă browserul zice că poate rula clipul complet, forțăm starea isReady
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
    video.addEventListener("canplaythrough", onCanPlayThrough); // ✅ Adăugat
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

  // useEffect-ul existent rămâne pentru logica efectivă de play/pause:
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasValidSource || hasError) return;

    if (isActive) {
      if (isReady) void tryPlay();
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
    isReady,
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
      } else if (isActive && isReady && !hasError) {
        void tryPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [hasError, isActive, isReady, tryPlay]);

  // OPTIMIZARE: TimeUpdate direct în DOM prin variabilă CSS (0 re-renders în timpul rulării)
  const handleTimeUpdateNativ = useCallback(() => {
    const video = videoRef.current;
    if (!video || isSeeking) return;

    const current = video.currentTime;
    const dur = video.duration || 1;
    const ratio = Math.min(current / dur, 1);

    // Injectăm progresul direct în CSS
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--video-progress-ratio",
        `${ratio}`
      );
    }

    // Actualizăm valoarea discret pentru cazul în care utilizatorul vrea să facă drag subit
    setSliderProgress(current);
  }, [isSeeking]);

  const handleRetry = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !hasValidSource) return;

    setHasError(false);
    setIsReady(false);
    setIsBuffering(true);
    setIsEnded(false);
    setSliderProgress(0);
    if (containerRef.current) {
      containerRef.current.style.setProperty("--video-progress-ratio", "0");
    }

    destroyHlsInstance();

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      });
      hlsRef.current = hls;
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(src));
      hls.on(Hls.Events.MANIFEST_PARSED, () => updateDuration());
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
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
      setSliderProgress(nextValue);

      const dur = duration || 1;
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--video-progress-ratio",
          `${nextValue / dur}`
        );
      }
    },
    [isSeeking, duration]
  );

  const handleSeekCommit = useCallback(
    async (_: Event | React.SyntheticEvent, value: number | number[]) => {
      const video = videoRef.current;
      if (!video || hasError) return;

      const nextValue = getSliderValue(value);
      const shouldResume = wasPlayingBeforeSeekRef.current;

      video.currentTime = nextValue;
      setSliderProgress(nextValue);
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

  const formatVideoTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const volumeButtonIcon = isMuted ? (
    <VolumeOffRoundedIcon
      sx={{ color: "#fff", fontSize: { xs: "1.5rem", sm: "2.1875rem" } }}
    />
  ) : (
    <VolumeUpRoundedIcon
      sx={{ color: "#fff", fontSize: { xs: "1.5rem", sm: "2.1875rem" } }}
    />
  );

  const showPausedOverlay =
    isActive && !hasError && !isBuffering && !isPlaying && isReady && !isEnded;
  const showReplayOverlay =
    isActive && !hasError && !isBuffering && !isPlaying && isEnded && isReady;

  if (isLoading) {
    return (
      <Box sx={styles.skeletonContainer}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }
  return (
    <Box
      ref={containerRef}
      sx={styles.root}
      onClick={(e) => {
        e.stopPropagation();
        handleTogglePlay();
      }}
      className={isSeeking || isHovered ? "is-interacting" : ""}
    >
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
        onTimeUpdate={handleTimeUpdateNativ}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => {
          if (!isSeeking) setIsBuffering(true);
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
        ) : isBuffering && !isSeeking ? (
          <CircularProgress size={42} sx={{ color: "#fff" }} />
        ) : showReplayOverlay ? (
          <Box
            sx={styles.stateCard}
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
            style={{ cursor: "pointer" }}
          >
            <ReplayRoundedIcon sx={styles.stateIcon} />
            <Typography sx={styles.stateTitle}>Revedeți acest clip</Typography>
          </Box>
        ) : null}
      </Box>

      <Fade in={showPausedOverlay} timeout={{ enter: 150, exit: 0 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          <PlayArrowRoundedIcon sx={styles.centerIcon} />
        </Box>
      </Fade>

      <Box sx={styles.volumeButton} onClick={handleToggleMute}>
        {volumeButtonIcon}
      </Box>

      <Fade in={!isSeeking && !isLoading} timeout={200}>
        <div>
          <PostOverlay
            actions={{
              user: post?.user ?? null,
              userActions: post?.user_actions ?? null,
              counters: post?.counters ?? null,
              isOwnPost: post?.is_own_post ?? false,
              loaders,
              callbacks,
            }}
            description={post?.description ?? null}
            onOpenLinkedProducts={onOpenLinkedProducts}
          />
        </div>
      </Fade>

      <Fade in={isSeeking} timeout={150}>
        <Typography variant="body1" sx={styles.seekTimeIndicator}>
          {formatVideoTime(sliderProgress)} / {formatVideoTime(duration)}
        </Typography>
      </Fade>

      <Box
        sx={styles.progressWrapper}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={styles.progressTrack} />
        <Box sx={styles.progressFill} />

        <Slider
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(sliderProgress, duration || 0)}
          onChange={handleSeekChange}
          onChangeCommitted={handleSeekCommit}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          sx={styles.slider}
        />
      </Box>
    </Box>
  );
});

const videoStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  backgroundColor: "black",
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: "black",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    "&:focus": { outline: "none" },
    "--video-progress-ratio": 0,
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
    fontSize: { xs: 100, md: 120, xl: 150 },
    color: "#fff",
    opacity: 0.65,
  },
  stateCard: {
    minWidth: 110,
    maxWidth: 260,
    px: 2.5,
    py: 2.5,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.25,
    pointerEvents: "auto",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)",
  },
  stateIcon: { fontSize: 42, color: "#fff", opacity: 0.95 },
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
    "&:hover": { backgroundColor: "rgba(255,255,255,0.22)" },
  },
  volumeButton: {
    position: "absolute",
    right: { xs: 8, lg: 16 },
    top: { xs: 8, lg: 16 },
    zIndex: 25,
    width: { xs: 50, lg: 60 },
    height: { xs: 50, lg: 60 },
    borderRadius: "50%",
    display: { xs: "none", lg: "flex" },
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.18)",
    backdropFilter: "blur(6px)",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.28)" },
  },
  seekTimeIndicator: {
    position: "absolute",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 90,
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
    letterSpacing: "0.03em",
    backgroundColor: "rgba(0,0,0,0.6)",
    px: 2,
    py: 0.75,
    borderRadius: 2,
    backdropFilter: "blur(4px)",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  progressWrapper: {
    position: "absolute",
    left: (theme: Theme) => theme.spacing(1.5),
    right: (theme: Theme) => theme.spacing(1.5),
    bottom: 0,
    height: 25,
    zIndex: 99,
    display: "flex",
    alignItems: "flex-end",
    cursor: "pointer",
  },
  progressTrack: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    transformOrigin: "bottom",
    transition: "transform 120ms ease-in-out",
    ".is-interacting &": {
      transform: "scaleY(2)",
    },
  },
  progressFill: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    borderRadius: 0,
    backgroundColor: { xs: "rgba(255, 255, 255, 0.22)", md: "primary.main" },
    transformOrigin: "left bottom",
    transform: "scaleX(var(--video-progress-ratio))",
    transition: "transform 80ms linear",
    ".is-interacting &": {
      transform: "scaleX(var(--video-progress-ratio)) scaleY(2)",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
    },
  },
  slider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    py: 1.5,
    height: 4,
    color: "primary.main",
    "& .MuiSlider-rail, & .MuiSlider-track": { opacity: 0, border: "none" },
    "& .MuiSlider-thumb": {
      opacity: 0,
      width: 0,
      height: 0,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      borderRadius: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
      transition: "opacity 120ms ease, width 120ms ease, height 120ms ease",
      ".is-interacting &": {
        opacity: 1,
        width: { xs: 12, md: 8 },
        height: { xs: 12, md: 10 },
      },
      "&:hover, &.Mui-focusVisible, &.Mui-active": {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
      },
    },
  },
} as const;
