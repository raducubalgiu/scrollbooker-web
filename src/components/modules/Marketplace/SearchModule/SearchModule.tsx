"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import SearchHeader from "./SearchHeader/SearchHeader";
import SearchMap from "./SearchMap";
import { useTheme } from "@mui/material/styles";
import {
  BoundingBox,
  SearchSortEnum,
} from "@/ts/models/booking/business/search/BusinessMapCombined";
import { useRouter } from "next/navigation";
import { LngLatBounds } from "mapbox-gl";
import { SearchHeaderStateType } from "./SearchHeader/search-header-types";
import SearchFiltersModal from "./SearchFilters/SearchFiltersModal";
import SearchBusinessList from "./SearchBusinessList";
type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export type SearchState = {
  bbox: BoundingBox | null;
  zoom: number | null;
  businessDomainId: number | null;
  serviceDomainId: number | null;
  serviceId: number | null;
  subfilterIds: number[];
  startDate: string | null;
  startTime: string | null;
  endTime: string | null;
  hasDiscount: boolean;
  maxPrice: number | null;
  sort: SearchSortEnum | null;
};

export default function SearchModule({ searchParams }: SearchPageProps) {
  const theme = useTheme();
  const mainPagePadding = theme.spacing(2.5);
  const router = useRouter();

  const [searchState, setSearchState] = React.useState<SearchState>(() => ({
    bbox: {
      min_lng:
        typeof searchParams.min_lng === "string"
          ? Number(searchParams.min_lng)
          : 25.961395,
      min_lat:
        typeof searchParams.min_lat === "string"
          ? Number(searchParams.min_lat)
          : 44.202274,
      max_lng:
        typeof searchParams.max_lng === "string"
          ? Number(searchParams.max_lng)
          : 26.243607,
      max_lat:
        typeof searchParams.max_lat === "string"
          ? Number(searchParams.max_lat)
          : 44.650467,
    },
    zoom:
      typeof searchParams.zoom === "string"
        ? Number(searchParams.zoom) || null
        : null,
    businessDomainId:
      typeof searchParams.businessDomain === "string"
        ? Number(searchParams.businessDomain) || null
        : null,
    serviceDomainId:
      typeof searchParams.serviceDomain === "string"
        ? Number(searchParams.serviceDomain) || null
        : null,
    serviceId:
      typeof searchParams.service === "string"
        ? Number(searchParams.service) || null
        : null,
    subfilterIds:
      typeof searchParams.subfilterIds === "string" &&
      searchParams.subfilterIds.length > 0
        ? searchParams.subfilterIds
            .split(",")
            .map(Number)
            .filter((x) => !Number.isNaN(x))
        : [],
    startDate:
      typeof searchParams.startDate === "string"
        ? searchParams.startDate
        : null,
    startTime:
      typeof searchParams.startTime === "string"
        ? searchParams.startTime
        : null,
    endTime:
      typeof searchParams.endTime === "string" ? searchParams.endTime : null,
    hasDiscount: searchParams.hasDiscount === "true",
    maxPrice:
      typeof searchParams.maxPrice === "string"
        ? Number(searchParams.maxPrice) || 1500
        : null,
    sort: Object.values(SearchSortEnum).includes(
      searchParams.sort as SearchSortEnum
    )
      ? (searchParams.sort as SearchSortEnum)
      : SearchSortEnum.RECOMMENDED,
  }));

  const buildUrlParams = React.useCallback((state: SearchState) => {
    const params = new URLSearchParams();
    if (state.bbox) {
      params.set("min_lng", state.bbox.min_lng.toFixed(6));
      params.set("min_lat", state.bbox.min_lat.toFixed(6));
      params.set("max_lng", state.bbox.max_lng.toFixed(6));
      params.set("max_lat", state.bbox.max_lat.toFixed(6));
    }
    if (state.zoom) params.set("zoom", String(state.zoom));
    if (state.businessDomainId != null)
      params.set("businessDomain", String(state.businessDomainId));
    if (state.serviceDomainId != null)
      params.set("serviceDomain", String(state.serviceDomainId));
    if (state.serviceId != null) params.set("service", String(state.serviceId));
    if (state.subfilterIds.length > 0)
      params.set("subfilterIds", state.subfilterIds.join(","));
    if (state.startDate) params.set("startDate", state.startDate);
    if (state.startTime) params.set("startTime", state.startTime);
    if (state.endTime) params.set("endTime", state.endTime);
    if (state.hasDiscount) params.set("hasDiscount", "true");
    if (state.maxPrice != null) params.set("maxPrice", String(state.maxPrice));
    if (state.sort != null) {
      params.set("sort", state.sort);
    }
    return params;
  }, []);

  const [isMapVisible, setIsMapVisible] = React.useState(true);
  const [isMapExpanded, setIsMapExpanded] = React.useState(false);
  const [openFilters, setOpenFilters] = React.useState(false);
  const [searchHeaderHeight, setSearchHeaderHeight] = React.useState(0);

  const handleToggleMap = React.useCallback(() => {
    setIsMapVisible((prev) => !prev);
    setIsMapExpanded((prev) => (prev ? false : prev));
  }, []);

  const handleMapExpandToggle = React.useCallback(() => {
    setIsMapExpanded((prev) => !prev);
    setIsMapVisible(true);
  }, []);

  const handleOpenFilters = React.useCallback(() => setOpenFilters(true), []);
  const handleCloseFilters = React.useCallback(() => setOpenFilters(false), []);

  const hasUserInteracted = React.useRef(false);

  const handleSearch = React.useCallback((state: SearchHeaderStateType) => {
    hasUserInteracted.current = true;
    setSearchState((prev) => ({
      ...prev,
      businessDomainId: state.selectedBusinessDomainId,
      serviceDomainId: state.selectedServiceDomainId,
      serviceId: state.selectedServiceId,
    }));
  }, []);

  const handleApplyFilters = React.useCallback(
    (filters: {
      hasDiscount: boolean | null;
      maxPrice: number | null;
      sort: SearchSortEnum | null;
    }) => {
      hasUserInteracted.current = true;
      setSearchState((prev) => ({
        ...prev,
        hasDiscount: filters.hasDiscount ?? prev.hasDiscount,
        maxPrice: filters.maxPrice ?? prev.maxPrice,
        sort: filters.sort ?? SearchSortEnum.RECOMMENDED,
      }));
      handleCloseFilters();
    },
    [handleCloseFilters]
  );

  const handleSearchFromMap = React.useCallback(
    (bounds: LngLatBounds, zoom: number) => {
      hasUserInteracted.current = true;
      setSearchState((prev) => ({
        ...prev,
        zoom: Math.round(zoom),
        bbox: {
          min_lng: bounds.getWest(),
          min_lat: bounds.getSouth(),
          max_lng: bounds.getEast(),
          max_lat: bounds.getNorth(),
        },
      }));
    },
    []
  );

  React.useEffect(() => {
    if (!hasUserInteracted.current) return;

    const params = buildUrlParams(searchState);
    const currentQuery = window.location.search;
    const newQuery = `?${params.toString()}`;

    if (currentQuery !== newQuery) {
      router.replace(`/search${newQuery}`, { scroll: false });
    }
  }, [searchState, buildUrlParams, router]);

  const areFiltersActive = React.useMemo(() => {
    const isDiscountApplied = searchState.hasDiscount === true;
    const isPriceApplied = (searchState.maxPrice ?? 5000) < 5000;
    const isSortApplied =
      searchState.sort !== null &&
      searchState.sort !== SearchSortEnum.RECOMMENDED;

    return isDiscountApplied || isPriceApplied || isSortApplied;
  }, [searchState.hasDiscount, searchState.maxPrice, searchState.sort]);

  return (
    <Box sx={{ px: isMapExpanded ? 0 : mainPagePadding }}>
      <SearchFiltersModal
        open={openFilters}
        onClose={handleCloseFilters}
        hasDiscount={searchState.hasDiscount}
        maxPrice={searchState.maxPrice}
        sort={searchState.sort}
        onApplyFilters={handleApplyFilters}
      />

      <SearchHeader
        isMapVisible={isMapVisible}
        onToggleMap={handleToggleMap}
        onHeightChange={setSearchHeaderHeight}
        onOpenFilters={handleOpenFilters}
        mainPagePadding={mainPagePadding}
        areFiltersActive={areFiltersActive}
        onSearch={handleSearch}
        headerState={{
          selectedBusinessDomainId: searchState.businessDomainId,
          selectedServiceDomainId: searchState.serviceDomainId,
          selectedServiceId: searchState.serviceId,
        }}
      />

      <Grid container spacing={isMapExpanded ? 0 : 4}>
        {!isMapExpanded && (
          <Grid size={{ xs: 12, lg: isMapVisible ? 7 : 12 }} sx={{ mt: 1 }}>
            <SearchBusinessList
              searchState={searchState}
              isMapVisible={isMapVisible}
            />
          </Grid>
        )}

        {isMapVisible && (
          <Grid
            size={{ xs: 12, lg: isMapExpanded ? 12 : 5 }}
            sx={{ width: "100%" }}
          >
            <SearchMap
              searchState={searchState}
              isMapVisible={isMapVisible}
              onMapExpandToggle={handleMapExpandToggle}
              isMapExpanded={isMapExpanded}
              searchHeaderHeight={searchHeaderHeight}
              mainPagePadding={mainPagePadding}
              refetchData={handleSearchFromMap}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
