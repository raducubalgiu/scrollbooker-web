import { Box, Tab, Tabs } from "@mui/material";
import React, { memo, useMemo } from "react";
import { PostBusinessLocation, PostUser } from "@/ts/models/social/Post";
import PostComments from "../../CommentsModule/PostComments";
import VideoHeader from "../VideoHeader";
import ReviewsTab from "./ReviewsTab";
import ExploreServicesTab from "./ExploreServicesTab";
import VideoHeaderSkeleton from "../VideoHeaderSkeleton";
import { Product } from "@/ts/models/booking/product/Product";

enum ExploreSidebarTab {
  SERVICES,
  COMMENTS,
  REVIEWS,
}

type ExploreSidebarProps = {
  isLoading: boolean;
  commentsCount: number | undefined;
  postId: number | undefined;
  user: PostUser | undefined;
  businessLocation: PostBusinessLocation | null | undefined;
  onNavigateToBooking: (product: Product) => void;
};

const ExploreSidebar = ({
  commentsCount,
  postId,
  user,
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

  const tabsContent = useMemo(() => {
    switch (activeTab) {
      case ExploreSidebarTab.SERVICES:
        return (
          <ExploreServicesTab
            postId={postId}
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
  }, [activeTab, postId, user, isLoading]);

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
          />
        )}
      </Box>

      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
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

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            scrollBarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {tabsContent}
        </Box>
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
  tab: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: 17,
    p: 2.5,
    minWidth: 120,
  },
};
