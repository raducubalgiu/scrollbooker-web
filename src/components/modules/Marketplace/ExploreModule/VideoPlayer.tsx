import { Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

type VideoPlayerProps = {
  isLoading: boolean;
  src: string;
  isActive: boolean;
};

export const VideoPlayer = ({
  src,
  isActive,
  isLoading = false,
}: VideoPlayerProps) => {
  console.log("VideoPlayer render", { src, isActive, isLoading });

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const [duration, setDuration] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);

  const [isEnded, setIsEnded] = React.useState(false);
  const wasPlayingBeforeSeekRef = React.useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
          })
          .catch((error) => {
            console.error("Error playing video:", error);
          });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isActive, src]);

  const handleTogglePlay = React.useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isEnded || video.ended) {
      video.currentTime = 0;
      setProgress(0);
      setIsEnded(false);

      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isEnded]);

  const updateDuration = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextDuration = video.duration;

    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration(nextDuration);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleTogglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        controls={false}
        playsInline
        autoPlay
        loop
        muted={isMuted}
        preload="auto"
        onLoadedMetadata={updateDuration}
        onLoadedData={updateDuration}
        onDurationChange={updateDuration}
        onTimeUpdate={() => {
          const video = videoRef.current;
          if (!video || isSeeking) return;

          setProgress(video.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={src} type="video/mp4" />
      </video>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isPlaying && (
            <PlayArrowRoundedIcon
              sx={{ fontSize: 150, color: "#fff", opacity: 0.6 }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 60%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
