import React, { memo, useMemo } from "react";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { isEmpty } from "lodash";
import ErrorMessage from "@/components/cutomized/NotFound/ErrorMessage";
import { AppRoutes } from "@/utils/routes";
import { ProfileTabEnum } from "./profileTabsHelper";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useInfiniteUserPosts } from "@/controllers/social/post.controller";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

type ProfilePostsTabProps = {
  userId: number;
};

const ProfilePostsTab = ({ userId }: ProfilePostsTabProps) => {
  const { navigateTo } = useAppNavigation();

  const { data, isLoading, isError } = useInfiniteUserPosts({ userId });

  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  return (
    <>
      <PostGridContainer>
        {!isLoading &&
          posts?.map((post) => (
            <PostGrid
              key={post.id}
              viewsCount={post.counters.views_count}
              thumbnailUrl={post.media_files[0]?.thumbnail_url ?? null}
              onNavigateToVideo={() => {
                const { username, profession } = post.user;
                navigateTo(
                  AppRoutes.postDetail(
                    username,
                    profession,
                    post.id,
                    ProfileTabEnum.POSTS
                  )
                );
              }}
            />
          ))}
      </PostGridContainer>
      {!isLoading && isEmpty(posts) && !isError && (
        <NotFound
          title="Nu au fost găsite postări"
          description="Acest utilizator nu a postat niciun videoclip încă."
          icon={<VideoLibraryOutlinedIcon />}
        />
      )}
      {!isLoading && isError && <ErrorMessage resource="postări" />}
    </>
  );
};

export default memo(ProfilePostsTab);
