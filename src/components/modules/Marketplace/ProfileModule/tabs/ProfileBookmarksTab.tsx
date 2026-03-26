import React, { memo } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import { useRouter } from "next/navigation";

const ProfileBookmarksTab = () => {
  const router = useRouter();

  const { data: posts } = useCustomQuery<PaginatedData<Post>>({
    key: ["profile-bookmarks"],
    url: `/api/profile/bookmarks`,
    params: { page: 1, limit: 10 },
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

export default memo(ProfileBookmarksTab);
