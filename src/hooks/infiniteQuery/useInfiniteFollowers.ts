import { PaginatedData } from "@/components/core/Table/Table";
import { UserMiniType } from "@/ts/models/user/UserMiniType";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

const fetchFollowers = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<UserMiniType>>(
    `/api/social/followers?userId=${userId}&page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteFollowers = (userId?: number) => {
  return useInfiniteQuery({
    queryKey: ["followers", userId],
    queryFn: ({ pageParam = 1 }) => fetchFollowers({ pageParam, userId }),
    initialPageParam: 1,
    enabled: !!userId,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
