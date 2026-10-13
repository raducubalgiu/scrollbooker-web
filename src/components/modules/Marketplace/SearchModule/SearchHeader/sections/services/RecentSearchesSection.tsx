import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RecentSearch } from "@/ts/models/search/RecentSearch";

const VISIBLE_LIMIT = 4;

type RecentSearchesSectionProps = {
  recentSearches: RecentSearch[];
  onSelectRecentSearch: (search: RecentSearch) => void;
};

const getRecentSearchLabel = (search: RecentSearch): string | null => {
  const [first, ...rest] = search.services;
  if (!first) return null;
  if (rest.length === 0) return first.name;

  return `${first.name} și încă ${rest.length}`;
};

const RecentSearchesSection = ({
  recentSearches,
  onSelectRecentSearch,
}: RecentSearchesSectionProps) => {
  if (recentSearches.length === 0) return null;

  const visibleSearches = recentSearches.slice(0, VISIBLE_LIMIT);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography fontWeight={700} mb={1.5}>
        Căutări recente
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 0.5,
        }}
      >
        {visibleSearches.map((search) => (
          <Box
            key={search.id}
            onClick={() => onSelectRecentSearch(search)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "background.default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <SearchIcon fontSize="small" color="action" />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography fontWeight={600} noWrap>
                {search.service_domain.name}
              </Typography>
              {getRecentSearchLabel(search) && (
                <Typography variant="body2" color="text.secondary" noWrap>
                  {getRecentSearchLabel(search)}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default memo(RecentSearchesSection);
