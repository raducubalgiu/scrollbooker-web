import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";

type NotAuthenticatedOverlayProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const NotAuthenticatedOverlay = ({
  children,
  title,
  description,
}: NotAuthenticatedOverlayProps) => {
  const theme = useTheme();
  const overlaySx = useMemo(() => {
    const isDark = theme.palette.mode === "dark";
    const topBelowModal = Math.max((theme.zIndex?.modal ?? 1300) - 1, 0);

    if (isDark) {
      return {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.96) 90%)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
        color: "common.white",
        pt: 6,
        px: 2,
        pb: 2,
        zIndex: topBelowModal,
        pointerEvents: "auto",
        borderRadius: 2,
      };
    }

    return {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.85) 100%)",
      WebkitBackdropFilter: "blur(6px)",
      backdropFilter: "blur(6px)",
      color: "text.primary",
      pt: 6,
      px: 2,
      pb: 2,
      zIndex: topBelowModal,
      pointerEvents: "auto",
      borderRadius: 2,
    };
  }, [theme.palette.mode, theme.zIndex?.modal]);

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ position: "relative" }}>
        {children}
        <Box sx={overlaySx}>
          <Box sx={{ textAlign: "center", maxWidth: 520 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              {description}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {}}
                sx={{ mr: 1 }}
                disableElevation
              >
                Conectează-te
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotAuthenticatedOverlay;
