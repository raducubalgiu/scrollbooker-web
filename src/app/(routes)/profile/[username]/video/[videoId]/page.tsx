import VideoDetailModule from "@/components/modules/Marketplace/VideoDetailModule/VideoDetailModule";
import { Post } from "@/ts/models/social/Post";
import { get } from "@/utils/requests";
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

  const post = (
    await get<Post | null>({
      url: `/posts/${videoId}`,
    })
  ).data;

  if (!post) return null;

  return <VideoDetailModule initialPost={post} username={username} tab={tab} />;
}
