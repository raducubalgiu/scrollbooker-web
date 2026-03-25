import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";
import {
  SEARCH_HEADER_SECTIONS,
  SearchHeaderSectionType,
} from "../SearchHeaderSectionEnum";
import SearchIcon from "@mui/icons-material/Search";

type SearchHeaderBarProps = {
  isExpanded: boolean;
  toggle: (section: SearchHeaderSectionType) => void;
  activeSection: SearchHeaderSectionType | null;
  onSearch: () => void;
  popperId?: string;
  close?: () => void;
};

const SearchHeaderBar = ({
  isExpanded,
  toggle,
  activeSection,
  onSearch,
}: SearchHeaderBarProps) => {
  const theme = useTheme();

  const searchButtonWidth = React.useMemo(
    () => (isExpanded ? 278 : 220),
    [isExpanded]
  );

  const buttonBaseSx = React.useMemo(
    () => ({
      width: searchButtonWidth,
      flex: "0 0 auto",
      minWidth: 0,
      textTransform: "none" as const,
      borderRadius: 999,
      py: 2,
      px: 3,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      textAlign: "left",
      transition:
        "width 0.34s cubic-bezier(0.16, 1, 0.3, 1), padding 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
      overflow: "hidden",
    }),
    [isExpanded, searchButtonWidth]
  );

  const buttonSxBySection = React.useMemo(() => {
    const sections = SEARCH_HEADER_SECTIONS.map(
      (s) => s.key as SearchHeaderSectionType
    );

    const makeSx = (key: SearchHeaderSectionType) => ({
      ...buttonBaseSx,
      bgcolor:
        activeSection === key
          ? theme.palette.mode === "dark"
            ? "secondary.main"
            : "background.paper"
          : "transparent",
      boxShadow: activeSection === key ? "0 2px 12px rgba(0,0,0,0.12)" : "none",
      "&:hover": {
        bgcolor:
          activeSection === key
            ? theme.palette.mode === "dark"
              ? "secondary.main"
              : "background.paper"
            : "action.hover",
      },
    });

    return sections.reduce(
      (acc, s) => {
        acc[s] = makeSx(s);
        return acc;
      },
      {} as Record<SearchHeaderSectionType, object>
    );
  }, [activeSection, buttonBaseSx, theme.palette.mode]);

  const searchPaperSx = React.useMemo(
    () => ({
      "@keyframes searchBarExpandSnap": {
        "0%": { transform: "scale(1, 1)" },
        "68%": { transform: "scale(1, 1.02)" },
        "100%": { transform: "scale(1, 1.015)" },
      },
      position: "relative",
      isolation: "isolate",
      display: "inline-flex",
      maxWidth: "calc(100vw - 64px)",
      p: 1,
      borderRadius: 16,
      backgroundColor: "transparent",
      boxShadow: "none",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        zIndex: -1,
        borderRadius: "inherit",
        boxShadow: isExpanded
          ? "0 20px 60px rgba(2,6,23,0.18), 0 4px 16px rgba(2,6,23,0.06)"
          : "0 10px 30px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.04)",
        border: (theme: Theme) =>
          `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
        backdropFilter: "saturate(140%) blur(6px)",
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "dark"
            ? "background.paper"
            : "rgba(255,255,255,0.8)",
        transform: isExpanded ? "scale(1, 1.015)" : "scale(1, 1)",
        transformOrigin: "center center",
        animation: isExpanded
          ? "searchBarExpandSnap 360ms cubic-bezier(0.16, 1, 0.3, 1) both"
          : "none",
        transition: "transform 0.22s ease-out, box-shadow 0.3s ease",
      },
    }),
    [isExpanded]
  );

  // button refs for keyboard navigation
  const buttonRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      const len = SEARCH_HEADER_SECTIONS.length;
      if (e.key === "ArrowRight") {
        const next = (idx + 1) % len;
        buttonRefs.current[next]?.focus();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        const prev = (idx - 1 + len) % len;
        buttonRefs.current[prev]?.focus();
        e.preventDefault();
      } else if (e.key === "Escape") {
        // close popper if provided
        typeof (SearchHeaderBar as any).close === "function" ? null : null;
        e.preventDefault();
      }
    },
    []
  );

  const searchBtnSx = useMemo(
    () => ({
      textTransform: "none",
      ml: 0.5,
      borderRadius: 50,
      py: 2,
      pl: 2.5,
      pr: isExpanded ? 2 : 1.25,
      minWidth: isExpanded ? 100 : 48,
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      gap: 1,
      transition:
        "min-width 0.28s cubic-bezier(0.4,0,0.2,1), padding 0.28s cubic-bezier(0.4,0,0.2,1)",
      bgcolor: "primary.main",
      color: "common.white",
      "&:hover": {
        bgcolor: "primary.dark",
        boxShadow: "none",
      },
    }),
    [isExpanded]
  );

  return (
    <Paper sx={searchPaperSx}>
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{ width: "fit-content" }}
      >
        {SEARCH_HEADER_SECTIONS.map((sec, idx, arr) => (
          <React.Fragment key={sec.key}>
            <Button
              component="div"
              role="button"
              tabIndex={0}
              sx={buttonSxBySection[sec.key]}
              color="secondary"
              onClick={() => toggle(sec.key as SearchHeaderSectionType)}
              aria-haspopup={true}
              aria-expanded={
                activeSection === (sec.key as SearchHeaderSectionType)
              }
              aria-controls={
                activeSection === (sec.key as SearchHeaderSectionType)
                  ? `search-popper`
                  : undefined
              }
              ref={(el: HTMLDivElement | null) =>
                (buttonRefs.current[idx] = el as any)
              }
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <Stack alignItems="flex-start">
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  fontWeight={700}
                  lineHeight={1.3}
                >
                  {sec.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  sx={{ fontSize: "0.98rem" }}
                >
                  {sec.value}
                </Typography>
              </Stack>
            </Button>

            {!isExpanded && idx < arr.length - 1 && (
              <Divider orientation="vertical" sx={{ height: 28, mx: 0.5 }} />
            )}
          </React.Fragment>
        ))}

        <Button
          onClick={onSearch}
          aria-label="Caută"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon fontSize="large" />}
          sx={searchBtnSx}
        >
          {isExpanded && (
            <span
              style={{
                display: "inline-block",
                transition:
                  "max-width 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.18s, margin-left 0.18s",
                overflow: "hidden",
                whiteSpace: "nowrap",
                pointerEvents: isExpanded ? "auto" : "none",
              }}
            >
              Caută
            </span>
          )}
        </Button>
      </Stack>
    </Paper>
  );
};

export const MemoizedSearchHeaderBar = React.memo(SearchHeaderBar);

export default MemoizedSearchHeaderBar;
