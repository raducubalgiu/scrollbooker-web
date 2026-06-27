import { Box, Tab, Tabs } from "@mui/material";
import React, { memo, useCallback, useMemo } from "react";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import ReviewsTab from "./ReviewsTab";
import ExploreServicesTab from "./ExploreServicesTab";
import PostComments from "@/components/modules/Marketplace/CommentsModule/PostComments";
import VideoHeaderSkeleton from "../VideoHeaderSkeleton";
import VideoHeader from "../VideoHeader";
import { Product } from "@/ts/models/booking/product/Product";

enum ExploreSidebarTab {
  SERVICES,
  COMMENTS,
  REVIEWS,
}

type ExploreSidebarProps = {
  linkedProducts: Product[];
  isLoadingLinkedProducts: boolean;
  isLoading: boolean;
  commentsCount: number | undefined;
  postId: number | undefined;
  user: PostUser | undefined;
  isVideoReview: boolean;
  businessLocation: PostBusinessLocation | null | undefined;
  onNavigateToBooking: (selectedProductId: number | null) => void;
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

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: ExploreSidebarTab) => {
      setActiveTab(newValue);
    },
    []
  );

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
          />
        )}
      </Box>

      <Box sx={styles.tabsContainer}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              sx={styles.tab}
            />
          ))}
        </Tabs>

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
  tab: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: 17,
    p: 2.5,
    minWidth: 120,
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
