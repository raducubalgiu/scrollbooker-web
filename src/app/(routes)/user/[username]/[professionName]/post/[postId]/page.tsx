import VideoDetailModule from "@/components/modules/Marketplace/VideoDetailModule/VideoDetailModule";
import { Post } from "@/ts/models/social/Post";
import { get } from "@/utils/requests";
import React from "react";

interface PostPageProps {
  params: Promise<{
    username: string;
    profession: string;
    postId: number;
  }>;
  searchParams: Promise<{ tab?: string | null | undefined }>;
}

export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const { postId } = await params;
  const { tab } = await searchParams;

  const response = await get<Post | null>({
    url: `/posts/${postId}`,
  });

  const postData = response.data;

  if (!postData) {
    throw new Error("An error occured when fetching post");
  }

  return (
    <VideoDetailModule
      initialPost={postData}
      username={postData.user.username}
      profession={postData.user.profession}
      tab={tab ?? null}
    />
  );
}
