import { PaginatedData } from "@/components/core/Table/Table";
import { Notification } from "@/ts/models/user/Notification";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNotifications = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Notification>>(
    `/api/notifications?page=${pageParam}&limit=10`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.results.length < 10) return undefined;
      return lastPage.page + 1;
    },
  });
};
