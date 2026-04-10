import React, { memo, useMemo } from "react";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import { useRouter } from "next/navigation";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { useInfiniteUserPosts } from "@/hooks/infiniteQuery/userInfiniteUserPosts";
import { isEmpty } from "lodash";
import PostGridSkeleton from "@/components/cutomized/PostGrid/PostGridSkeleton";

type ProfilePostsTabProps = {
  userId: number;
  username: string;
};

const ProfilePostsTab = ({ userId, username }: ProfilePostsTabProps) => {
  const router = useRouter();

  const { data, isLoading } = useInfiniteUserPosts(userId);

  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  return (
    <>
      <PostGridContainer>
        {isLoading && <PostGridSkeleton />}

        {!isLoading &&
          posts?.map((post) => (
            <PostGrid
              key={post.id}
              viewsCount={post.counters.views_count}
              thumbnailUrl={post.media_files[0]?.thumbnail_url ?? null}
              videoUrl={post.media_files[0]?.url ?? null}
              onNavigateToVideo={() => {
                router.push(`/profile/${username}/video/${post.id}?tab=posts`);
              }}
            />
          ))}
      </PostGridContainer>
      {!isLoading && isEmpty(posts) && (
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
