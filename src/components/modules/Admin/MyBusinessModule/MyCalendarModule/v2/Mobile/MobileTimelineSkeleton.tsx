import React from "react";
import { Box, Skeleton } from "@mui/material";
import { ROW_HEIGHT } from "./MobileTimeline";

const ROWS = 6;
const SLOT_ROWS = [
  { top: 0, span: 1 },
  { top: 1, span: 0.5 },
  { top: 1.5, span: 1.5 },
  { top: 3, span: 1 },
  { top: 4, span: 0.5 },
  { top: 4.5, span: 1.5 },
];

const MobileTimelineSkeleton = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={{ ...styles.gutter, height: ROWS * ROW_HEIGHT }}>
        {Array.from({ length: ROWS }, (_, index) => (
          <Skeleton
            key={`tick-${index}`}
            variant="text"
            width={34}
            height={14}
            sx={{ ...styles.tick, top: index * ROW_HEIGHT }}
          />
        ))}
      </Box>

      <Box sx={{ ...styles.track, height: ROWS * ROW_HEIGHT }}>
        {SLOT_ROWS.map((slot) => (
          <Skeleton
            key={`slot-${slot.top}`}
            variant="rounded"
            sx={{
              ...styles.slot,
              top: slot.top * ROW_HEIGHT + 2,
              height: slot.span * ROW_HEIGHT - 4,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MobileTimelineSkeleton;

const styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    pt: 1.5,
    pb: 2,
  },
  gutter: {
    position: "relative",
    width: 56,
    flexShrink: 0,
  },
  tick: {
    position: "absolute",
    left: 8,
    transform: "translateY(-50%)",
  },
  track: {
    position: "relative",
    flex: 1,
    minWidth: 0,
  },
  slot: {
    position: "absolute",
    left: 4,
    right: 4,
    borderRadius: 1,
  },
} as const;
