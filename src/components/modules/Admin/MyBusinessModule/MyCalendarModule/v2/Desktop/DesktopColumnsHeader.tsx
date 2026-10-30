import React, { memo } from "react";
import { Box, Theme, Typography } from "@mui/material";
import CalendarAvatar from "../CalendarAvatar";
import { getCalendarTableBg } from "../calendarSurfaceColors";

export type DesktopHeaderColumn =
  | { kind: "day"; key: string; dayName: string; dayNumber: string; isToday: boolean }
  | {
      kind: "employee";
      key: string;
      fullname: string;
      avatar: string | null;
      calendarColor: string | null;
    };

type DesktopColumnsHeaderProps = {
  columns: DesktopHeaderColumn[];
  gridTemplateColumns: string;
  scrollRef: React.Ref<HTMLDivElement>;
};

const DesktopColumnsHeaderComponent = ({
  columns,
  gridTemplateColumns,
  scrollRef,
}: DesktopColumnsHeaderProps) => {
  return (
    <Box ref={scrollRef} sx={{ ...styles.container, gridTemplateColumns }}>
      <Box sx={styles.corner} />
      {columns.map((column, index) => (
        <Box key={column.key} sx={{ gridColumn: index + 2, ...styles.column }}>
          {column.kind === "day" ? (
            <>
              <Typography variant="subtitle2" sx={styles.dayName}>
                {column.dayName}
              </Typography>
              <Typography
                variant="h3"
                noWrap
                sx={{
                  ...styles.dayNumber,
                  ...(column.isToday && styles.dayNumberToday),
                }}
              >
                {column.dayNumber}
              </Typography>
            </>
          ) : (
            <>
              <CalendarAvatar
                src={column.avatar}
                name={column.fullname}
                calendarColor={column.calendarColor}
                sx={styles.avatar}
              />
              <Typography variant="subtitle2" noWrap sx={styles.fullname}>
                {column.fullname}
              </Typography>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export const DesktopColumnsHeader = memo(DesktopColumnsHeaderComponent);

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: `100px`,
    backgroundColor: getCalendarTableBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderColor: "divider",
    position: "sticky",
    top: 0,
    zIndex: 10,
    overflowX: "hidden",
  },
  corner: {
    gridColumn: 1,
    gridRow: 1,
    backgroundColor: getCalendarTableBg,
    borderBottom: "1px solid",
    borderColor: "divider",
    position: "sticky",
    left: 0,
    zIndex: 8,
  },
  column: {
    gridRow: 1,
    p: 1,
    textAlign: "center",
    backgroundColor: getCalendarTableBg,
    borderBottom: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.25,
  },
  dayName: {
    textTransform: "uppercase",
    color: "text.secondary",
  },
  dayNumber: {
    color: "text.primary",
    fontWeight: 600,
    mt: 1.5,
  },
  dayNumberToday: {
    backgroundColor: "primary.main",
    color: "common.white",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: (theme: Theme) => `0 4px 12px ${theme.palette.primary.main}33`,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  fullname: {
    color: "text.primary",
    fontWeight: 600,
    fontSize: "0.8125rem",
    maxWidth: "100%",
  },
};
