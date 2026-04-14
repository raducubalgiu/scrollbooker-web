import { Box, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Hls from "hls.js";

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
  const [isReady, setIsReady] = React.useState(false); // Flag nou
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const [duration, setDuration] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);

  const [isEnded, setIsEnded] = React.useState(false);
  const wasPlayingBeforeSeekRef = React.useRef(false);

  const updateDuration = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextDuration = video.duration;

    if (Number.isFinite(nextDuration) && nextDuration > 0) {
      setDuration(nextDuration);
    }
  }, []);

  // 1. Efect dedicat pentru INIȚIALIZARE HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;
    setIsReady(false);

    const onLoadedMetadata = () => {
      updateDuration();
      setIsReady(true);
    };

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        updateDuration();
        setIsReady(true);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Suport nativ (Safari/iOS)
      video.src = src;
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    // ACESTA ESTE RETURN-UL CARE ACOPERĂ TOATE CAZURILE
    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      // Opțional: curățăm sursa video la demontare pentru a opri descărcarea buffer-ului
      video.src = "";
      video.load();
    };
  }, [src, updateDuration]);

  // 2. Efectul tău existent pentru AUTO-PLAY (ajustat)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !isReady) return;

    if (isActive) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true); // Te asiguri că starea UI este corectă
          })
          .catch((error) => {
            // 1. Verificăm dacă browserul a blocat autoplay-ul (la refresh)
            if (error.name === "NotAllowedError") {
              console.warn(
                "Autoplay blocat. Aștept interacțiunea utilizatorului."
              );
              setIsPlaying(false);
            }
            // 2. Ignorăm întreruperile cauzate de încărcări noi (AbortError)
            else if (error.name !== "AbortError") {
              console.error("Eroare neașteptată la play():", error);
            }
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      if (video.duration !== Infinity) {
        video.currentTime = 0;
      }
    }
  }, [isActive, src, isReady]);

  // 3. Logica de control (handleTogglePlay) rămâne neschimbată
  const handleTogglePlay = React.useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isEnded || video.ended) {
      video.currentTime = 0;
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

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else {
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "pointer",
        borderRadius: 3,
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
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 15,
        }}
      >
        <source src={src} />
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
    </Box>
  );
};
