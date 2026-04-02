import { PostUser } from "@/ts/models/social/Post";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

type PostOverlayProps = {
  user: PostUser | undefined;
  description: string | null;
  isVideoReview: boolean | undefined;
};

const PostOverlay = ({
  user,
  description,
  isVideoReview,
}: PostOverlayProps) => {
  return (
    <Stack
      spacing={1.5}
      sx={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 20,
        zIndex: 1,
        color: "common.white",
      }}
    >
      {isVideoReview && (
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            px: 1.5,
            py: 1,
            width: "fit-content",
            borderRadius: 20,
          }}
        >
          <Typography fontWeight={600}>Recenzie video</Typography>
        </Box>
      )}

      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box>
          <Typography fontWeight={800}>{user?.fullname}</Typography>
          <Typography color="primary" sx={{ opacity: 0.92, fontWeight: 600 }}>
            {user?.profession}
          </Typography>
        </Box>
      </Stack>
      <Typography sx={{ opacity: 0.9, maxWidth: 320 }}>
        {description}
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          display: { xs: "inline-flex", lg: "none" },
          alignSelf: "flex-start",
          px: 2.5,
        }}
      >
        Rezervă acum
      </Button>
    </Stack>
  );
};

export default PostOverlay;
