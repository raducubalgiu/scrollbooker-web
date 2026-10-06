"use client";

import React, { memo, useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PostActionsMobile from "./actions/PostActionsMobile";
import PostBadge from "./PostBadge";
import { PostActionsProps } from "./actions/postActionTypes";
import { useUserLocation } from "@/hooks/useUserLocation";
import { PostBusinessLocation } from "@/ts/models/social/Post";
import PostOverlayUser from "./PostOverlayUser";
import { calculateDistance } from "@/utils/calculateDistance";

type PostOverlayProps = {
  actions: PostActionsProps;
  description: string | null;
  businessLocation: PostBusinessLocation | null;
  onOpenLinkedProducts: () => void;
};

const PostOverlay = ({
  actions,
  description,
  businessLocation,
  onOpenLinkedProducts,
}: PostOverlayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, counters, userActions, isOwnPost } = actions;
  const { isVideoReview, serviceDomain } = actions;

  const handleToggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const { location: userLocation } = useUserLocation();
  const businessCoordinates = businessLocation?.coordinates ?? null;

  const distanceKm = useMemo(() => {
    if (!userLocation || !businessCoordinates) return null;
    return calculateDistance(userLocation, businessCoordinates);
  }, [userLocation, businessCoordinates]);

  return (
    <>
      <Box sx={styles.bottomShadow} />

      <Box sx={styles.container}>
        <Stack
          direction="row"
          alignItems="flex-end"
          spacing={2}
          sx={styles.contentRow}
        >
          <Stack spacing={1.25} sx={styles.textColumn}>
            {(isVideoReview || serviceDomain) && (
              <Stack spacing={0.75} sx={styles.badgesStack}>
                {isVideoReview && (
                  <PostBadge
                    label="Recenzie video"
                    bgcolor="rgba(255,255,255,0.9)"
                    color="common.black"
                  />
                )}

                {serviceDomain && (
                  <PostBadge
                    label={serviceDomain.name}
                    bgcolor="beauty.main"
                    color="common.white"
                  />
                )}
              </Stack>
            )}

            <PostOverlayUser
              user={user}
              profession={user?.profession}
              distance={distanceKm}
            />

            {description && description.length > 0 && (
              <Box
                onClick={handleToggleDescription}
                sx={styles.descriptionWrapper}
              >
                <Typography
                  variant="body2"
                  sx={
                    isExpanded
                      ? styles.descriptionExpanded
                      : styles.descriptionCollapsed
                  }
                >
                  {description}
                </Typography>
              </Box>
            )}

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLinkedProducts();
              }}
              variant="contained"
              fullWidth
              size="small"
              sx={styles.bookButton}
            >
              Rezervă acum
            </Button>
          </Stack>

          <Box sx={styles.actionsMobileWrapper}>
            {user && counters && userActions && (
              <PostActionsMobile
                user={user}
                counters={counters}
                userActions={userActions}
                isOwnPost={isOwnPost}
                isVideoReview={isVideoReview ?? false}
                loaders={actions.loaders}
                callbacks={actions.callbacks}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default memo(PostOverlay);

const styles = {
  bottomShadow: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 25%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 10,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    pl: { xs: 1.5, md: 3 },
    pr: { xs: 1, md: 3 },
    py: { xs: 1.5, md: 3 },
    zIndex: 20,
    color: "common.white",
    pointerEvents: "none",
  },
  contentRow: {
    pointerEvents: "auto",
    mb: { xs: 1, lg: 0 },
  },
  textColumn: {
    flex: 1,
    minWidth: 0,
  },
  badgesStack: {
    width: "fit-content",
  },
  descriptionWrapper: {
    cursor: "pointer",
  },
  descriptionCollapsed: {
    opacity: 0.95,
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    transition: "all 0.2s ease-in-out",
  },
  descriptionExpanded: {
    opacity: 0.95,
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "unset",
    overflow: "unset",
    transition: "all 0.2s ease-in-out",
  },
  bookButton: {
    display: { xs: "flex", lg: "none" },
  },
  actionsMobileWrapper: {
    display: { xs: "block", md: "none" },
  },
};
