import React, { memo } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import { Post } from "@/ts/models/social/Post";
import { PaginatedData } from "@/components/core/Table/Table";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import { useRouter } from "next/navigation";

type ProfilePostsTabProps = {
  userId: number;
};

const ProfilePostsTab = ({ userId }: ProfilePostsTabProps) => {
  const router = useRouter();

  const { data: posts } = useCustomQuery<PaginatedData<Post>>({
    key: ["profile-posts", userId],
    url: `/api/profile/posts`,
    params: { userId, page: 1, limit: 10 },
  });

  return (
    <PostGridContainer>
      {posts?.results.map((post) => (
        <PostGrid
          key={post.id}
          viewsCount={post.counters.views_count}
          thumbnailUrl={post.media_files[0]?.thumbnail_url ?? null}
          videoUrl={post.media_files[0]?.url ?? null}
          onNavigateToVideo={() =>
            router.push(`/profile/${post.user.username}/video/${post.id}`)
          }
        />
      ))}
    </PostGridContainer>
  );
};

export default memo(ProfilePostsTab);
