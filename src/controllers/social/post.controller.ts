import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const POST_PATH = "/api/protected/posts";

const fetchExplorePosts = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Post>>(
    `${POST_PATH}/explore?page=${pageParam}&limit=10&only_video_reviews=false`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteExplorePosts = ({
  enabled = true,
}: { enabled?: boolean } = {}) => {
  return useInfiniteQuery({
    queryKey: ["explorePosts"],
    queryFn: ({ pageParam = 1 }) => fetchExplorePosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
    enabled,
  });
};

const fetchFollowingPosts = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Post>>(
    `${POST_PATH}/following?page=${pageParam}&limit=10`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteFollowingPosts = ({
  enabled = true,
}: { enabled?: boolean } = {}) => {
  return useInfiniteQuery({
    queryKey: ["followingPosts"],
    queryFn: ({ pageParam = 1 }) => fetchFollowingPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
    enabled,
  });
};
