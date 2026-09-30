import { PaginatedData } from "@/components/core/Table/Table";
import { Notification } from "@/ts/models/user/Notification";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const NOTIFICATIONS_PATH = "/api/protected/notifications";

const fetchNotifications = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Notification>>(
    `${NOTIFICATIONS_PATH}?page=${pageParam}&limit=10`
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

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${NOTIFICATIONS_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
