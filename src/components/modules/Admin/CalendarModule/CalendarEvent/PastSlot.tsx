import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

type PastSlotProps = {
  globalSx: SxProps<Theme>;
};

const PastSlot = ({ globalSx }: PastSlotProps) => {
  return (
    <Box
      sx={[
        ...(Array.isArray(globalSx) ? globalSx : [globalSx]),
        styles.container,
      ]}
    />
  );
};

export default PastSlot;

const styles = {
  container: (theme: Theme) => {
    const strokeColor = theme.palette.text.secondary;
    return {
      borderRadius: 2,
      backgroundImage: `repeating-linear-gradient(
                45deg, 
                transparent, 
                transparent 5px, 
                ${strokeColor} 5px, 
                ${strokeColor} 6px
              )`,
      mixBlendMode: theme.palette.mode === "light" ? "multiply" : "screen",
      opacity: 0.15,
    };
  },
};
