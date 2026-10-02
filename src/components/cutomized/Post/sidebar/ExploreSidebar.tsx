import { Box, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import ReviewsTab from "./ReviewsTab";
import ExploreServicesTab from "./ExploreServicesTab";
import PostComments from "@/components/modules/Marketplace/CommentsModule/PostComments";
import VideoHeaderSkeleton from "../VideoHeaderSkeleton";
import VideoHeader from "../VideoHeader";
import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";

enum ExploreSidebarTab {
  SERVICES,
  COMMENTS,
  REVIEWS,
}

type ExploreSidebarProps = {
  linkedProducts: LinkedProducts | undefined;
  isLoadingLinkedProducts: boolean;
  isLoading: boolean;
  commentsCount: number | undefined;
  postId: number | undefined;
  user: PostUser | undefined;
  isVideoReview: boolean;
  businessLocation: PostBusinessLocation | null | undefined;
  onNavigateToBooking: (selectedProductId: number | null) => void;
  onFollow?: () => void;
  isTogglingFollow?: boolean;
};

const ExploreSidebar = ({
  linkedProducts,
  isLoadingLinkedProducts,
  commentsCount,
  postId,
  user,
  isVideoReview,
  businessLocation,
  isLoading,
  onNavigateToBooking,
  onFollow,
  isTogglingFollow,
}: ExploreSidebarProps) => {
  const [activeTab, setActiveTab] = React.useState<ExploreSidebarTab>(
    ExploreSidebarTab.SERVICES
  );
  const { ratings_count } = user || {};

  const tabs = useMemo(
    () => [
      { label: "Servicii", value: ExploreSidebarTab.SERVICES },
      {
        label: `Comentarii (${commentsCount ?? 0})`,
        value: ExploreSidebarTab.COMMENTS,
      },
      {
        label: `Recenzii (${ratings_count ?? 0})`,
        value: ExploreSidebarTab.REVIEWS,
      },
    ],
    [commentsCount, ratings_count]
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case ExploreSidebarTab.SERVICES:
        return (
          <ExploreServicesTab
            linkedProducts={linkedProducts}
            isLoadingLinkedProducts={isLoadingLinkedProducts}
            userId={user?.id}
            isLoadingPosts={isLoading}
            onNavigateToBooking={onNavigateToBooking}
          />
        );
      case ExploreSidebarTab.COMMENTS:
        return <PostComments postId={postId} postAuthorAvatar={null} />;
      case ExploreSidebarTab.REVIEWS:
        return <ReviewsTab userId={user?.id} />;
      default:
        return null;
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
            displayDescription={false}
            isVideoReview={isVideoReview}
            onFollow={onFollow}
            isTogglingFollow={isTogglingFollow}
          />
        )}
      </Box>

      <Box sx={styles.tabsContainer}>
        <Box sx={styles.tabsRow}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <Box
                key={tab.value}
                component="button"
                type="button"
                onClick={() => setActiveTab(tab.value)}
                sx={styles.tabButton}
              >
                <Typography
                  noWrap
                  sx={{
                    fontSize: 14.5,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "text.primary" : "text.secondary",
                    transition: "color 0.15s ease, font-weight 0.15s ease",
                  }}
                >
                  {tab.label}
                </Typography>

                <Box
                  sx={{
                    ...styles.underline,
                    transform: `scaleX(${isActive ? 1 : 0})`,
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Box sx={styles.tabsContent}>{renderTabContent()}</Box>
      </Box>
    </Box>
  );
};

export default memo(ExploreSidebar);

const styles = {
  container: {
    ml: 6,
    flex: 1,
    minWidth: 320,
    maxWidth: 600,
    border: 1,
    borderColor: "divider",
    borderRadius: 4,
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    minHeight: 0,
    height: "100%",
    overflow: "hidden",
  },
  tabsContainer: {
    borderTop: 1,
    borderColor: "divider",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  tabsRow: {
    display: "flex",
    borderBottom: 1,
    borderColor: "divider",
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    border: "none",
    background: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    px: 1,
    py: 2,
  },
  underline: {
    width: "100%",
    height: 2.5,
    borderRadius: 50,
    backgroundColor: "primary.main",
    transformOrigin: "center",
    transition: "transform 0.2s ease",
  },
  tabsContent: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    scrollBarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};
