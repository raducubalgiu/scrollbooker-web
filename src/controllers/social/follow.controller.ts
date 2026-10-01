import { PaginatedData } from "@/components/core/Table/Table";
import { UserMini } from "@/ts/models/user/UserMini";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const FOLLOWS_PATH = "/api/protected/follows";

export const useFollow = () => {
  return useMutation({
    mutationFn: (followeeId: number) =>
      axios.post(`${FOLLOWS_PATH}/${followeeId}`),
  });
};

export const useUnfollow = () => {
  return useMutation({
    mutationFn: (followeeId: number) =>
      axios.delete(`${FOLLOWS_PATH}/${followeeId}`),
  });
};

const fetchFollowers = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<UserMini>>(
    `/api/protected/users/${userId}/followers?page=${pageParam}&limit=20`
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

const fetchFollowings = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<UserMini>>(
    `/api/protected/users/${userId}/followings?page=${pageParam}&limit=20`
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
