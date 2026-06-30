import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import React, { memo, useCallback } from "react";
import {
  SEARCH_HEADER_SECTIONS,
  SearchHeaderSectionEnum,
  SearchHeaderSectionType,
} from "../SearchHeaderSectionEnum";
import SearchIcon from "@/assets/icons/ic_search.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";

type SearchHeaderBarProps = {
  selectedServiceDomainName: string | null | undefined;
  selectedDateTimeLabel: string | null | undefined;
  isExpanded: boolean;
  toggle: (section: SearchHeaderSectionType) => void;
  activeSection: SearchHeaderSectionType | null;
  onSearch: () => void;
  popperId?: string;
  close?: () => void;
};

const EXPANDED_WIDTH = 320;
const COLLAPSED_WIDTH = 250;

const SearchHeaderBar = ({
  selectedServiceDomainName,
  selectedDateTimeLabel,
  isExpanded,
  toggle,
  activeSection,
  onSearch,
}: SearchHeaderBarProps) => {
  const handleClearSection = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  return (
    <Paper sx={styles.paper(isExpanded)}>
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={styles.stackContainer}
      >
        {SEARCH_HEADER_SECTIONS.map((sec, idx, arr) => {
          const sectionKey = sec.key as SearchHeaderSectionType;
          const isSectionActive = activeSection === sectionKey;

          const isServicesSection =
            sectionKey === SearchHeaderSectionEnum.Services;
          const isDatetimeSection =
            sectionKey === SearchHeaderSectionEnum.Datetime;

          const hasFilterApplied =
            (isServicesSection && !!selectedServiceDomainName) ||
            (isDatetimeSection && !!selectedDateTimeLabel);

          const displayValue = isServicesSection
            ? selectedServiceDomainName || sec.value
            : isDatetimeSection
              ? selectedDateTimeLabel || sec.value
              : sec.value;

          const showClearIcon =
            isExpanded && isSectionActive && hasFilterApplied;

          return (
            <React.Fragment key={sec.key}>
              <Button
                component="div"
                role="button"
                tabIndex={0}
                variant="text"
                color="secondary"
                onClick={() => toggle(sectionKey)}
                aria-haspopup={true}
                aria-expanded={isSectionActive}
                aria-controls={isSectionActive ? "search-popper" : undefined}
                sx={styles.sectionButton(isExpanded, isSectionActive)}
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flex={1}
                  gap={2}
                >
                  <Stack alignItems="flex-start" sx={styles.buttonInnerStack}>
                    <Typography
                      color="text.secondary"
                      fontWeight={600}
                      lineHeight={1.5}
                      noWrap
                      sx={styles.typographyTitle}
                    >
                      {sec.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      noWrap
                      sx={styles.typographyValue}
                    >
                      {displayValue}
                    </Typography>
                  </Stack>

                  <IconButton
                    size="medium"
                    onClick={(e) => handleClearSection(e)}
                    sx={styles.clearIconButton(showClearIcon)}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Button>

              {!isExpanded && idx < arr.length - 1 && (
                <Divider orientation="vertical" sx={styles.divider} />
              )}
            </React.Fragment>
          );
        })}

        {isExpanded ? (
          <Button
            onClick={onSearch}
            aria-label="Caută"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CustomSvg src={SearchIcon} sx={styles.searchIcon} />}
            sx={styles.searchSubmitButtonExpanded}
          >
            <span style={styles.searchLabel as React.CSSProperties}>Caută</span>
          </Button>
        ) : (
          <IconButton
            onClick={onSearch}
            aria-label="Caută"
            color="primary"
            sx={styles.searchSubmitButtonCollapsed}
          >
            <CustomSvg src={SearchIcon} sx={styles.searchIcon} />
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
};

export default memo(SearchHeaderBar);

const styles = {
  paper: (isExpanded: boolean) => ({
    "@keyframes searchBarExpandSnap": {
      "0%": { transform: "scale(1, 1)" },
      "68%": { transform: "scale(1, 1.02)" },
      "100%": { transform: "scale(1, 1.015)" },
    },
    border: 1,
    borderColor: "divider",
    position: "relative",
    isolation: "isolate",
    display: "inline-flex",
    maxWidth: "calc(100vw - 64px)",
    p: 1,
    borderRadius: 16,
    backgroundColor: "background.default",
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
          ? "background.default"
          : "rgba(255,255,255,0.8)",
      transform: isExpanded ? "scale(1, 1.015)" : "scale(1, 1)",
      transformOrigin: "center center",
      animation: isExpanded
        ? "searchBarExpandSnap 360ms cubic-bezier(0.16, 1, 0.3, 1) both"
        : "none",
      transition: "transform 0.22s ease-out, box-shadow 0.3s ease",
    },
  }),
  stackContainer: {
    width: "fit-content",
  },
  sectionButton: (isExpanded: boolean, isSectionActive: boolean) => ({
    width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
    flex: "0 0 auto",
    minWidth: 0,
    textTransform: "none",
    borderRadius: 999,
    py: 2,
    px: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    transition:
      "width 0.34s cubic-bezier(0.16, 1, 0.3, 1), padding 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
    overflow: "hidden",
    bgcolor: (theme: Theme) =>
      isSectionActive
        ? theme.palette.mode === "dark"
          ? "secondary.main"
          : "background.default"
        : "transparent",
    boxShadow: isSectionActive ? "0 2px 12px rgba(0,0,0,0.12)" : "none",
    "&:hover": {
      bgcolor: (theme: Theme) =>
        isSectionActive
          ? theme.palette.mode === "dark"
            ? "secondary.main"
            : "background.default"
          : "action.hover",
    },
  }),
  buttonInnerStack: {
    minWidth: 0,
    flex: 1,
  },
  typographyTitle: {
    width: "100%",
  },
  typographyValue: {
    fontSize: "1rem",
    width: "100%",
  },
  clearIconButton: (showClearIcon: boolean) => ({
    p: 0.25,
    opacity: showClearIcon ? 1 : 0,
    visibility: showClearIcon ? "visible" : "hidden",
    transition: "opacity 0.2s ease",
  }),
  divider: {
    height: 28,
    mx: 0.5,
  },
  searchSubmitButtonExpanded: {
    textTransform: "none",
    borderRadius: 50,
    fontWeight: 700,
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    gap: 1,
    height: 55,
    bgcolor: "primary.main",
    color: "common.white",
    "&:hover": {
      bgcolor: "primary.dark",
      boxShadow: "none",
    },
  },
  searchSubmitButtonCollapsed: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    bgcolor: "primary.main",
    color: "common.white",
    p: 0,
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
  searchLabel: {
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  searchIcon: {
    width: 22.5,
    height: 22.5,
  },
};
