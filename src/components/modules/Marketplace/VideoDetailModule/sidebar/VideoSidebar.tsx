import { Box, Divider, Paper } from "@mui/material";
import { Post } from "@/ts/models/social/Post";
import VideoHeader from "./VideoHeader";
import VideoComments from "./VideoComments";
import VideoActions from "./VideoActions";

type VideoSidebarProps = {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
};

export default function VideoSidebar({ post, setPost }: VideoSidebarProps) {
  const { user } = post;

  return (
    <Paper
      square
      elevation={0}
      sx={{
        display: { xs: "none", lg: "flex" },
        minHeight: { xs: "auto", lg: "100vh" },
        bgcolor: "background.paper",
        flexDirection: "column",
        p: 0.5,
      }}
    >
      <Box p={2.5}>
        <VideoHeader user={user} description={post.description} />
        <VideoActions
          postId={post.id}
          counters={post.counters}
          userActions={post.user_actions}
          setPost={setPost}
        />
      </Box>

      <Divider />

      <VideoComments postId={post.id} avatar={user.avatar} />
    </Paper>
  );
}
