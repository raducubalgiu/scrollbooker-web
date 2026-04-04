"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import SearchHeader, { SearchHeaderState } from "./SearchHeader/SearchHeader";
import BusinessCard from "./BusinessCard";
import FiltersModal from "./FiltersModal";
import BusinessCardSkeleton from "./BusinessCardSkeleton";
import { markers } from "./searchMockData";
import SearchMap from "./SearchMap";
import { useTheme } from "@mui/material/styles";
import { BoundingBox } from "@/ts/models/booking/business/search/BusinessMapCombined";
import { useRouter } from "next/navigation";
import { useInfiniteBusinessLocations } from "@/hooks/infiniteQuery/useInfiniteBusinessLocations";

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
  maxPrice: number;
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
        : 1500,
  }));

  console.log("Search state:", searchState);

  const { data, isLoading } = useInfiniteBusinessLocations(searchState);
  const locations = data ? data.pages.flatMap((page) => page.results) : [];
  const locationsCount = data ? data.pages[0]?.count : 0;

  const [isMapVisible, setIsMapVisible] = React.useState(true);
  const [isMapExpanded, setIsMapExpanded] = React.useState(false);
  const [openFilters, setOpenFilters] = React.useState(false);
  const [searchHeaderHeight, setSearchHeaderHeight] = React.useState(0);

  const leftGridSize = isMapVisible ? 7 : 12;

  const styles = {
    list: {
      display: "grid",
      gridTemplateColumns: {
        lg: "1fr",
        xl: isMapVisible ? "1fr 1fr" : "repeat(3, 1fr)",
      },
      gap: 5,
      px: { xs: 1, md: 0 },
    },
  };

  const handleToggleMap = React.useCallback(
    () => setIsMapVisible((prev) => !prev),
    []
  );
  const handleMapExpandToggle = React.useCallback(
    () => setIsMapExpanded((prev) => !prev),
    []
  );
  const handleOpenFilters = React.useCallback(() => setOpenFilters(true), []);
  const handleCloseFilters = React.useCallback(() => setOpenFilters(false), []);

  const handleApplyFilters = React.useCallback(
    (filters: { hasDiscount: boolean | null; maxPrice: number | null }) => {
      const nextState: SearchState = {
        ...searchState,
        hasDiscount: filters.hasDiscount ?? searchState.hasDiscount,
        maxPrice: filters.maxPrice ?? searchState.maxPrice,
      };

      setSearchState(nextState);

      const params = buildUrlParams(nextState);
      router.replace(`/search?${params.toString()}`);

      handleCloseFilters();
    },
    [handleCloseFilters, router, searchState]
  );

  const handleSearch = React.useCallback(
    (state: SearchHeaderState) => {
      const nextState = {
        ...searchState,
        businessDomainId: state.selectedBusinessDomainId,
        serviceDomainId: state.selectedServiceDomainId,
        serviceId: state.selectedServiceId,
      };

      setSearchState(nextState);

      const params = buildUrlParams(nextState);
      router.replace(`/search?${params.toString()}`);
    },
    [router]
  );

  return (
    <Box>
      <FiltersModal
        open={openFilters}
        onClose={handleCloseFilters}
        hasDiscount={searchState.hasDiscount}
        maxPrice={searchState.maxPrice}
        onApplyFilters={handleApplyFilters}
      />

      <SearchHeader
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

      <Grid container spacing={5}>
        <Grid size={{ lg: leftGridSize }}>
          <Typography color="text.secondary" my={2.5}>
            {locationsCount?.toLocaleString() ?? 0} de rezultate in zona
          </Typography>

          <Box sx={styles.list}>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            {!isLoading &&
              locations?.map((b) => <BusinessCard key={b.id} business={b} />)}
          </Box>
        </Grid>
        {isMapVisible && (
          <Grid size={{ md: 5 }}>
            <SearchMap
              markers={markers}
              isMapVisible={isMapVisible}
              onMapExpandToggle={handleMapExpandToggle}
              isMapExpanded={isMapExpanded}
              searchHeaderHeight={searchHeaderHeight}
              mainPagePadding={mainPagePadding}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

const buildUrlParams = (state: SearchState) => {
  const params = new URLSearchParams();

  if (state.zoom != null) {
    params.set("zoom", String(state.zoom));
  }

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
};
