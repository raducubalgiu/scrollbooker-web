import { PaginatedData } from "@/components/core/Table/Table";
import { UserMini } from "@/ts/models/user/UserMini";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useFollowMutation = (
  ownerId: number | undefined,
  type: "followers" | "followings"
) => {
  const queryClient = useQueryClient();
  const queryKey = [type, ownerId];

  return useMutation({
    mutationFn: async ({
      targetUserId,
      isFollow,
    }: {
      targetUserId: number;
      isFollow: boolean;
    }) => {
      const url = `/api/social/follow`;
      const data = { followeeId: targetUserId };

      if (isFollow) {
        return axios.delete(url, { data });
      } else {
        return axios.post(url, data);
      }
    },

    onMutate: async ({ targetUserId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: InfiniteData<PaginatedData<UserMini>>) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            results: page.results.map((user) =>
              user.id === targetUserId
                ? { ...user, is_follow: !user.is_follow }
                : user
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
