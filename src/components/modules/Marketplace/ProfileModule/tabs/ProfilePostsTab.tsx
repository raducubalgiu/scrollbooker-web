import React, { memo } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import { Post } from "@/ts/models/social/Post";
import { PaginatedData } from "@/components/core/Table/Table";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import { useRouter } from "next/navigation";
import PostGridSkeleton from "@/components/cutomized/PostGrid/PostGridSkeleton";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import NotFound from "@/components/cutomized/NotFound/NotFound";

type ProfilePostsTabProps = {
  userId: number;
};

const ProfilePostsTab = ({ userId }: ProfilePostsTabProps) => {
  const router = useRouter();

  const { data: posts, isLoading } = useCustomQuery<PaginatedData<Post>>({
    key: ["profile-posts", userId],
    url: `/api/profile/posts`,
    params: { userId, page: 1, limit: 10 },
  });

  return (
    <>
      <PostGridContainer>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <PostGridSkeleton key={i} />)}
        {!isLoading &&
          posts?.results.map((post) => (
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
          title="Nu au fost găsite postări"
          description="Acest utilizator nu a postat niciun videoclip încă."
          icon={<VideoLibraryIcon sx={{ fontSize: 50 }} />}
        />
      )}
    </>
  );
};

export default memo(ProfilePostsTab);
