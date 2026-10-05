import { Box, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { Post, PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import PostComments from "@/components/modules/Marketplace/CommentsModule/PostComments";
import VideoHeaderSkeleton from "../VideoHeaderSkeleton";
import VideoHeader from "../VideoHeader";
import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";
import PostDesktopServicesTab from "./PostDesktopServicesTab";
import PostDesktopReviewsTab from "./PostDesktopReviewsTab";
import PostDesktopTabsSkeleton from "./PostDesktopTabsSkeleton";

import type { SxProps, Theme } from "@mui/material/styles";

type TabValue = "services" | "comments" | "reviews";
const TAB_ORDER: readonly TabValue[] = ["services", "comments", "reviews"];

type PostDesktopSidebarProps = {
  post: Post | null;
  linkedProducts: LinkedProducts | undefined;
  isLoadingLinkedProducts: boolean;
  isLoading: boolean;
  commentsCount: number | undefined;
  postId: number | undefined;
  user: PostUser | undefined;
  isVideoReview: boolean;
  businessLocation: PostBusinessLocation | null | undefined;
  distanceKm: number | null;
  onNavigateToBooking: (selectedProductId: number | null) => void;
  onFollow?: () => void;
  isTogglingFollow?: boolean;
};

type TabButtonProps = {
  value: TabValue;
  label: string;
  selected: boolean;
  onSelect: (value: TabValue) => void;
};

const TabButton = memo(
  ({ value, label, selected, onSelect }: TabButtonProps) => (
    <Box
      component="button"
      type="button"
      role="tab"
      id={`post-sidebar-tab-${value}`}
      aria-selected={selected}
      aria-controls="post-sidebar-panel"
      onClick={() => onSelect(value)}
      sx={styles.tabButton}
    >
      <Typography noWrap className="tab-label" sx={styles.tabLabel}>
        {label}
      </Typography>
      <Box className="tab-underline" sx={styles.underline} />
    </Box>
  )
);
TabButton.displayName = "TabButton";

const PostDesktopSidebar = ({
  post,
  linkedProducts,
  isLoadingLinkedProducts,
  commentsCount,
  postId,
  user,
  isVideoReview,
  businessLocation,
  distanceKm,
  isLoading,
  onNavigateToBooking,
  onFollow,
  isTogglingFollow,
}: PostDesktopSidebarProps) => {
  const [activeTab, setActiveTab] = useState<TabValue>("services");

  const labels: Record<TabValue, string> = {
    services: "Servicii",
    comments: `Comentarii (${commentsCount ?? 0})`,
    reviews: `Recenzii (${user?.ratings_count ?? 0})`,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "services":
        return (
          <PostDesktopServicesTab
            linkedProducts={linkedProducts}
            isLoadingLinkedProducts={isLoadingLinkedProducts}
            userId={user?.id}
            isLoadingPosts={isLoading}
            onNavigateToBooking={onNavigateToBooking}
          />
        );
      case "comments":
        return <PostComments postId={postId} postAuthorAvatar={null} />;
      case "reviews":
        return (
          <>
            {post?.business_id && (
              <PostDesktopReviewsTab
                businessId={post?.business_id}
                employeeId={post?.employee?.id ?? null}
              />
            )}
          </>
        );
    }
  };

  return (
    <Box sx={styles.container}>
      <Box p={3}>
        {isLoading ? (
          <VideoHeaderSkeleton />
        ) : (
          <VideoHeader
            description={null}
            user={user}
            businessLocation={businessLocation}
            distanceKm={distanceKm}
            displayDescription={false}
            isVideoReview={isVideoReview}
            onFollow={onFollow}
            isTogglingFollow={isTogglingFollow}
          />
        )}
      </Box>

      <Box sx={styles.tabsContainer}>
        {isLoading ? (
          <PostDesktopTabsSkeleton />
        ) : (
          <Box role="tablist" sx={styles.tabsRow}>
            {TAB_ORDER.map((value) => (
              <TabButton
                key={value}
                value={value}
                label={labels[value]}
                selected={activeTab === value}
                onSelect={setActiveTab}
              />
            ))}
          </Box>
        )}

        <Box
          role="tabpanel"
          id="post-sidebar-panel"
          aria-labelledby={`post-sidebar-tab-${activeTab}`}
          sx={styles.tabsContent}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(PostDesktopSidebar);

const styles = {
  container: {
    ml: 6,
    flex: 1,
    minWidth: 320,
    maxWidth: 600,
    height: "100%",
    minHeight: 0,
    border: 1,
    borderColor: "divider",
    borderRadius: 4,
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    overflow: "hidden",
  },
  tabsContainer: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    borderTop: 1,
    borderColor: "divider",
  },
  tabsRow: {
    display: "flex",
    borderBottom: 1,
    borderColor: "divider",
  },
  tabButton: {
    position: "relative",
    flex: 1,
    minWidth: 0,
    px: 1,
    py: 2,
    border: "none",
    background: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&[aria-selected='true']": {
      "& .tab-label": { fontWeight: 700, color: "text.primary" },
      "& .tab-underline": { transform: "scaleX(1)" },
    },
  },
  underline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-1px",
    height: 3,
    borderRadius: "3px 3px 0 0",
    backgroundColor: "primary.main",
    transform: "scaleX(0)",
    transformOrigin: "center",
    transition: "transform 0.2s ease",
    pointerEvents: "none",
  },
  tabLabel: {
    fontSize: 14.5,
    fontWeight: 500,
    color: "text.secondary",
    transition: "color 0.15s ease",
  },
  tabsContent: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { display: "none" },
  },
} satisfies Record<string, SxProps<Theme>>;
