import { alpha, Box, Theme } from "@mui/material";

const PageGlow = () => (
  <Box
    sx={{
      position: "absolute",
      top: "-20%",
      right: "-10%",
      width: 560,
      height: 560,
      borderRadius: "50%",
      background: (theme: Theme) =>
        `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
      filter: "blur(10px)",
      pointerEvents: "none",
    }}
  />
);

export default PageGlow;
