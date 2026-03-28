import VideoDetailModule from "@/components/modules/Marketplace/VideoDetailModule/VideoDetailModule";
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

  return <VideoDetailModule username={username} videoId={video_id} />;
}
