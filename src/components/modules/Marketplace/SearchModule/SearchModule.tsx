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

  const [searchState, setSearchState] = React.useState<SearchState>(() => {
    return {
      bbox: {
        min_lng: 25.961395,
        min_lat: 44.202274,
        max_lng: 26.243607,
        max_lat: 44.650467,
      },
      zoom: Number(searchParams.zoom) || null,
      businessDomainId: Number(searchParams.businessDomain) || null,
      serviceDomainId: Number(searchParams.serviceDomain) || null,
      serviceId: Number(searchParams.service) || null,
      subfilterIds: [],
      startDate: String(searchParams.startDate) || null,
      startTime: String(searchParams.startTime) || null,
      endTime: String(searchParams.endTime) || null,
      hasDiscount: String(searchParams.hasDiscount) === "true",
      maxPrice: Number(searchParams.maxPrice) || 1500,
    };
  });

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
      setSearchState((prev) => ({
        ...prev,
        hasDiscount: filters.hasDiscount ?? prev.hasDiscount,
        maxPrice: filters.maxPrice ?? prev.maxPrice,
      }));
      handleCloseFilters();
    },
    [handleCloseFilters]
  );

  const handleSearch = React.useCallback((state: SearchHeaderState) => {
    setSearchState((prev) => ({
      ...prev,
      businessDomainId: state.selectedBusinessDomainId,
      serviceDomainId: state.selectedServiceDomainId,
      serviceId: state.selectedServiceId,
    }));

    const params = new URLSearchParams();
    if (state.selectedBusinessDomainId)
      params.set("businessDomain", String(state.selectedBusinessDomainId));
    if (state.selectedServiceDomainId)
      params.set("serviceDomain", String(state.selectedServiceDomainId));
    if (state.selectedServiceId)
      params.set("service", String(state.selectedServiceId));

    router.replace(`/search?${params.toString()}`);
  }, []);

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
