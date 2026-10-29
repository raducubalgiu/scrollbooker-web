"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { darkTheme } from "../../../../../theme/theme";
import LandingVideo from "./LandingVideo";

const { palette } = darkTheme;

type PhoneMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  videoSrc?: string;
};

export default function PhoneMockup({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 900px) 80vw, 320px",
  videoSrc,
}: PhoneMockupProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        mx: "auto",
        borderRadius: "44px",
        p: "12px",
        backgroundColor: palette.surface.main,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: `0 40px 100px -30px rgba(255,111,0,0.3), 0 0 0 1px rgba(255,255,255,0.04) inset`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1170 / 2532",
          borderRadius: "32px",
          overflow: "hidden",
          backgroundColor: palette.common.black,
        }}
      >
        {videoSrc ? (
          <>
            <LandingVideo src={videoSrc} poster={src} label={alt} />
            <Box
              sx={{
                position: "absolute",
                top: "1.1%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "46%",
                height: "4.6%",
                borderRadius: 50,
                backgroundColor: palette.common.black,
              }}
            />
          </>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            style={{ objectFit: "cover" }}
            priority={priority}
          />
        )}
      </Box>

      {!videoSrc && (
        <Box
          sx={{
            position: "absolute",
            top: 22,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 22,
            borderRadius: "20px",
            backgroundColor: palette.surface.main,
            border: `1px solid ${palette.divider}`,
          }}
        />
      )}
    </Box>
  );
}
