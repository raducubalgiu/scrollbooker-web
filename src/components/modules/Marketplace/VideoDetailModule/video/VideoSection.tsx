import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import React from "react";

type VideoSectionProps = {
  url: string;
  onClose: () => void;
};

export default function VideoSection({ url, onClose }: VideoSectionProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(true);

  const [duration, setDuration] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);

  const [isEnded, setIsEnded] = React.useState(false);
  const wasPlayingBeforeSeekRef = React.useRef(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (url) {
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [url]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

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

  const handleToggleMute = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  const handleSliderMouseDown = React.useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    wasPlayingBeforeSeekRef.current = !video.paused;
    setIsSeeking(true);
  }, []);

  const getSliderValue = React.useCallback((value: number | number[]) => {
    if (Array.isArray(value)) {
      return value[0] ?? 0;
    }

    return value;
  }, []);

  const handleSliderChange = React.useCallback(
    (_: Event, value: number | number[]) => {
      const nextValue = getSliderValue(value);
      setProgress(nextValue);
    },
    [getSliderValue]
  );

  const handleSliderChangeCommitted = React.useCallback(
    async (_: React.SyntheticEvent | Event, value: number | number[]) => {
      const video = videoRef.current;
      if (!video) return;

      const nextValue = getSliderValue(value);
      const duration = video.duration;

      video.currentTime = nextValue;
      setProgress(nextValue);
      setIsSeeking(false);

      const isAtEnd =
        Number.isFinite(duration) &&
        duration > 0 &&
        nextValue >= duration - 0.1; // mic offset pt float

      if (isAtEnd) {
        setIsEnded(true);
        setIsPlaying(false);
        video.pause();
        return;
      }

      setIsEnded(false);

      if (wasPlayingBeforeSeekRef.current) {
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }

      wasPlayingBeforeSeekRef.current = false;
    },
    [getSliderValue]
  );

  const formatTime = React.useCallback((seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

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
      onClick={handleTogglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        minHeight: { xs: "60vh", lg: "100vh" },
        bgcolor: "#0B0B0B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        sx={{
          position: "absolute",
          width: 60,
          height: 60,
          top: 16,
          left: 16,
          zIndex: 2,
          bgcolor: "rgba(255,255,255,0.10)",
          color: "common.white",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.18)",
          },
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 560,
            aspectRatio: "9 / 16",
            borderRadius: { xs: 0, sm: 3 },
            overflow: "hidden",
            bgcolor: "grey.900",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
          }}
        >
          <Box>
            <video
              ref={videoRef}
              src={url}
              muted={isMuted}
              autoPlay
              playsInline
              loop
              preload="metadata"
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
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 120ms ease",
                pointerEvents: "none",
              }}
            />
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

          {/* <Stack sx={{ height: "100%", bottom: 5 }} justifyContent="flex-end">
            <Button
              size="large"
              sx={{
                mx: 2.5,
                my: 5,
                py: 2,
                opacity: 0.9,
                textTransform: "none",
                fontSize: 16,
              }}
              variant="contained"
            >
              Rezerva acum
            </Button>
          </Stack> */}

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              position: "absolute",
              bottom: 32,
              left: 16,
              right: 16,
              zIndex: 2,
              opacity: {
                xs: 1,
                lg: isHovered ? 1 : 0,
              },
              transform: {
                xs: 1,
                lg: isHovered ? "translateY(0)" : "translateY(8px)",
              },
              pointerEvents: {
                xs: "auto",
                lg: isHovered ? "auto" : "none",
              },
              transition: "opacity 180ms ease, transform 180ms ease",
            }}
            gap={2.5}
          >
            <Slider
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(progress, duration || 0)}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderChangeCommitted}
              onMouseDown={handleSliderMouseDown}
              onTouchStart={handleSliderMouseDown}
              sx={{
                flex: 1,
                color: "common.white",
                height: 10,
                p: 0,
                "& .MuiSlider-rail": {
                  opacity: 1,
                  bgcolor: "rgba(255,255,255,0.18)",
                },
                "& .MuiSlider-track": {
                  border: "none",
                  bgcolor: "common.white",
                },
                "& .MuiSlider-thumb": {
                  width: 10,
                  height: 10,
                  boxShadow: "none",
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: "common.white",
                minWidth: 36,
              }}
            >
              {formatTime(progress)}/{formatTime(duration)}
            </Typography>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleToggleMute();
              }}
              size="large"
              sx={{
                color: "common.white",
                bgcolor: "rgba(255,255,255,0.10)",
                zIndex: 2,
              }}
            >
              {isMuted ? <VolumeOffRoundedIcon /> : <VolumeUpOutlinedIcon />}
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
