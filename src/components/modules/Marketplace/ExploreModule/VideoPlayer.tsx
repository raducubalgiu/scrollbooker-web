import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Skeleton, Slider } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { alpha, Theme } from "@mui/material/styles";
import Hls from "hls.js";

type VideoPlayerProps = {
  isLoading?: boolean;
  src: string;
  isActive: boolean;
};

const PROGRESS_EPSILON = 0.1;

const getSliderValue = (value: number | number[]): number => {
  if (Array.isArray(value)) {
    return value[0] ?? 0;
  }

  return value;
};

export const VideoPlayer = React.memo(function VideoPlayer({
  src,
  isActive,
  isLoading = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const lastProgressRef = useRef(0);
  const wasPlayingBeforeSeekRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [seekValue, setSeekValue] = useState<number | null>(null);

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
  }, []);

  const updateDuration = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextDuration = video.duration;

    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration((prev) => (prev === nextDuration ? prev : nextDuration));
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    resetUiState();

    const onLoadedMetadata = () => {
      updateDuration();
      setIsReady(true);
    };

    const onEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);

    if (Hls.isSupported()) {
      destroyHlsInstance();

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
        setIsReady(true);
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
            destroyHlsInstance();
            break;
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      destroyHlsInstance();
      video.src = src;
      video.load();
    }

    return () => {
      video.pause();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
      destroyHlsInstance();

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [src, destroyHlsInstance, resetUiState, updateDuration]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !isReady) return;

    if (isActive) {
      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          return;
        }

        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Unexpected play() error:", error);
      });
    } else {
      video.pause();

      if (video.readyState > 0 && Number.isFinite(video.duration)) {
        video.currentTime = 0;
      }

      lastProgressRef.current = 0;
      wasPlayingBeforeSeekRef.current = false;
      setProgress(0);
      setSeekValue(null);
      setIsSeeking(false);
      setIsEnded(false);
    }
  }, [isActive, isReady, src]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
        return;
      }

      if (isActive && isReady) {
        void video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, isReady]);

  const handleTogglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    if (isEnded || video.ended) {
      video.currentTime = 0;
      setIsEnded(false);

      try {
        await video.play();
      } catch {
        return;
      }

      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        return;
      }
    } else {
      video.pause();
    }
  }, [isEnded, isReady]);

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
      if (!video) return;

      const nextValue = getSliderValue(value);
      const shouldResume = wasPlayingBeforeSeekRef.current;

      video.currentTime = nextValue;
      lastProgressRef.current = nextValue;

      setProgress(nextValue);
      setSeekValue(null);
      setIsSeeking(false);
      setIsEnded(false);

      if (shouldResume && isActive) {
        await video.play().catch(() => {});
      }

      wasPlayingBeforeSeekRef.current = false;
    },
    [isActive]
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
        preload="metadata"
        loop={false}
        onLoadedMetadata={updateDuration}
        onLoadedData={updateDuration}
        onDurationChange={updateDuration}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={videoStyles}
      />

      <Box sx={styles.playOverlay}>
        {!isPlaying && (
          <PlayArrowRoundedIcon
            sx={{ fontSize: 150, color: "#fff", opacity: 0.6 }}
          />
        )}
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
    </Box>
  );
});

const videoStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 15,
  display: "block",
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    borderRadius: 3,
    overflow: "hidden",
  },
  skeletonContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  playOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
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
  },
  progressWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 15,
    zIndex: 4,
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
};
