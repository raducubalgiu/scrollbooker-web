import { Box, Tab, Tabs } from "@mui/material";
import React, { memo, useMemo } from "react";
import { PostUser } from "@/ts/models/social/Post";
import PostComments from "../../CommentsModule/PostComments";
import VideoHeader from "../../VideoDetailModule/sidebar/VideoHeader";

enum ExploreSidebarTab {
  SERVICES,
  COMMENTS,
  REVIEWS,
}

type ExploreSidebarProps = {
  commentsCount: number | undefined;
  postId: number | undefined;
  user: PostUser | undefined;
};

const ExploreSidebar = ({
  commentsCount,
  postId,
  user,
}: ExploreSidebarProps) => {
  const [activeTab, setActiveTab] = React.useState<ExploreSidebarTab>(
    ExploreSidebarTab.SERVICES
  );
  const { ratings_count } = user || {};

  const styles = {
    container: {
      ml: 6,
      flex: 1,
      minWidth: 320,
      maxWidth: 600,
      border: 1,
      borderColor: "divider",
      borderRadius: 4,
      display: "flex",
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
        return <Box p={3}>Services Content</Box>;
      case ExploreSidebarTab.COMMENTS:
        return (
          <PostComments postId={postId} avatar={null} postAuthorAvatar={null} />
        );
      case ExploreSidebarTab.REVIEWS:
        return (
          <Box p={3} sx={{ height: "100%" }}>
            Reviews
          </Box>
        );
      default:
        return null;
    }
  }, [activeTab, postId, user]);

  return (
    <Box sx={styles.container}>
      <Box p={3}>
        <VideoHeader
          description={null}
          user={user}
          displayDescription={false}
        />
      </Box>

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

      {tabsContent}
    </Box>
  );
};

export default memo(ExploreSidebar);
