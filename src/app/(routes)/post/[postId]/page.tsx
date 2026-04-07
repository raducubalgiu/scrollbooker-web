import VideoDetailModule from "@/components/modules/Marketplace/VideoDetailModule/VideoDetailModule";
import { Post } from "@/ts/models/social/Post";
import { get } from "@/utils/requests";
import React from "react";

interface PostPageProps {
  params: {
    postId: number;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await Promise.resolve(params);

  const post = (
    await get<Post | null>({
      url: `/posts/${postId}`,
    })
  ).data;

  if (!post) return null;

  return (
    <VideoDetailModule
      initialPost={post}
      username={post.user.username}
      tab={null}
    />
  );
}
