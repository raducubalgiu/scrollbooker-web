import { PaginatedData } from "@/components/core/Table/Table";
import { Notification } from "@/ts/models/user/Notification";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const NOTIFICATIONS_PATH = "/api/protected/notifications";
const NOTIFICATIONS_COUNT_POLL_INTERVAL = 60_000;

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

type UseNotificationsCountParams = {
  isEnabled?: boolean;
};

export const useNotificationsCount = ({
  isEnabled = true,
}: UseNotificationsCountParams = {}) => {
  const doRequest = () =>
    axios
      .get<number>(`${NOTIFICATIONS_PATH}/count`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["notifications", "count"],
    queryFn: doRequest,
    enabled: isEnabled,
    refetchInterval: NOTIFICATIONS_COUNT_POLL_INTERVAL,
  });
};

export const useMarkNotificationsAsRead = () => {
  const doRequest = (notificationIds: number[]): Promise<void> =>
    axios
      .patch(`${NOTIFICATIONS_PATH}/read`, { notification_ids: notificationIds })
      .then((res) => res.data);

  return useMutation<void, Error, number[]>({
    mutationFn: doRequest,
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
