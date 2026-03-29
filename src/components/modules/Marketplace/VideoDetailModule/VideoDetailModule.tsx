"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import VideoSection from "./video/VideoSection";
import VideoSidebar from "./sidebar/VideoSidebar";
import { Post } from "@/ts/models/social/Post";

type ProfileVideoDetailPageProps = {
  username: string;
  post: Post | null;
  tab?: string | null | undefined;
};

export default function VideoDetailModule({
  username,
  post,
  tab,
}: ProfileVideoDetailPageProps) {
  const router = useRouter();

  if (!post) return null;

  const handleClose = React.useCallback(() => {
    router.replace(`/profile/${username}${tab ? `?tab=${tab}` : ""}`);
  }, [router]);

  const url = post.media_files[0]?.url;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "minmax(0, 1fr) minmax(480px, 640px)",
        },
      }}
    >
      {url && <VideoSection url={url} onClose={handleClose} />}

      <VideoSidebar post={post} />
    </Box>
  );
}
