"use client";

import Image from "next/image";
import { Box, Typography, ButtonBase } from "@mui/material";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";

type BusinessProfileGalleryProps = {
  mediaFiles: BusinessMediaFile[];
  businessName?: string;
  onOpenGallery?: (initialIndex?: number) => void;
};

export default function BusinessProfileGallery({
  mediaFiles,
  businessName = "Business",
  onOpenGallery,
}: BusinessProfileGalleryProps) {
  const safeImages = mediaFiles.filter(Boolean).slice(0, 5);

  if (safeImages.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: { xs: 260, md: 640 },
          borderRadius: 3,
          bgcolor: "action.hover",
        }}
      />
    );
  }

  const heroImage = safeImages[0]?.url;
  const rightImages = safeImages.slice(1, 3).map((file) => file.thumbnail_url);
  const remainingCount = safeImages.length - 3;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1.45fr 1fr",
        },
        gap: 3,
        width: "100%",
      }}
    >
      {/* Hero image */}
      <GalleryTile
        src={heroImage ?? ""}
        alt={`${businessName} image 1`}
        priority
        height={{ xs: 260, md: 640 }}
        onClick={() => onOpenGallery?.(0)}
      />

      {/* Right stacked images */}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gap: 2.5,
          height: { xs: 220, md: 640 },
        }}
      >
        {rightImages[0] ? (
          <GalleryTile
            src={rightImages[0]}
            alt={`${businessName} image 2`}
            height="100%"
            onClick={() => onOpenGallery?.(1)}
          />
        ) : (
          <EmptyTile />
        )}

        {rightImages[1] ? (
          <GalleryTile
            src={rightImages[1]}
            alt={`${businessName} image 3`}
            height="100%"
            onClick={() => onOpenGallery?.(2)}
            overlay={
              remainingCount > 0 ? (
                <OverlayButton onClick={() => onOpenGallery?.(0)}>
                  Vezi toate
                </OverlayButton>
              ) : undefined
            }
            extraOverlay={
              remainingCount > 0 ? (
                <Typography
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    px: 1,
                    py: 0.35,
                    borderRadius: 999,
                    bgcolor: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  +{remainingCount}
                </Typography>
              ) : undefined
            }
          />
        ) : (
          <EmptyTile />
        )}
      </Box>
    </Box>
  );
}

type GalleryTileProps = {
  src: string;
  alt: string;
  height: number | string | Record<string, string | number>;
  onClick?: () => void;
  priority?: boolean;
  overlay?: React.ReactNode;
  extraOverlay?: React.ReactNode;
};

function GalleryTile({
  src,
  alt,
  height,
  onClick,
  priority = false,
  overlay,
  extraOverlay,
}: GalleryTileProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: 3,
        textAlign: "initial",
        "&:hover img": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 900px) 100vw, 50vw"
        style={{
          objectFit: "cover",
          transition: "transform 0.35s ease",
        }}
      />

      {extraOverlay}

      {overlay}

      {!overlay && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 45%)",
            pointerEvents: "none",
          }}
        />
      )}
    </ButtonBase>
  );
}

function EmptyTile() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        bgcolor: "action.hover",
      }}
    />
  );
}

function OverlayButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        p: 1.5,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0) 75%)",
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 0.9,
          borderRadius: 999,
          bgcolor: "rgba(255,255,255,0.92)",
          color: "text.primary",
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1,
          boxShadow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
