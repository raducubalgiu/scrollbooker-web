import { PaginatedData } from "@/components/core/Table/Table";
import { UserMini } from "@/ts/models/user/UserMini";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

const fetchFollowings = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<UserMini>>(
    `/api/social/followings?userId=${userId}&page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteFollowings = (userId?: number) => {
  return useInfiniteQuery({
    queryKey: ["followings", userId],
    queryFn: ({ pageParam = 1 }) => fetchFollowings({ pageParam, userId }),
    initialPageParam: 1,
    enabled: !!userId,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
