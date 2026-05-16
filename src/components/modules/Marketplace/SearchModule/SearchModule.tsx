"use client";

import * as React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, CircularProgress } from "@mui/material";
import SearchHeader from "./SearchHeader/SearchHeader";
import SearchMap from "./SearchMap";
import { useTheme } from "@mui/material/styles";
import { BoundingBox } from "@/ts/models/booking/business/search/BusinessMapCombined";
import { useRouter } from "next/navigation";
import { useInfiniteBusinessLocations } from "@/hooks/infiniteQuery/useInfiniteBusinessLocations";
import { useBusinessMarkers } from "@/hooks/useMarkers";
import { LngLatBounds } from "mapbox-gl";
import BusinessCardSkeletons from "./BusinessCard/BusinessCardSkeletons";
import { getServiceDomainNameById } from "@/utils/mvp-hardcoded/mvp-business-domains";
import { SearchHeaderStateType } from "./SearchHeader/search-header-types";
import BusinessCard from "./BusinessCard/BusinessCard";
import SearchFiltersModal from "./SearchFilters/SearchFiltersModal";

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
    return params;
  }, []);

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBusinessLocations(searchState);

  console.log("DATA!!!", data);

  const locations = React.useMemo(() => {
    if (!data) return [];

    const allResults = data.pages.flatMap((page) => page.results || []);

    const seenIds = new Set<number>();
    return allResults.filter((loc) => {
      if (loc?.id == null || seenIds.has(loc.id)) {
        return false;
      }
      seenIds.add(loc.id);
      return true;
    });
  }, [data]);

  const {
    data: markers,
    isLoading: isLoadingMarkers,
    isRefetching: isRefetchingMarkers,
  } = useBusinessMarkers(searchState);

  const [isMapVisible, setIsMapVisible] = React.useState(true);
  const [isMapExpanded, setIsMapExpanded] = React.useState(false);
  const [openFilters, setOpenFilters] = React.useState(false);
  const [searchHeaderHeight, setSearchHeaderHeight] = React.useState(0);

  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  const leftGridSize = isMapVisible ? 7 : 12;

  const handleToggleMap = React.useCallback(() => {
    setIsMapVisible((prev) => !prev);
    if (isMapExpanded) setIsMapExpanded(false);
  }, [isMapExpanded]);

  const handleMapExpandToggle = React.useCallback(() => {
    setIsMapExpanded((prev) => !prev);
    setIsMapVisible(true);
  }, []);

  const handleOpenFilters = React.useCallback(() => setOpenFilters(true), []);
  const handleCloseFilters = React.useCallback(() => setOpenFilters(false), []);

  const styles = React.useMemo(
    () => ({
      root: { px: isMapExpanded ? 0 : mainPagePadding },
      list: {
        display: "grid",
        gridTemplateColumns: {
          lg: "1fr",
          xl: isMapVisible ? "1fr 1fr" : "repeat(3, 1fr)",
        },
        gap: 5,
        px: { xs: 1, md: 0 },
      },
      mapGrid: { width: "100%" },
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

  React.useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [firstEntry] = entries;
        if (
          firstEntry?.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isFetching
        ) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.0,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

  const selectedServiceDomainName = getServiceDomainNameById(
    searchState.businessDomainId,
    searchState.serviceDomainId
  );

  return (
    <Box sx={styles.root}>
      <SearchFiltersModal
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

      <Grid container spacing={isMapExpanded ? 0 : 4} mt={1}>
        {!isMapExpanded && (
          <Grid size={{ xs: 12, lg: leftGridSize }}>
            {isLoading ? (
              <BusinessCardSkeletons listSx={styles.list} />
            ) : locations.length === 0 ? (
              <Typography variant="h6" align="center" mt={4}>
                Nu s-au găsit rezultate.
              </Typography>
            ) : (
              <>
                <Box sx={styles.list}>
                  {locations.map((b) => (
                    <BusinessCard key={b.id} business={b} />
                  ))}
                </Box>

                <Box
                  ref={loadMoreRef}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80px",
                    py: 2,
                    width: "100%",
                  }}
                >
                  {isFetchingNextPage && <CircularProgress size={28} />}
                  {!hasNextPage && locations.length > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      Ai explorat toate locațiile disponibile.
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Grid>
        )}

        {isMapVisible && (
          <Grid
            size={{ xs: 12, lg: isMapExpanded ? 12 : 5 }}
            sx={styles.mapGrid}
          >
            <SearchMap
              markers={markers || []}
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
