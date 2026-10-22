"use client";

import React from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { useFeedFilterDraft } from "./useFeedFilterDraft";
import FeedFilterNearbyToggle from "./FeedFilterNearbyToggle";
import FeedFilterDesktopDomainCard from "./FeedFilterDesktopDomainCard";

type FeedFilterDesktopContentProps = {
  domains: ServiceDomain[];
  isLoadingDomains: boolean;
  appliedServiceIds: Set<number>;
  appliedOnlyVideoReviews: boolean;
  appliedOnlyNearby: boolean;
  hasLocationAccess: boolean;
  onRequestLocationAccess: () => void;
  onApply: (
    serviceIds: Set<number>,
    onlyVideoReviews: boolean,
    onlyNearby: boolean
  ) => void;
  onClose: () => void;
};

const FeedFilterDesktopContent = ({
  domains,
  isLoadingDomains,
  appliedServiceIds,
  appliedOnlyVideoReviews,
  appliedOnlyNearby,
  hasLocationAccess,
  onRequestLocationAccess,
  onApply,
  onClose,
}: FeedFilterDesktopContentProps) => {
  const {
    draftSelectedIds,
    draftOnlyVideoReviews,
    draftOnlyNearby,
    toggleService,
    toggleOnlyNearby,
    clear,
    isClearEnabled,
  } = useFeedFilterDraft(
    appliedServiceIds,
    appliedOnlyVideoReviews,
    appliedOnlyNearby
  );

  const handleConfirm = () => {
    onApply(draftSelectedIds, draftOnlyVideoReviews, draftOnlyNearby);
    onClose();
  };

  return (
    <Stack sx={styles.container}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={styles.header}
      >
        <Stack spacing={0.5}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "text.primary" }}
          >
            Ce vrei să vezi în feed?
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Alege categoriile care te interesează sau filtrează doar recenziile
            video
          </Typography>
        </Stack>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Box sx={styles.scrollArea}>
        {/* MVP: video reviews filter is on hold for now */}
        {/* <FeedFilterVideoReviewsToggle
          checked={draftOnlyVideoReviews}
          onToggle={toggleVideoReviews}
        /> */}

        <FeedFilterNearbyToggle
          checked={draftOnlyNearby}
          hasLocationAccess={hasLocationAccess}
          onToggle={toggleOnlyNearby}
          onRequestLocationAccess={onRequestLocationAccess}
        />

        {!isLoadingDomains && (
          <Box sx={styles.grid}>
            {domains.map((domain) => (
              <FeedFilterDesktopDomainCard
                key={domain.id}
                domain={domain}
                selectedServiceIds={draftSelectedIds}
                onToggleService={toggleService}
              />
            ))}
          </Box>
        )}
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={styles.footer}
      >
        <Button
          onClick={clear}
          disabled={!isClearEnabled}
          sx={styles.clearButton}
        >
          Șterge filtrele
        </Button>

        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={styles.confirmButton}
        >
          {draftSelectedIds.size > 0
            ? `Filtrează (${draftSelectedIds.size})`
            : "Filtrează"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FeedFilterDesktopContent;

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexShrink: 0,
    p: 4,
    pb: 3,
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    px: 4,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 2,
    pb: 1,
  },
  footer: {
    flexShrink: 0,
    p: 4,
    pt: 3,
    borderTop: "1px solid",
    borderColor: "divider",
  },
  clearButton: {
    color: "error.main",
    fontWeight: 700,
    textTransform: "none",
    "&.Mui-disabled": {
      color: "text.disabled",
      opacity: 0.6,
    },
  },
  confirmButton: {
    px: 4,
    py: 1.25,
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: 50,
  },
} as const;
