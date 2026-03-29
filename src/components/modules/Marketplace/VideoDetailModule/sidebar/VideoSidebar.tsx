import { Box, Divider, Paper } from "@mui/material";
import { Post } from "@/ts/models/social/Post";
import VideoHeader from "./VideoHeader";
import VideoComments from "./VideoComments";
import VideoActions from "./VideoActions";

type VideoSidebarProps = {
  post: Post;
  onHandleLike: () => void;
  onHandleBookmark: () => void;
};

export default function VideoSidebar({
  post,
  onHandleLike,
  onHandleBookmark,
}: VideoSidebarProps) {
  const { user } = post;

  const styles = {
    container: {
      display: { xs: "none", lg: "flex" },
      minHeight: { xs: "auto", lg: "100vh" },
      bgcolor: "background.paper",
      flexDirection: "column",
      p: 0.5,
    },
  };

  return (
    <Paper square elevation={0} sx={styles.container}>
      <Box p={2.5}>
        <VideoHeader user={user} description={post.description} />
        <VideoActions
          counters={post.counters}
          userActions={post.user_actions}
          onHandleLike={onHandleLike}
          onHandleBookmark={onHandleBookmark}
        />
      </Box>

      <Divider />

      <VideoComments postId={post.id} avatar={user.avatar} />
    </Paper>
  );
}
