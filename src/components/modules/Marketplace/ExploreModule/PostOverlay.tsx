import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const PostOverlay = () => {
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
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box>
          <Typography variant="subtitle1" fontWeight={800}>
            Frizeria Figaro
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ opacity: 0.92, fontWeight: 600 }}
          >
            Frizerie
          </Typography>
        </Box>
      </Stack>

      <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 320 }}>
        Un video trebuie să convingă vizual. Panoul din dreapta trebuie să
        închidă rapid decizia de rezervare.
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
