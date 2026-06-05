import { Portal, Stack, Box, Theme } from "@mui/material";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BusinessDomainsTabs from "../BusinessDomainsTabs";
import { SearchHeaderSectionType } from "@/components/modules/Marketplace/SearchModule/SearchHeaderSectionEnum";
import SearchPopperSections from "./SearchPopperSections";
import SearchHeaderBar from "./SearchHeaderBar";
import {
  createHandleMouseDown,
  useSearchHeaderScrollLock,
} from "./search-header-utils";
import { SearchHeaderStateType } from "./search-header-types";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { useCustomQuery } from "@/hooks/useHttp";
import { getServiceDomainName } from "./getServiceDomainName";
import dayjs from "@/lib/dayjs";

type SearchHeaderProps = {
  areFiltersActive: boolean;
  headerState: SearchHeaderStateType;
  onSearch: (state: SearchHeaderStateType) => void;
  displayFiltersSection?: boolean;
  mainPagePadding?: number | string;
  isMapVisible?: boolean;
  onOpenFilters?: () => void;
  onToggleMap?: () => void;
  onHeightChange?: (height: number) => void;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const SearchHeader = ({
  areFiltersActive,
  headerState,
  onSearch,
  isMapVisible,
  onOpenFilters,
  onToggleMap,
  onHeightChange,
  mainPagePadding = 0,
  displayFiltersSection = true,
}: SearchHeaderProps) => {
  const [localHeaderState, setLocalHeaderState] =
    useState<SearchHeaderStateType>(() => ({
      selectedBusinessDomainId: headerState.selectedBusinessDomainId,
      selectedServiceDomainId: headerState.selectedServiceDomainId,
      selectedServiceId: headerState.selectedServiceId,
      startDate: headerState.startDate, // Preluate din searchState-ul original al URL-ului
      startTime: headerState.startTime,
      endTime: headerState.endTime,
    }));

  // Efect de sincronizare extins pentru ID-uri și valori primitive
  useEffect(() => {
    setLocalHeaderState({
      selectedBusinessDomainId: headerState.selectedBusinessDomainId,
      selectedServiceDomainId: headerState.selectedServiceDomainId,
      selectedServiceId: headerState.selectedServiceId,
      startDate: headerState.startDate,
      startTime: headerState.startTime,
      endTime: headerState.endTime,
    });
  }, [
    headerState.selectedBusinessDomainId,
    headerState.selectedServiceDomainId,
    headerState.selectedServiceId,
    headerState.startDate,
    headerState.startTime,
    headerState.endTime,
  ]);

  const [activeSection, setActiveSection] =
    useState<SearchHeaderSectionType | null>(null);
  const isExpanded = activeSection !== null;

  const isExpandedRef = useRef(isExpanded);
  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const popperRef = useRef<HTMLDivElement | null>(null);

  const { data: businessDomains } = useCustomQuery<BusinessDomain[]>({
    key: ["business-domains"],
    url: "/api/nomenclatures/business-domains",
    options: {
      staleTime: ONE_DAY_IN_MS,
      gcTime: ONE_DAY_IN_MS,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  });

  const selectedServiceDomainName = useMemo(
    () =>
      getServiceDomainName(
        businessDomains,
        headerState.selectedBusinessDomainId,
        headerState.selectedServiceDomainId
      ),
    [
      businessDomains,
      headerState.selectedBusinessDomainId,
      headerState.selectedServiceDomainId,
    ]
  );

  const closeSection = useCallback(() => setActiveSection(null), []);

  const toggle = useCallback((section: SearchHeaderSectionType) => {
    setActiveSection((prev) => (prev === section ? null : section));
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !onHeightChange) return;

    const notifyHeight = () =>
      onHeightChange(element.getBoundingClientRect().height);
    notifyHeight();

    const ro = new ResizeObserver(notifyHeight);
    ro.observe(element);
    return () => ro.disconnect();
  }, [onHeightChange]);

  const handleMouseDown = useCallback(
    createHandleMouseDown({
      isExpandedRef,
      popperRef,
      pillRef,
      onOutsideClick: closeSection,
    }),
    [closeSection]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [handleMouseDown]);

  useSearchHeaderScrollLock({
    isExpanded,
    popperRef,
    pillRef,
  });

  const handleBusinessDomainChange = useCallback((id: number | null) => {
    setLocalHeaderState({
      selectedBusinessDomainId: id,
      selectedServiceDomainId: null,
      selectedServiceId: null,
      startDate: null,
      startTime: null,
      endTime: null,
    });
  }, []);

  const handleServiceDomainChange = useCallback((id: number | null) => {
    setLocalHeaderState((prev) => ({
      ...prev,
      selectedServiceDomainId: id,
      selectedServiceId: null,
    }));
  }, []);

  const handleServiceChange = useCallback((id: number | null) => {
    setLocalHeaderState((prev) => ({ ...prev, selectedServiceId: id }));
  }, []);

  const handleDateTimeChange = useCallback(
    (dateTime: {
      startDate: string | null;
      startTime: string | null;
      endTime: string | null;
    }) => {
      setLocalHeaderState((prev) => ({
        ...prev,
        ...dateTime,
      }));
    },
    []
  );

  const selectedDateTimeLabel = useMemo(() => {
    const { startDate, startTime, endTime } = headerState;

    if (!startDate) return null;
    const formattedDate = dayjs(startDate).format("D MMM");

    if (startTime && endTime) {
      return `${formattedDate}, ${startTime} - ${endTime}`;
    }

    if (startTime) {
      return `${formattedDate}, de la ${startTime}`;
    }

    return formattedDate;
  }, [headerState.startDate, headerState.startTime, headerState.endTime]);

  const handleExecuteSearch = useCallback(() => {
    closeSection();
    onSearch(localHeaderState);
  }, [closeSection, localHeaderState, onSearch]);

  return (
    <>
      <Portal>
        {isExpanded && <Box onClick={closeSection} sx={styles.backdrop} />}
      </Portal>

      <Box
        ref={containerRef}
        sx={styles.container(isExpanded, mainPagePadding)}
      >
        <Stack direction="row" justifyContent="center" alignItems="flex-start">
          <Box ref={pillRef} sx={styles.pill}>
            <SearchHeaderBar
              selectedServiceDomainName={selectedServiceDomainName}
              selectedDateTimeLabel={selectedDateTimeLabel}
              isExpanded={isExpanded}
              toggle={toggle}
              activeSection={activeSection}
              onSearch={handleExecuteSearch}
              popperId="search-popper"
              close={closeSection}
            />

            <SearchPopperSections
              businessDomains={businessDomains || []}
              isExpanded={isExpanded}
              pillRef={pillRef}
              popperRef={popperRef}
              activeSection={activeSection}
              popperId="search-popper"
              state={localHeaderState}
              actions={{
                onSetBusinessDomainId: handleBusinessDomainChange,
                onSetServiceDomainId: handleServiceDomainChange,
                onSetServiceId: handleServiceChange,
                onSetDateTime: handleDateTimeChange,
              }}
            />
          </Box>
        </Stack>

        {displayFiltersSection && (
          <BusinessDomainsTabs
            businessDomains={businessDomains || []}
            areFiltersActive={areFiltersActive}
            isExpanded={isExpanded}
            isMapVisible={isMapVisible ?? false}
            onOpenFilters={onOpenFilters}
            onToggleMap={onToggleMap}
            selectedBusinessDomainId={headerState.selectedBusinessDomainId}
            onSelectBusinessDomain={(id) =>
              onSearch({
                ...headerState,
                selectedBusinessDomainId: id,
                selectedServiceDomainId: null,
                selectedServiceId: null,
              })
            }
          />
        )}
      </Box>
    </>
  );
};

export default memo(SearchHeader);

const styles = {
  container: (isExpanded: boolean, mainPagePadding: string | number) => ({
    position: "sticky",
    top: 0,
    mt: `calc(-1 * ${mainPagePadding})`,
    zIndex: (theme: Theme) => theme.zIndex.appBar + 2,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === "dark" ? "background.default" : "background.paper",
    pt: (theme: Theme) => `calc(${mainPagePadding} + ${theme.spacing(1)})`,
    pb: 2.5,
    ...(isExpanded && {
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.28)",
        pointerEvents: "none",
        zIndex: (theme: Theme) => theme.zIndex.appBar + 1,
      },
    }),
  }),
  pill: {
    position: "relative",
    zIndex: (theme: Theme) => theme.zIndex.drawer + 3,
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: (theme: Theme) => theme.zIndex.appBar + 1,
    bgcolor: "rgba(0,0,0,0.28)",
  },
};
