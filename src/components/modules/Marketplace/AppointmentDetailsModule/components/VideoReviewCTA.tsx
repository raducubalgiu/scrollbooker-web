"use client";

import React from "react";
import { Box, Typography, Stack, useTheme, keyframes } from "@mui/material";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const iconPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const haloOpacity = keyframes`
  0% { opacity: 0.12; }
  50% { opacity: 0.22; }
  100% { opacity: 0.12; }
`;

type VideoReviewCTAProps = {
  onNavigateToCamera: () => void;
  discount?: number;
};

const VideoReviewCTA = ({
  onNavigateToCamera,
  discount = 10,
}: VideoReviewCTAProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const containerColor = !isDarkMode ? "#141414" : "#FF4D4D";
  const textColor = "#FFFFFF";
  const promoRed = isDarkMode ? "#FFFFFF" : "#FF4D4D";

  return (
    <Box
      onClick={onNavigateToCamera}
      sx={{
        width: "100%",
        cursor: "pointer",
        position: "relative",
        bgcolor: containerColor,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0px 8px 24px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.1)",
        animation: `${pulse} 1.2s ease-in-out infinite`,
        transition: "transform 0.2s ease",
        "&:active": { transform: "scale(0.98)" },
        p: 1.5,
        mt: 2.5,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
          animation: `${haloOpacity} 1.2s ease-in-out infinite`,
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ p: "14px 18px", position: "relative", zIndex: 1 }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            bgcolor: "rgba(255,255,255,0.16)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `${iconPulse} 0.9s ease-in-out infinite`,
          }}
        >
          <VideoCameraBackIcon sx={{ color: textColor, fontSize: 24 }} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: textColor, lineHeight: 1.2 }}
          >
            Adaugă un review video
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.85)", mt: 0.3 }}
          >
            Primești{" "}
            <Box component="span" sx={{ color: promoRed, fontWeight: 800 }}>
              {discount}%
            </Box>{" "}
            reducere la următoarea rezervare
          </Typography>
        </Box>

        <ChevronRightIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
      </Stack>
    </Box>
  );
};

export default VideoReviewCTA;
