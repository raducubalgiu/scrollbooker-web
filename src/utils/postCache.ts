import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";

export const POST_QUERY_KEYS = {
  explore: ["explorePosts"],
  following: ["followingPosts"],
  userPosts: ["userPosts"],
  userBookmarkedPosts: ["userBookmarkedPosts"],
} as const;

export const patchPostInAllCaches = (
  queryClient: QueryClient,
  postId: number,
  updater: (post: Post) => Post
) => {
  Object.values(POST_QUERY_KEYS).forEach((key) => {
    queryClient.setQueriesData<InfiniteData<PaginatedData<Post>>>(
      { queryKey: key },
      (data) => {
        if (!data) return data;

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            results: page.results.map((p) =>
              p.id === postId ? updater(p) : p
            ),
          })),
        };
      }
    );
  });
};

export const patchFollowInAllCaches = (
  queryClient: QueryClient,
  userId: number,
  isFollow: boolean
) => {
  Object.values(POST_QUERY_KEYS).forEach((key) => {
    queryClient.setQueriesData<InfiniteData<PaginatedData<Post>>>(
      { queryKey: key },
      (data) => {
        if (!data) return data;

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            results: page.results.map((p) =>
              p.user.id === userId
                ? { ...p, user: { ...p.user, is_follow: isFollow } }
                : p
            ),
          })),
        };
      }
    );
  });
};
