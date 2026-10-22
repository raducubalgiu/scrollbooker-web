"use client";

import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { useFeedFilterDraft } from "./useFeedFilterDraft";
import FeedFilterDomainSection from "./FeedFilterDomainSection";
import FeedFilterNearbyToggle from "./FeedFilterNearbyToggle";
import FeedFilterActions from "./FeedFilterActions";
import AppLogo from "@/components/core/Logo/AppLogo";

type FeedFilterContentProps = {
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

const FeedFilterContent = ({
  domains,
  isLoadingDomains,
  appliedServiceIds,
  appliedOnlyVideoReviews,
  appliedOnlyNearby,
  hasLocationAccess,
  onRequestLocationAccess,
  onApply,
  onClose,
}: FeedFilterContentProps) => {
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
        sx={{ flexShrink: 0 }}
      >
        <Stack spacing={1.5} sx={styles.header}>
          <AppLogo height={22} />
          <Typography variant="body2" sx={styles.subtitle}>
            Alege ce vrei sa vezi in feed-ul tau
          </Typography>
        </Stack>

        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon sx={{ color: "text.primary" }} />
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

        {!isLoadingDomains &&
          domains.map((domain) => (
            <FeedFilterDomainSection
              key={domain.id}
              domain={domain}
              selectedServiceIds={draftSelectedIds}
              onToggleService={toggleService}
            />
          ))}
      </Box>

      <FeedFilterActions
        isClearEnabled={isClearEnabled}
        selectedCount={draftSelectedIds.size}
        onClear={clear}
        onConfirm={handleConfirm}
      />
    </Stack>
  );
};

export default FeedFilterContent;

const styles = {
  container: {
    height: "100%",
    p: 2.5,
  },
  header: { flexShrink: 1, minWidth: 0 },
  subtitle: { color: "text.secondary" },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    my: 3,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
  },
  closeButton: {
    flexShrink: 0,
    bgcolor: "background.paper",
  },
} as const;
