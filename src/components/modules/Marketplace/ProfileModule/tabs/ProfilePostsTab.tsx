import React, { memo } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import { Post } from "@/ts/models/social/Post";
import { PaginatedData } from "@/components/core/Table/Table";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";

type ProfilePostsTabProps = {
  userId: number;
  isAuthenticated: boolean;
};

const ProfilePostsTab = ({ userId, isAuthenticated }: ProfilePostsTabProps) => {
  const { data: posts, isLoading } = useCustomQuery<PaginatedData<Post>>({
    key: ["profile-posts", userId],
    url: `/api/profile/posts`,
    params: { userId, page: 1, limit: 10 },
  });

  return (
    <PostGridContainer>
      {posts?.results.map((post) => (
        <PostGrid
          key={post.id}
          views_count={post.counters.views_count}
          imgUrl={post.media_files[0]?.thumbnail_url ?? null}
        />
      ))}
    </PostGridContainer>
  );
};

export default memo(ProfilePostsTab);
