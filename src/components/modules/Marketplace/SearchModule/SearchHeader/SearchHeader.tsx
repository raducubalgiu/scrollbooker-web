import { Portal, Stack, Box } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import BusinessDomainsTabs from "../BusinessDomainsTabs";
import { SearchHeaderSectionType } from "@/components/modules/Marketplace/SearchModule/SearchHeaderSectionEnum";
import SearchPopperSections from "./SearchPopperSections";
import SearchHeaderBar from "./SearchHeaderBar";
import {
  createHandleMouseDown,
  useSearchHeaderScrollLock,
} from "./search-header-utils";

export type SearchHeaderState = {
  selectedBusinessDomainId: number | null;
  selectedServiceDomainId: number | null;
  selectedServiceId: number | null;
};

type SearchHeaderProps = {
  isMapVisible: boolean;
  onOpenFilters: () => void;
  onToggleMap: () => void;
  onHeightChange?: (height: number) => void;
  mainPagePadding?: number | string;
  onSearch: (state: SearchHeaderState) => void;
  headerState: SearchHeaderState;
};

const SearchHeader = ({
  isMapVisible,
  onOpenFilters,
  onToggleMap,
  onHeightChange,
  mainPagePadding = 0,
  onSearch,
  headerState,
}: SearchHeaderProps) => {
  const theme = useTheme();
  const [state, setState] = useState<SearchHeaderState>(headerState);

  useEffect(() => {
    setState(headerState);
  }, [headerState]);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pillRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] =
    React.useState<SearchHeaderSectionType | null>(null);

  const isExpanded = activeSection !== null;
  const isExpandedRef = React.useRef(isExpanded);
  isExpandedRef.current = isExpanded;

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
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const handleMouseDown = React.useCallback(
    createHandleMouseDown({
      isExpandedRef,
      popperRef,
      pillRef,
      onOutsideClick: () => setActiveSection(null),
    }),
    []
  );

  useSearchHeaderScrollLock({
    isExpanded,
    popperRef,
    pillRef,
  });

  const backDrop = React.useMemo(
    () => (
      <Portal>
        {isExpanded && (
          <Box
            onClick={() => {
              setState(headerState);
              closeSection();
            }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: theme.zIndex.drawer + 1,
              bgcolor: "rgba(0,0,0,0.28)",
            }}
          />
        )}
      </Portal>
    ),
    [isExpanded, closeSection, theme.zIndex, headerState, setState]
  );

  const containerSx = React.useMemo(() => {
    const bg =
      theme.palette.mode === "dark" ? "background.default" : "background.paper";

    return {
      position: "sticky",
      top: 0,
      mt: `calc(-1 * ${mainPagePadding})`,
      zIndex: theme.zIndex.drawer + 2,
      backgroundColor: bg,
      pt: `calc(${mainPagePadding} + ${theme.spacing(1)})`,
      pb: 2.5,
      ...(isExpanded
        ? {
            position: "sticky",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.28)",
              pointerEvents: "none",
              zIndex: theme.zIndex.drawer + 1,
            },
          }
        : {}),
    } as const;
  }, [isExpanded, mainPagePadding, theme.palette.mode, theme.zIndex]);

  const pillSx = React.useMemo(
    () => ({ position: "relative", zIndex: theme.zIndex.drawer + 3 }),
    [theme.zIndex]
  );

  const handleBusinessDomainChange = (id: number | null) => {
    setState((prev) => ({
      ...prev,
      selectedBusinessDomainId: id,
      selectedServiceDomainId: null,
      selectedServiceId: null,
    }));
  };
  const handleServiceDomainChange = (id: number | null) => {
    setState((prev) => ({
      ...prev,
      selectedServiceDomainId: id,
      selectedServiceId: null,
    }));
  };
  const handleServiceChange = (id: number | null) => {
    setState((prev) => ({ ...prev, selectedServiceId: id }));
  };

  return (
    <>
      {backDrop}

      <Box ref={containerRef} sx={containerSx}>
        <Stack direction="row" justifyContent="center" alignItems="flex-start">
          <Box ref={pillRef} sx={pillSx}>
            <SearchHeaderBar
              isExpanded={isExpanded}
              toggle={toggle}
              activeSection={activeSection}
              onSearch={() => {
                closeSection();
                onSearch(state);
              }}
              popperId="search-popper"
              close={closeSection}
            />

            <SearchPopperSections
              isExpanded={isExpanded}
              pillRef={pillRef}
              popperRef={popperRef}
              activeSection={activeSection}
              popperId="search-popper"
              selectedBusinessDomainId={state.selectedBusinessDomainId}
              onSetBusinessDomainId={handleBusinessDomainChange}
              selectedServiceDomainId={state.selectedServiceDomainId}
              onSetServiceDomainId={handleServiceDomainChange}
              selectedServiceId={state.selectedServiceId}
              onSetServiceId={handleServiceChange}
            />
          </Box>
        </Stack>

        <BusinessDomainsTabs
          isExpanded={isExpanded}
          isMapVisible={isMapVisible}
          onOpenFilters={onOpenFilters}
          onToggleMap={onToggleMap}
          selectedBusinessDomainId={headerState.selectedBusinessDomainId}
          onSelectBusinessDomain={(id) =>
            onSearch({
              ...state,
              selectedBusinessDomainId: id,
              selectedServiceDomainId: null,
              selectedServiceId: null,
            })
          }
        />
      </Box>
    </>
  );
};

export default memo(SearchHeader);
