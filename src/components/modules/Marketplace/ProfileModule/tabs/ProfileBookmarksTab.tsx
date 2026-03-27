import React, { memo } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import { useRouter } from "next/navigation";
import PostGridSkeleton from "@/components/cutomized/PostGrid/PostGridSkeleton";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const ProfileBookmarksTab = () => {
  const router = useRouter();

  const { data: posts, isLoading } = useCustomQuery<PaginatedData<Post>>({
    key: ["profile-bookmarks"],
    url: `/api/profile/bookmarks`,
    params: { page: 1, limit: 10 },
  });

  return (
    <>
      <PostGridContainer>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <PostGridSkeleton key={i} />)}
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
      {!isLoading && posts?.results.length === 0 && (
        <NotFound
          title="Nu există postări salvate"
          description="Salvează postările tale preferate pentru a le viziona mai târziu"
          icon={<VideoLibraryIcon sx={{ fontSize: 50 }} />}
        />
      )}
    </>
  );
};

export default memo(ProfileBookmarksTab);
