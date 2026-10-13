import { Box, IconButton, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import React, { useMemo } from "react";
import { SearchHeaderStateType } from "./SearchHeader/search-header-types";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { getSelectedServicesLabel } from "./SearchHeader/getSelectedServicesLabel";
import { getDateTimeLabel } from "./SearchHeader/getDateTimeLabel";
import { useGetServicesByServiceDomain } from "@/controllers/nomenclature/service.controller";
import { useGetFiltersByService } from "@/controllers/nomenclature/filter.controller";

type SearchHeaderMobileProps = {
  headerState: SearchHeaderStateType;
  businessDomains: BusinessDomain[];
  onFilterClick: () => void;
  onOpenServicesSheet: () => void;
};

export default function SearchHeaderMobile({
  headerState,
  businessDomains,
  onFilterClick,
  onOpenServicesSheet,
}: SearchHeaderMobileProps) {
  const { data: selectedDomainServices } = useGetServicesByServiceDomain({
    serviceDomainId: headerState.selectedServiceDomainId,
  });

  const { data: selectedServiceFilters } = useGetFiltersByService({
    serviceId: String(headerState.selectedServiceId),
    isEnabled: !!headerState.selectedServiceId,
  });

  const headline = useMemo(
    () =>
      getSelectedServicesLabel({
        businessDomains,
        selectedServiceDomainId: headerState.selectedServiceDomainId,
        selectedServiceId: headerState.selectedServiceId,
        selectedSubFilterIds: headerState.selectedSubFilterIds,
        services: selectedDomainServices,
        filters: selectedServiceFilters,
      }) ?? "Toate Serviciile",
    [
      businessDomains,
      headerState.selectedServiceDomainId,
      headerState.selectedServiceId,
      headerState.selectedSubFilterIds,
      selectedDomainServices,
      selectedServiceFilters,
    ]
  );

  const subHeadline =
    getDateTimeLabel({
      startDate: headerState.startDate,
      startTime: headerState.startTime,
      endTime: headerState.endTime,
    }) ?? "Oricând";

  return (
    <Box sx={styles.container}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={styles.headerContainer}
      >
        <Box
          role="button"
          tabIndex={0}
          onClick={onOpenServicesSheet}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onOpenServicesSheet();
          }}
          sx={styles.searchArea}
        >
          <Box sx={styles.searchIconWrapper}>
            <SearchIcon fontSize="medium" />
          </Box>

          <Stack sx={{ minWidth: 0 }}>
            <Typography fontWeight={600} variant="h6" noWrap>
              {headline}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {subHeadline}
            </Typography>
          </Stack>
        </Box>

        <IconButton onClick={onFilterClick} sx={styles.filterButton}>
          <FilterAltOutlinedIcon sx={{ color: "text.secondary" }} />
        </IconButton>
      </Stack>
    </Box>
  );
}

const styles = {
  container: {
    position: "sticky",
    top: 0,
    zIndex: 1100,
    py: 1.5,
    bgcolor: "background.default",
  },
  headerContainer: {
    display: { xs: "flex", md: "none" },
    p: 1.25,
    borderRadius: 50,
    border: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
    boxShadow:
      "0px 4px 16px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.04)",
  },
  searchArea: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    flex: 1,
    minWidth: 0,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  searchIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: "50%",
    flexShrink: 0,
  },
  filterButton: {
    border: 1,
    borderColor: "divider",
    borderRadius: "50%",
    p: 1.25,
    ml: 1,
  },
};
