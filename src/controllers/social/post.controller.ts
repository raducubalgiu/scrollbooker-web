import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { POST_QUERY_KEYS } from "@/utils/postCache";

const POST_PATH = "/api/protected/posts";

const fetchExplorePosts = async ({
  pageParam,
  serviceIds,
  onlyVideoReviews,
}: {
  pageParam: number;
  serviceIds: number[];
  onlyVideoReviews: boolean;
}) => {
  const params = new URLSearchParams();
  params.set("page", String(pageParam));
  params.set("limit", "10");
  params.set("only_video_reviews", onlyVideoReviews ? "true" : "false");
  serviceIds.forEach((id) => params.append("service_ids", String(id)));

  const { data } = await axios.get<PaginatedData<Post>>(
    `${POST_PATH}/explore?${params.toString()}`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteExplorePosts = ({
  enabled = true,
  serviceIds = [],
  onlyVideoReviews = false,
}: {
  enabled?: boolean;
  serviceIds?: number[];
  onlyVideoReviews?: boolean;
} = {}) => {
  return useInfiniteQuery({
    queryKey: [...POST_QUERY_KEYS.explore, serviceIds, onlyVideoReviews],
    queryFn: ({ pageParam = 1 }) =>
      fetchExplorePosts({ pageParam, serviceIds, onlyVideoReviews }),
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
    queryKey: POST_QUERY_KEYS.following,
    queryFn: ({ pageParam = 1 }) => fetchFollowingPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
    enabled,
  });
};

const fetchUserPosts = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<Post>>(
    `/api/protected/users/${userId}/posts?page=${pageParam}&limit=10`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteUserPosts = ({ userId }: { userId: number }) => {
  return useInfiniteQuery({
    queryKey: [...POST_QUERY_KEYS.userPosts, userId],
    queryFn: ({ pageParam = 1 }) => fetchUserPosts({ pageParam, userId }),
    initialPageParam: 1,
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
