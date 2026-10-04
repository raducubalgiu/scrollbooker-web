import React, { memo, useMemo } from "react";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { isEmpty } from "lodash";
import { CircularProgress, Stack } from "@mui/material";
import ErrorMessage from "@/components/cutomized/NotFound/ErrorMessage";
import { useInfiniteUserBookmarkedPosts } from "@/controllers/social/bookmark.controller";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

type ProfileBookmarksTabProps = {
  userId: number;
};

const ProfileBookmarksTab = ({ userId }: ProfileBookmarksTabProps) => {
  const { data, isLoading, isError } = useInfiniteUserBookmarkedPosts({
    userId,
  });

  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  return (
    <>
      {isLoading && (
        <Stack justifyContent="center" alignItems="center" mt={10}>
          <CircularProgress />
        </Stack>
      )}

      <PostGridContainer>
        {!isLoading &&
          posts?.map((post) => (
            <PostGrid
              key={post.id}
              viewsCount={post.counters.views_count}
              thumbnailUrl={post.media_files[0]?.thumbnail_url ?? null}
              onNavigateToVideo={() => {}}
            />
          ))}
      </PostGridContainer>

      {!isLoading && isEmpty(posts) && !isError && (
        <NotFound
          title="Nu există postări salvate"
          description="Salvează postările tale preferate pentru a le viziona mai târziu"
          icon={<VideoLibraryOutlinedIcon />}
        />
      )}

      {!isLoading && isError && <ErrorMessage resource="salvări" />}
    </>
  );
};

export default memo(ProfileBookmarksTab);
