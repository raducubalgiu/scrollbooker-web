"use client";

import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { useFeedFilterDraft } from "./useFeedFilterDraft";
import FeedFilterVideoReviewsToggle from "./FeedFilterVideoReviewsToggle";
import FeedFilterDomainSection from "./FeedFilterDomainSection";
import FeedFilterActions from "./FeedFilterActions";
import AppLogo from "@/components/core/Logo/AppLogo";

type FeedFilterContentProps = {
  domains: ServiceDomain[];
  isLoadingDomains: boolean;
  appliedServiceIds: Set<number>;
  appliedOnlyVideoReviews: boolean;
  onApply: (serviceIds: Set<number>, onlyVideoReviews: boolean) => void;
  onClose: () => void;
};

const FeedFilterContent = ({
  domains,
  isLoadingDomains,
  appliedServiceIds,
  appliedOnlyVideoReviews,
  onApply,
  onClose,
}: FeedFilterContentProps) => {
  const {
    draftSelectedIds,
    draftOnlyVideoReviews,
    toggleService,
    toggleVideoReviews,
    clear,
    isClearEnabled,
  } = useFeedFilterDraft(appliedServiceIds, appliedOnlyVideoReviews);

  const handleConfirm = () => {
    onApply(draftSelectedIds, draftOnlyVideoReviews);
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
          <AppLogo height={30} />
          <Typography sx={styles.subtitle}>
            Alege ce vrei sa vezi in feed-ul tau
          </Typography>
        </Stack>

        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon sx={{ color: "text.primary" }} />
        </IconButton>
      </Stack>

      <Box sx={styles.scrollArea}>
        <FeedFilterVideoReviewsToggle
          checked={draftOnlyVideoReviews}
          onToggle={toggleVideoReviews}
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
