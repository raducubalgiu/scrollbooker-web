"use client";

import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Image from "next/image";
import React from "react";

type PostGridProps = {
  thumbnailUrl: string | null;
  videoUrl?: string | null;
  viewsCount: number;
  onNavigateToVideo: () => void;
};

function formatViews(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

const PostGrid = ({
  thumbnailUrl,
  videoUrl,
  viewsCount = 0,
  onNavigateToVideo,
}: PostGridProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered && videoUrl) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, videoUrl]);

  return (
    <ButtonBase
      onClick={onNavigateToVideo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ width: "100%", display: "block" }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: { xs: 0, md: 2 },
          overflow: "hidden",
          backgroundColor: "background.default",
          aspectRatio: "9/12",
        }}
      >
        <Image
          src={thumbnailUrl || "/placeholder.jpg"}
          alt="Post thumbnail"
          fill
          sizes="(max-width: 600px) 33vw, (max-width: 900px) 25vw, 20vw"
          style={{
            objectFit: "cover",
          }}
        />

        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted={false}
            playsInline
            loop
            preload="metadata"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 120ms ease",
              pointerEvents: "none",
            }}
          />
        )}

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
            bottom: 6,
            left: 6,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            pointerEvents: "none",
          }}
        >
          <Stack direction="row" alignItems="center">
            <PlayArrowOutlinedIcon sx={{ color: "#fff", fontSize: 30 }} />
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: { xs: 12, sm: 18 },
                textShadow: "0 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              {formatViews(viewsCount)}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default PostGrid;
