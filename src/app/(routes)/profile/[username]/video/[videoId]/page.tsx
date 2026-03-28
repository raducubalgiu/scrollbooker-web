import VideoDetailModule from "@/components/modules/Marketplace/VideoDetailModule/VideoDetailModule";
import React from "react";

interface VideoDetailPageProps {
  params: {
    username: string;
    videoId: number;
  };
  searchParams: Promise<{ tab?: string | null | undefined }>;
}

export default async function VideoDetailPage({
  params,
  searchParams,
}: VideoDetailPageProps) {
  const { username, videoId } = await Promise.resolve(params);
  const { tab } = await Promise.resolve(searchParams);

  return <VideoDetailModule username={username} videoId={videoId} tab={tab} />;
}
