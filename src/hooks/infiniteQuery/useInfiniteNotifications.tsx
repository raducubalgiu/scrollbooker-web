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
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
