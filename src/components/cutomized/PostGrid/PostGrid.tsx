import { Box, Stack, Typography } from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Image from "next/image";
import React from "react";

type PostGridProps = {
  imgUrl: string | null;
  views_count: number;
};

function formatViews(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n;
}

const PostGrid = ({ imgUrl, views_count = 0 }: PostGridProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: { xs: 0, sm: 2 },
        overflow: "hidden",
        backgroundColor: "background.default",
        aspectRatio: "9/12",
        cursor: "pointer",
      }}
    >
      {imgUrl && (
        <Image
          src={imgUrl}
          alt="post"
          fill
          sizes="
          (max-width: 600px) 33vw,
          (max-width: 900px) 25vw,
          (max-width: 1200px) 16vw,
          25vw
          "
          style={{ objectFit: "cover" }}
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
        }}
      >
        <Stack direction="row" alignItems="center">
          <PlayArrowOutlinedIcon sx={{ color: "#fff" }} />
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: {
                xs: 12,
                sm: 15,
              },
              textShadow: "0 1px 3px rgba(0,0,0,0.7)",
            }}
          >
            {formatViews(views_count)}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default PostGrid;
