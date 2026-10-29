"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { Session } from "next-auth";
import { DesktopCalendar } from "./Desktop/DesktopCalendar";
import MobileCalendar from "./Mobile/MobileCalendar";

type CalendarScreenProps = {
  session: Session;
};

export const CalendarScreen = ({ session }: CalendarScreenProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  if (isMobile) return <MobileCalendar session={session} />;
  if (isDesktop) return <DesktopCalendar session={session} />;

  return null;
};
