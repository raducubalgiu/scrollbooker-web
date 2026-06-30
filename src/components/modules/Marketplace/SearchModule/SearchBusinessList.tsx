import React, { memo, useEffect, useMemo, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import BusinessCardSkeletons from "./BusinessCard/BusinessCardSkeletons";
import BusinessCard from "./BusinessCard/BusinessCard";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { useInfiniteBusinessLocations } from "@/hooks/infiniteQuery/useInfiniteBusinessLocations";
import { SearchState } from "./SearchModule";

interface SearchBusinessListProps {
  searchState: SearchState;
  isMapVisible: boolean;
}

const SearchBusinessList: React.FC<SearchBusinessListProps> = ({
  searchState,
  isMapVisible,
}) => {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBusinessLocations(searchState);

  const locations = useMemo(() => {
    if (!data) return [];
    const allResults = data.pages.flatMap((page) => page.results || []);
    const seenIds = new Set<number>();
    return allResults.filter((loc) => {
      if (loc?.id == null || seenIds.has(loc.id)) return false;
      seenIds.add(loc.id);
      return true;
    });
  }, [data]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const listSx = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        lg: "1fr",
        xl: isMapVisible ? "1fr 1fr" : "repeat(3, 1fr)",
      },
      gap: { xs: 3, md: 5 },
      px: 0,
      mt: 2,
    }),
    [isMapVisible]
  );

  useEffect(() => {
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
      { rootMargin: "300px", threshold: 0.0 }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

  if (isLoading) {
    return <BusinessCardSkeletons listSx={listSx} />;
  }

  if (locations.length === 0) {
    return (
      <NotFound
        icon={<StoreMallDirectoryOutlinedIcon sx={{ fontSize: 50 }} />}
        title="Nu au fost găsite potriviri exacte"
        description="Încearcă să schimbi sau să elimini unele filtre sau să ajustezi zona de căutare."
      />
    );
  }

  return (
    <>
      <Box sx={listSx}>
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
        {!hasNextPage && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Ai explorat toate locațiile disponibile.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default memo(SearchBusinessList);
