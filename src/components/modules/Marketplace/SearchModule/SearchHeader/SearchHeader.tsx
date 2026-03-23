import {
  Button,
  Divider,
  Grow,
  Paper,
  Popper,
  Portal,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import BusinessDomainsTabs from "../BusinessDomainsTabs";
import {
  SEARCH_HEADER_SECTIONS,
  SearchHeaderSectionEnum,
  SearchHeaderSectionType,
} from "@/components/modules/Marketplace/SearchModule/SearchHeaderSectionEnum";
import SearchServicesSection from "./SearchServicesSection";
import SearchLocationSection from "./SearchLocationSection";
import SearchDateTimeSection from "./SearchDateTimeSection";

type SearchHeaderProps = {
  isMapVisible: boolean;
  onOpenFilters: () => void;
  onToggleMap: () => void;
  onHeightChange?: (height: number) => void;
  mainPagePadding?: number | string;
};

const POPPER_MODIFIERS = [{ name: "offset", options: { offset: [0, 12] } }];

const SearchHeader = ({
  isMapVisible,
  onOpenFilters,
  onToggleMap,
  onHeightChange,
  mainPagePadding = 0,
}: SearchHeaderProps) => {
  const theme = useTheme();

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pillRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] =
    React.useState<SearchHeaderSectionType | null>(null);

  const isExpanded = activeSection !== null;
  const isExpandedRef = React.useRef(isExpanded);
  isExpandedRef.current = isExpanded;
  const searchButtonWidth = React.useMemo(
    () => (isExpanded ? 278 : 220),
    [isExpanded]
  );

  const closeSection = React.useCallback(() => setActiveSection(null), []);

  const toggle = React.useCallback((section: SearchHeaderSectionType) => {
    setActiveSection((prev) => (prev === section ? null : section));
  }, []);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element || !onHeightChange) return;

    const notifyHeight = () =>
      onHeightChange(element.getBoundingClientRect().height);

    notifyHeight();

    const ro = new ResizeObserver(notifyHeight);
    ro.observe(element);
    return () => ro.disconnect();
  }, [onHeightChange]);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!isExpandedRef.current) return;

      const targetNode = e.target as Node;
      if (popperRef.current?.contains(targetNode)) return;
      if (pillRef.current?.contains(targetNode)) return;

      setActiveSection(null);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

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

  return (
    <>
      <Portal>
        {isExpanded && (
          <Box
            onClick={closeSection}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: "rgba(0,0,0,0.28)",
            }}
          />
        )}
      </Portal>

      <Box
        ref={containerRef}
        sx={{
          position: "sticky",
          top: 0,
          mt: `calc(-1 * ${mainPagePadding})`,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          backgroundColor: isExpanded
            ? "transparent"
            : theme.palette.mode === "dark"
              ? "background.default"
              : "background.paper",
          pt: (theme) => `calc(${mainPagePadding} + ${theme.spacing(1)})`,
          pb: 2.5,
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="flex-start">
          <Box ref={pillRef} sx={{ position: "relative" }}>
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
                      sx={buttonSxBySection[sec.key]}
                      color="secondary"
                      onClick={() => toggle(sec.key as any)}
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
                      <Divider
                        orientation="vertical"
                        sx={{ height: 28, mx: 0.5 }}
                      />
                    )}
                  </React.Fragment>
                ))}

                <Tooltip title="Caută" arrow>
                  <IconButton
                    onClick={() => {}}
                    size="large"
                    aria-label="Caută"
                    sx={{
                      ml: 0.5,
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.common.white,
                      p: 1,
                      borderRadius: "50%",
                      "&:hover": {
                        bgcolor: (theme) => theme.palette.primary.dark,
                      },
                    }}
                  >
                    <SearchIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>

            <Popper
              open={isExpanded}
              anchorEl={pillRef.current}
              placement="bottom"
              transition
              modifiers={POPPER_MODIFIERS}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 3 }}
            >
              {({ TransitionProps }) => (
                <Grow
                  {...TransitionProps}
                  timeout={260}
                  style={{ transformOrigin: "top center" }}
                >
                  <Paper
                    ref={popperRef}
                    elevation={8}
                    sx={{
                      borderRadius: 5,
                      p: 3,
                      minHeight: 160,
                      minWidth: 600,
                    }}
                  >
                    {activeSection === SearchHeaderSectionEnum.Services && (
                      <SearchServicesSection />
                    )}
                    {activeSection === SearchHeaderSectionEnum.Location && (
                      <SearchLocationSection />
                    )}
                    {activeSection === SearchHeaderSectionEnum.Datetime && (
                      <SearchDateTimeSection />
                    )}
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Stack>

        <BusinessDomainsTabs
          isExpanded={isExpanded}
          isMapVisible={isMapVisible}
          onOpenFilters={onOpenFilters}
          onToggleMap={onToggleMap}
        />
      </Box>
    </>
  );
};

export default SearchHeader;
