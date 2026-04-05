"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import SearchHeader from "./SearchHeader/SearchHeader";
import BusinessCard from "./BusinessCard";
import FiltersModal from "./FiltersModal";
import SearchMap from "./SearchMap";
import { useTheme } from "@mui/material/styles";
import { BoundingBox } from "@/ts/models/booking/business/search/BusinessMapCombined";
import { useRouter } from "next/navigation";
import { useInfiniteBusinessLocations } from "@/hooks/infiniteQuery/useInfiniteBusinessLocations";
import { useBusinessMarkers } from "@/hooks/useMarkers";
import { LngLatBounds } from "mapbox-gl";
import BusinessCardSkeletons from "./BusinessCardSkeletons";
import { getServiceDomainNameById } from "@/utils/mvp-hardcoded/mvp-business-domains";
import { SearchHeaderStateType } from "./SearchHeader/search-header-types";

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
};

export default function SearchModule({ searchParams }: SearchPageProps) {
  const theme = useTheme();
  const mainPagePadding = theme.spacing(2.5);
  const router = useRouter();

  const [searchState, setSearchState] = React.useState<SearchState>(() => ({
    bbox: {
      min_lng: 25.961395,
      min_lat: 44.202274,
      max_lng: 26.243607,
      max_lat: 44.650467,
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

    if (state.businessDomainId != null) {
      params.set("businessDomain", String(state.businessDomainId));
    }

    if (state.serviceDomainId != null) {
      params.set("serviceDomain", String(state.serviceDomainId));
    }

    if (state.serviceId != null) {
      params.set("service", String(state.serviceId));
    }

    if (state.subfilterIds.length > 0) {
      params.set("subfilterIds", state.subfilterIds.join(","));
    }

    if (state.startDate) {
      params.set("startDate", state.startDate);
    }

    if (state.startTime) {
      params.set("startTime", state.startTime);
    }

    if (state.endTime) {
      params.set("endTime", state.endTime);
    }

    if (state.hasDiscount) {
      params.set("hasDiscount", "true");
    }

    if (state.maxPrice != null) {
      params.set("maxPrice", String(state.maxPrice));
    }

    return params;
  }, []);

  const { data, isLoading } = useInfiniteBusinessLocations(searchState);
  const locations = data ? data.pages.flatMap((page) => page.results) : [];
  const locationsCount = data ? data.pages[0]?.count : 0;

  const {
    data: markers,
    isLoading: isLoadingMarkers,
    isRefetching: isRefetchingMarkers,
  } = useBusinessMarkers(searchState);

  const [isMapVisible, setIsMapVisible] = React.useState(true);
  const [isMapExpanded, setIsMapExpanded] = React.useState(false);
  const [openFilters, setOpenFilters] = React.useState(false);
  const [searchHeaderHeight, setSearchHeaderHeight] = React.useState(0);

  const leftGridSize = isMapVisible ? 7 : 12;

  const handleToggleMap = React.useCallback(() => {
    setIsMapVisible((prev) => !prev);
    if (isMapExpanded) {
      setIsMapExpanded(false);
    }
  }, []);

  const handleMapExpandToggle = React.useCallback(() => {
    setIsMapExpanded((prev) => !prev);
    setIsMapVisible(true);
  }, []);

  const handleOpenFilters = React.useCallback(() => setOpenFilters(true), []);
  const handleCloseFilters = React.useCallback(() => setOpenFilters(false), []);

  const styles = React.useMemo(
    () => ({
      root: {
        px: isMapExpanded ? 0 : mainPagePadding,
      },
      list: {
        display: "grid",
        gridTemplateColumns: {
          lg: "1fr",
          xl: isMapVisible ? "1fr 1fr" : "repeat(3, 1fr)",
        },
        gap: 5,
        px: { xs: 1, md: 0 },
      },
      mapGrid: {
        width: "100%",
      },
    }),
    [isMapExpanded, mainPagePadding, isMapVisible]
  );

  const handleSearch = React.useCallback((state: SearchHeaderStateType) => {
    setSearchState((prev) => ({
      ...prev,
      businessDomainId: state.selectedBusinessDomainId,
      serviceDomainId: state.selectedServiceDomainId,
      serviceId: state.selectedServiceId,
    }));
  }, []);

  const handleApplyFilters = React.useCallback(
    (filters: { hasDiscount: boolean | null; maxPrice: number | null }) => {
      setSearchState((prev) => ({
        ...prev,
        hasDiscount: filters.hasDiscount ?? prev.hasDiscount,
        maxPrice: filters.maxPrice ?? prev.maxPrice,
      }));
      handleCloseFilters();
    },
    [handleCloseFilters]
  );

  const handleSearchFromMap = React.useCallback(
    (bounds: LngLatBounds, zoom: number) => {
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
    const params = buildUrlParams(searchState);
    const currentQuery = window.location.search;
    const newQuery = `?${params.toString()}`;

    if (currentQuery !== newQuery) {
      router.replace(`/search${newQuery}`, { scroll: false });
    }
  }, [searchState, buildUrlParams, router]);

  const selectedServiceDomainName = getServiceDomainNameById(
    searchState.businessDomainId,
    searchState.serviceDomainId
  );

  return (
    <Box sx={styles.root}>
      <FiltersModal
        open={openFilters}
        onClose={handleCloseFilters}
        hasDiscount={searchState.hasDiscount}
        maxPrice={searchState.maxPrice}
        onApplyFilters={handleApplyFilters}
      />

      <SearchHeader
        selectedServiceDomainName={selectedServiceDomainName}
        isMapVisible={isMapVisible}
        onToggleMap={handleToggleMap}
        onHeightChange={setSearchHeaderHeight}
        onOpenFilters={handleOpenFilters}
        mainPagePadding={mainPagePadding}
        onSearch={handleSearch}
        headerState={{
          selectedBusinessDomainId: searchState.businessDomainId,
          selectedServiceDomainId: searchState.serviceDomainId,
          selectedServiceId: searchState.serviceId,
        }}
      />

      <Grid container spacing={isMapExpanded ? 0 : 5}>
        {!isMapExpanded && (
          <Grid size={{ lg: leftGridSize }}>
            <Typography variant="h5" my={2.5} fontWeight={600}>
              {locationsCount?.toLocaleString() ?? 0} rezultate
            </Typography>

            <Box sx={styles.list}>
              {isLoading && <BusinessCardSkeletons />}
              {!isLoading &&
                locations?.map((b) => <BusinessCard key={b.id} business={b} />)}
            </Box>
          </Grid>
        )}
        {isMapVisible && (
          <Grid size={isMapExpanded ? 12 : { md: 5 }} sx={styles.mapGrid}>
            <SearchMap
              markers={markers}
              isMapVisible={isMapVisible}
              onMapExpandToggle={handleMapExpandToggle}
              isMapExpanded={isMapExpanded}
              searchHeaderHeight={searchHeaderHeight}
              mainPagePadding={mainPagePadding}
              isLoadingMarkers={isLoadingMarkers}
              isRefetchingMarkers={isRefetchingMarkers}
              refetchData={handleSearchFromMap}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
