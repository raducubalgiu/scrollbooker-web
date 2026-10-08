import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { PaginatedData } from "@/components/core/Table/Table";
import { PostComment } from "@/ts/models/social/PostComment";

export const patchCommentInCache = (
  queryClient: QueryClient,
  postId: number,
  comment: PostComment,
  updater: (comment: PostComment) => PostComment
) => {
  const queryKey = comment.parent_id
    ? ["comment-replies", postId, comment.parent_id]
    : ["comments", postId];

  queryClient.setQueryData<InfiniteData<PaginatedData<PostComment>>>(
    queryKey,
    (data) => {
      if (!data) return data;

      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          results: page.results.map((c) =>
            c.id === comment.id ? updater(c) : c
          ),
        })),
      };
    }
  );
};
