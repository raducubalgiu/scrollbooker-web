"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import dayjs from "@/lib/dayjs";

type DesktopCurrentTimeIndicatorProps = {
  minTimeStr: string | undefined;
  maxTimeStr: string | undefined;
  slotDuration: number;
  rowHeight: number;
};

const ANCHOR_DATE = "2026-01-01";

export const DesktopCurrentTimeIndicator = ({
  minTimeStr,
  maxTimeStr,
  slotDuration,
  rowHeight,
}: DesktopCurrentTimeIndicatorProps) => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!minTimeStr || !maxTimeStr) return null;

  const globalStart = dayjs(`${ANCHOR_DATE}T${minTimeStr}`);
  const globalEnd = dayjs(`${ANCHOR_DATE}T${maxTimeStr}`);
  const anchoredNow = dayjs(`${ANCHOR_DATE}T${now.format("HH:mm:ss")}`);

  if (!anchoredNow.isBetween(globalStart, globalEnd, null, "[]")) return null;

  const pixelsPerMinute = rowHeight / slotDuration;
  const minutesFromGlobalStart = anchoredNow.diff(globalStart, "minute");
  const topPositionPixels = minutesFromGlobalStart * pixelsPerMinute;

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${topPositionPixels}px`,
        left: 0,
        right: 0,
        height: "2px",
        bgcolor: "error.main",
        zIndex: 6,
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: -4,
          top: "50%",
          transform: "translateY(-50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "error.main",
        }}
      />
    </Box>
  );
};
