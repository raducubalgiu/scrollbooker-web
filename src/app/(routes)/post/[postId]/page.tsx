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
      tab={null}
    />
  );
}
