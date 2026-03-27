import { Box } from "@mui/material";
import React from "react";

const PostGridSkeleton = () => {
  return (
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

export default PostGridSkeleton;
