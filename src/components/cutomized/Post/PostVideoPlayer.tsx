import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Fade,
  CircularProgress,
  Slider,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PostOverlay from "./PostOverlay";
import { Post } from "@/ts/models/social/Post";
import {
  PostActionCallbacks,
  PostActionLoaders,
} from "./actions/postActionTypes";
import { useVideoPlayback } from "./useVideoPlayback";
import { useDelayedTrue } from "@/hooks/useDelayedTrue";

const PAUSED_OVERLAY_DELAY_MS = 250;

type PostVideoPlayerProps = {
  post: Post | null;
  loaders: PostActionLoaders;
  callbacks: PostActionCallbacks;
  src: string;
  thumbnailUrl?: string | null;
  isActive: boolean;
  isLoading?: boolean;
  preload?: "none" | "metadata" | "auto";
  resetOnInactive?: boolean;
  showBookButton?: boolean;
  onOpenLinkedProducts: () => void;
};

const formatVideoTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const PostVideoPlayer = React.memo(function PostVideoPlayer({
  post,
  loaders,
  callbacks,
  src,
  thumbnailUrl = null,
  isActive,
  isLoading = false,
  preload = "metadata",
  resetOnInactive = true,
  showBookButton = true,
  onOpenLinkedProducts,
}: PostVideoPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    containerRef,
    videoRef,
    isReady,
    isPlaying,
    isMuted,
    duration,
    sliderProgress,
    isSeeking,
    isBuffering,
    hasError,
    handleTogglePlay,
    handleToggleMute,
    handleSeekChange,
    handleSeekCommit,
    handleRetry,
  } = useVideoPlayback({ src, isActive, preload, resetOnInactive });

  const volumeButtonIcon = useMemo(
    () =>
      isMuted ? (
        <VolumeOffRoundedIcon sx={volumeIconSx} />
      ) : (
        <VolumeUpRoundedIcon sx={volumeIconSx} />
      ),
    [isMuted]
  );

  const isPausedCandidate =
    isActive && !hasError && !isBuffering && !isPlaying && isReady;
  const showPausedOverlay = useDelayedTrue(
    isPausedCandidate,
    PAUSED_OVERLAY_DELAY_MS
  );

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
        muted={!isActive || isMuted}
        poster={thumbnailUrl ?? undefined}
        preload={preload}
        loop={true}
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
        ) : null}
      </Box>

      <Fade in={showPausedOverlay} timeout={{ enter: 150, exit: 0 }}>
        <Box sx={fadeContainerSx}>
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
              isVideoReview: post?.is_video_review ?? false,
              serviceDomain: post?.service_domain ?? null,
              loaders,
              callbacks,
            }}
            businessLocation={post?.business_location ?? null}
            description={post?.description ?? null}
            instantBooking={post?.instant_booking ?? false}
            contact={
              post?.contact ?? {
                phone: null,
                accepts_whatsapp: false,
                accepts_calls: false,
              }
            }
            onOpenLinkedProducts={onOpenLinkedProducts}
            showBookButton={showBookButton}
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

const volumeIconSx = {
  color: "#fff",
  fontSize: { xs: "1.5rem", sm: "2.1875rem" },
};
const fadeContainerSx = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  zIndex: 6,
} as const;

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
