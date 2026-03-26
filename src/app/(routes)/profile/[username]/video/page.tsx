import { Box } from "@mui/material";
import React from "react";

interface VideoDetailPageProps {
  params: {
    username: string;
    video_id: number;
  };
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { username, video_id } = await Promise.resolve(params);

  return (
    <Box>
      {username} {video_id}
    </Box>
  );
}
