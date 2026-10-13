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
import {
  SearchHeaderSectionEnum,
  SearchHeaderSectionType,
} from "@/components/modules/Marketplace/SearchModule/SearchHeaderSectionEnum";
import SearchPopperSections from "./SearchPopperSections";
import SearchHeaderBar from "./SearchHeaderBar";
import {
  createHandleMouseDown,
  useSearchHeaderScrollLock,
} from "./search-header-utils";
import { SearchHeaderStateType } from "./search-header-types";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { getSelectedServicesLabel } from "./getSelectedServicesLabel";
import { getDateTimeLabel } from "./getDateTimeLabel";
import { useGetServicesByServiceDomain } from "@/controllers/nomenclature/service.controller";
import { useGetFiltersByService } from "@/controllers/nomenclature/filter.controller";

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
  businessDomains?: BusinessDomain[];
};

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
  businessDomains = [],
}: SearchHeaderProps) => {
  const [localHeaderState, setLocalHeaderState] =
    useState<SearchHeaderStateType>(() => ({
      selectedBusinessDomainId: headerState.selectedBusinessDomainId,
      selectedServiceDomainId: headerState.selectedServiceDomainId,
      selectedServiceId: headerState.selectedServiceId,
      selectedSubFilterIds: headerState.selectedSubFilterIds,
      startDate: headerState.startDate,
      startTime: headerState.startTime,
      endTime: headerState.endTime,
    }));

  useEffect(() => {
    setLocalHeaderState(headerState);
  }, [headerState]);

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

  const { data: selectedDomainServices } = useGetServicesByServiceDomain({
    serviceDomainId: localHeaderState.selectedServiceDomainId,
  });

  const { data: selectedServiceFilters } = useGetFiltersByService({
    serviceId: String(localHeaderState.selectedServiceId),
    isEnabled: !!localHeaderState.selectedServiceId,
  });

  const selectedServiceDomainName = useMemo(
    () =>
      getSelectedServicesLabel({
        businessDomains,
        selectedServiceDomainId: localHeaderState.selectedServiceDomainId,
        selectedServiceId: localHeaderState.selectedServiceId,
        selectedSubFilterIds: localHeaderState.selectedSubFilterIds,
        services: selectedDomainServices,
        filters: selectedServiceFilters,
      }),
    [
      businessDomains,
      localHeaderState.selectedServiceDomainId,
      localHeaderState.selectedServiceId,
      localHeaderState.selectedSubFilterIds,
      selectedDomainServices,
      selectedServiceFilters,
    ]
  );

  const closeSection = useCallback(() => {
    setActiveSection(null);
    setLocalHeaderState(headerState);
  }, [headerState]);

  const toggle = useCallback(
    (section: SearchHeaderSectionType) => {
      setActiveSection((prev) => {
        if (prev === section) {
          setLocalHeaderState(headerState);
          return null;
        }
        return section;
      });
    },
    [headerState]
  );

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
    setLocalHeaderState((prev) => ({
      ...prev,
      selectedBusinessDomainId: id,
      selectedServiceDomainId: null,
      selectedServiceId: null,
      selectedSubFilterIds: [],
    }));
  }, []);

  const handleServiceDomainChange = useCallback((id: number | null) => {
    setLocalHeaderState((prev) => ({
      ...prev,
      selectedServiceDomainId: id,
      selectedServiceId: null,
      selectedSubFilterIds: [],
    }));
  }, []);

  const handleServiceChange = useCallback((id: number | null) => {
    setLocalHeaderState((prev) => ({
      ...prev,
      selectedServiceId: id,
      selectedSubFilterIds: [],
    }));
  }, []);

  const handleSubFilterIdsChange = useCallback((ids: number[]) => {
    setLocalHeaderState((prev) => ({ ...prev, selectedSubFilterIds: ids }));
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

  const handleExecuteSearch = useCallback(() => {
    closeSection();
    onSearch(localHeaderState);
  }, [closeSection, localHeaderState, onSearch]);

  const handleExecuteSearchWithState = useCallback(
    (partialState: Partial<SearchHeaderStateType>) => {
      const nextState = { ...localHeaderState, ...partialState };
      setLocalHeaderState(nextState);
      closeSection();
      onSearch(nextState);
    },
    [localHeaderState, closeSection, onSearch]
  );

  const handleClearSection = useCallback((section: SearchHeaderSectionType) => {
    if (section === SearchHeaderSectionEnum.Services) {
      setLocalHeaderState((prev) => ({
        ...prev,
        selectedServiceDomainId: null,
        selectedServiceId: null,
        selectedSubFilterIds: [],
      }));
    }
  }, []);

  const selectedDateTimeLabel = getDateTimeLabel({
    startDate: localHeaderState.startDate,
    startTime: localHeaderState.startTime,
    endTime: localHeaderState.endTime,
  });

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
              onClearSection={handleClearSection}
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
                onSetSubFilterIds: handleSubFilterIdsChange,
                onSetDateTime: handleDateTimeChange,
                onExecuteSearch: handleExecuteSearchWithState,
              }}
            />
          </Box>
        </Stack>

        {displayFiltersSection && (
          <BusinessDomainsTabs
            areFiltersActive={areFiltersActive}
            isExpanded={isExpanded}
            isMapVisible={isMapVisible ?? false}
            onOpenFilters={onOpenFilters}
            onToggleMap={onToggleMap}
          />
        )}
      </Box>
    </>
  );
};

export default memo(SearchHeader);

const styles = {
  container: (isExpanded: boolean, mainPagePadding: string | number) => ({
    display: { xs: "none", lg: "block" },
    position: "sticky",
    top: 0,
    mt: `calc(-1 * ${mainPagePadding})`,
    zIndex: (theme: Theme) => theme.zIndex.appBar + 2,
    backgroundColor: "background.default",
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
