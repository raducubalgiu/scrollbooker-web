import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import {
  Box,
  ButtonBase,
  Checkbox,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React, { memo, useMemo } from "react";
import { SlotTimeRange } from "./SlotTimeRange";

type CalendarAvailableSlotProps = {
  slot: CalendarEventsSlot;
  globalSx: SxProps<Theme>;
  isBlocking: boolean;
  isSelected: boolean;
  //isPast: boolean;
  onSlotClick: () => void;
};

const CalendarAvailableSlot = ({
  slot,
  globalSx,
  isBlocking,
  isSelected,
  //isPast,
  onSlotClick,
}: CalendarAvailableSlotProps) => {
  // CORECȚIE CRITICĂ: Adăugăm isPast în dependențele useMemo pentru a recalcula stilul corect
  const memoizedButtonStyle = useMemo(() => {
    return styles.button(isBlocking, isSelected);
  }, [isBlocking, isSelected]);

  return (
    <Box sx={globalSx}>
      <ButtonBase
        onClick={onSlotClick}
        // disabled={isPast} // Dezactivează interacțiunea nativă
        sx={memoizedButtonStyle}
      >
        {isBlocking ? (
          <Checkbox
            checked={isSelected}
            color="error"
            size="medium"
            sx={styles.checkbox}
            onClick={(e) => e.stopPropagation()}
            onChange={onSlotClick}
          />
        ) : (
          // Dacă este în trecut, nu mai randăm deloc conținutul de hover (Adaugă o programare)
          <Stack
            className="hover-content"
            spacing={0.5}
            alignItems="center"
            sx={styles.hoverContentStack}
          >
            <SlotTimeRange
              startLocale={slot.start_date_locale}
              endLocale={slot.end_date_locale}
              sx={styles.timeText}
            />
            <Typography variant="caption" sx={styles.actionText}>
              Adaugă o programare
            </Typography>
          </Stack>
        )}
      </ButtonBase>
    </Box>
  );
};

export default memo(CalendarAvailableSlot);

const styles = {
  // CORECȚIE CHIRURGICALĂ: Funcția de stil primeste acum și parametrul isPast
  button: (isBlocking: boolean, isSelected: boolean) => (theme: Theme) => {
    // SCENARIUL PENTRU TRECUT: Dacă celula a trecut, o neutralizăm complet din punct de vedere vizual
    // if (isPast) {
    //   return {
    //     width: "100%",
    //     height: "100%",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     boxSizing: "border-box",
    //     backgroundColor: "transparent", // Lăsăm să se vadă action.disabledBackground din fundal
    //     border: "none", // Eliminăm chenarul dashed în trecut pentru un look curat
    //     cursor: "default",
    //     "&:hover": {
    //       backgroundColor: "transparent",
    //     },
    //   };
    // }

    // SCENARIUL PENTRU VIITOR (Codul tău inițial, neatins)
    return {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      borderRadius: 2,
      transition: "all 0.15s ease-in-out",

      backgroundColor: isBlocking
        ? isSelected
          ? "rgba(211, 47, 47, 0.04)"
          : "background.paper"
        : "transparent",

      border: "1px dashed",
      borderColor: isBlocking && isSelected ? "error.main" : "divider",
      borderStyle: isBlocking && isSelected ? "solid" : "dashed",

      "&:hover": {
        borderStyle: "dashed",
        borderColor: isBlocking
          ? isSelected
            ? "error.dark"
            : "text.secondary"
          : "primary.main",

        backgroundColor: isBlocking
          ? "action.hover"
          : theme.palette.mode === "light"
            ? `color-mix(in srgb, ${theme.palette.action.hover} 12%, #ffffff)`
            : `color-mix(in srgb, ${theme.palette.action.hover} 5%, #1e1e1e)`,

        "& .hover-content": {
          opacity: isBlocking ? 0 : 1,
          transform: isBlocking ? "translateY(6px)" : "translateY(0)",
        },
      },
    };
  },

  checkbox: {
    p: 0,
    "& .MuiSvgIcon-root": { fontSize: 24 },
  },

  hoverContentStack: {
    opacity: 0,
    transform: "translateY(6px)",
    transition: "all 0.2s ease-in-out",
    userSelect: "none",
  },

  timeText: {
    fontWeight: 700,
    fontSize: "13px",
    color: "text.primary",
    whiteSpace: "nowrap",
  },

  actionText: {
    fontWeight: 600,
    fontSize: "11px",
    color: "primary.main",
    whiteSpace: "nowrap",
  },
};
