import React from "react";

import { keyframes, Fade, Box } from "@mui/material";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40% { transform: scale(1.0); opacity: 1; }
`;

const MapLoadingIndicator = ({ show }: { show: boolean }) => {
  return (
    <Fade in={show}>
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          bgcolor: "background.paper",
          p: 2.5,
          borderRadius: 10,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          pointerEvents: "none",
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              bgcolor: "text.primary",
              borderRadius: "50%",
              animation: `${bounce} 1.4s infinite ease-in-out both`,
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </Box>
    </Fade>
  );
};

export default MapLoadingIndicator;
