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
  const totalCount = mediaFiles.filter(Boolean).length;

  if (safeImages.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          aspectRatio: { xs: "1.5/1", md: "2/1" },
          borderRadius: 3,
          bgcolor: "action.hover",
        }}
      />
    );
  }

  const heroImage = safeImages[0]?.url;
  const gridImages = safeImages.slice(1, 5);
  const remainingCount = totalCount - safeImages.length;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },
        gap: 1,
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <GalleryTile
        src={heroImage ?? ""}
        alt={`${businessName} imagine hero`}
        priority
        onClick={() => onOpenGallery?.(0)}
        sx={{ aspectRatio: { xs: "1.5/1", md: "1.55/1" } }}
      />

      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 1,
          height: "100%",
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const file = gridImages[index];
          const imageIndex = index + 1;
          const isLast = index === 3;

          if (!file) return <EmptyTile key={index} />;

          return (
            <GalleryTile
              key={index}
              src={file.thumbnail_url || file.url || ""}
              alt={`${businessName} imagine secundară ${imageIndex + 1}`}
              onClick={() => onOpenGallery?.(imageIndex)}
              sx={{ height: "100%" }}
              overlay={
                isLast && remainingCount > 0 ? (
                  <OverlayButton onClick={() => onOpenGallery?.(imageIndex)}>
                    Vezi toate
                  </OverlayButton>
                ) : undefined
              }
              extraOverlay={
                isLast && remainingCount > 0 ? (
                  <Typography
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 2,
                      px: 1,
                      py: 0.35,
                      borderRadius: 999,
                      bgcolor: "rgba(0,0,0,0.65)",
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
          );
        })}
      </Box>
    </Box>
  );
}

type GalleryTileProps = {
  src: string;
  alt: string;
  onClick?: () => void;
  priority?: boolean;
  overlay?: React.ReactNode;
  extraOverlay?: React.ReactNode;
  sx?: Record<string, any>;
};

function GalleryTile({
  src,
  alt,
  onClick,
  priority = false,
  overlay,
  extraOverlay,
  sx,
}: GalleryTileProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        overflow: "hidden",
        textAlign: "initial",
        "&:hover img": {
          transform: "scale(1.02)",
        },
        ...sx,
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
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />
      {extraOverlay}
      {overlay}
      {!overlay && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0)",
            transition: "background-color 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.03)",
            },
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
        p: 2.5,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%)",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 1,
          borderRadius: 2,
          bgcolor: "#ffffff",
          color: "#222222",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
          border: "1px solid #222222",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#f7f7f7",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
