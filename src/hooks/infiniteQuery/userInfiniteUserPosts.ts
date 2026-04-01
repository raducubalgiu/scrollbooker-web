import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

const fetchUserPosts = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<Post>>(
    `/api/profile/posts?userId=${userId}&page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteUserPosts = (userId?: number) => {
  return useInfiniteQuery({
    queryKey: ["userPosts", userId],
    queryFn: ({ pageParam = 1 }) => fetchUserPosts({ pageParam, userId }),
    initialPageParam: 1,
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 5 minutes
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
