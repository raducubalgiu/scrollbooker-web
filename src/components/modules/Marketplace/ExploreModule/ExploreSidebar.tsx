import { Box, Tab, Tabs } from "@mui/material";
import React, { useRef } from "react";
import PostComments from "../CommentsModule/PostComments";
import VideoHeader from "../VideoDetailModule/sidebar/VideoHeader";
import { PostUser } from "@/ts/models/social/Post";
import SocialReviewsTab from "../ProfileModule/social/SocialReviewsTab";

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
  const [activeTab, setActiveTab] = React.useState(0);
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  if (!postId) {
    return null;
  }

  return (
    <Box
      sx={{
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
      }}
    >
      {user && (
        <Box p={3}>
          <VideoHeader description={null} user={user} />
        </Box>
      )}

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Servicii"
          value={0}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: 17,
            p: 2.5,
            minWidth: 120,
          }}
        />
        <Tab
          label={`Comentarii (${commentsCount ?? 0})`}
          value={2}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: 17,
            p: 2.5,
            minWidth: 120,
          }}
        />
        <Tab
          label="Recenzii"
          value={3}
          sx={{
            fontWeight: 600,
            textTransform: "none",
            fontSize: 17,
            p: 2.5,
            minWidth: 120,
          }}
        />
      </Tabs>

      {activeTab === 2 && (
        <PostComments postId={postId} avatar={null} postAuthorAvatar={null} />
      )}

      {activeTab === 3 && (
        <Box p={3} sx={{ height: "100%" }}>
          <SocialReviewsTab
            userId={user?.id}
            rootRef={reviewsRef}
            disableInitialIgnore={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default ExploreSidebar;
