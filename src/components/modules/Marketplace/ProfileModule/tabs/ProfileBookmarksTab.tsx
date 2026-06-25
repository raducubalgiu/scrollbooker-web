import React, { memo, useMemo } from "react";
import PostGridContainer from "@/components/cutomized/PostGrid/PostGridContainer";
import PostGrid from "@/components/cutomized/PostGrid/PostGrid";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useInfiniteUserBookmarkedPosts } from "@/hooks/infiniteQuery/useInfiniteUserBookmarkedPosts";
import { isEmpty } from "lodash";
import { CircularProgress, Stack } from "@mui/material";
import ErrorMessage from "@/components/cutomized/NotFound/ErrorMessage";

type ProfileBookmarksTabProps = {
  username: string;
};

const ProfileBookmarksTab = ({ username }: ProfileBookmarksTabProps) => {
  console.log(username);

  const { data, isLoading, isError } = useInfiniteUserBookmarkedPosts();

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
          icon={<VideoLibraryIcon sx={{ fontSize: 50 }} />}
        />
      )}

      {!isLoading && isError && <ErrorMessage resource="salvări" />}
    </>
  );
};

export default memo(ProfileBookmarksTab);
