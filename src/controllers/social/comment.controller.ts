import { PaginatedData } from "@/components/core/Table/Table";
import { PostComment } from "@/ts/models/social/PostComment";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const COMMENTS_PATH = "/api/protected/comments";

export const useLikeComment = () => {
  return useMutation({
    mutationFn: (commentId: number) =>
      axios.post(`${COMMENTS_PATH}/${commentId}/likes`),
  });
};

export const useUnlikeComment = () => {
  return useMutation({
    mutationFn: (commentId: number) =>
      axios.delete(`${COMMENTS_PATH}/${commentId}/likes`),
  });
};

type FetchCommentsParams = {
  pageParam: number;
  postId?: number;
};

type FetchCommentRepliesParams = {
  pageParam: number;
  postId?: number;
  parentId?: number;
};

const fetchComments = async ({ pageParam, postId }: FetchCommentsParams) => {
  const { data } = await axios.get<PaginatedData<PostComment>>(
    `/api/protected/posts/${postId}/comments?page=${pageParam}&limit=10`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteComments = ({
  enabled,
  postId,
}: {
  enabled: boolean;
  postId: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) => fetchComments({ pageParam, postId }),
    initialPageParam: 1,
    enabled: !!postId && enabled,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};

const fetchCommentReplies = async ({
  pageParam,
  postId,
  parentId,
}: FetchCommentRepliesParams) => {
  const { data } = await axios.get<PaginatedData<PostComment>>(
    `/api/protected/posts/${postId}/comments/${parentId}/replies?page=${pageParam}&limit=10`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteCommentReplies = ({
  enabled,
  postId,
  parentId,
}: {
  enabled: boolean;
  postId: number;
  parentId: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["comment-replies", postId, parentId],
    queryFn: ({ pageParam = 1 }) =>
      fetchCommentReplies({ pageParam, postId, parentId }),
    initialPageParam: 1,
    enabled: !!postId && !!parentId && enabled,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};

type CreateCommentParams = {
  postId: number;
  text: string;
  parentId?: number | null;
  replyToCommentId?: number | null;
};

const createComment = async ({
  postId,
  text,
  parentId,
  replyToCommentId,
}: CreateCommentParams) => {
  const { data } = await axios.post<PostComment>(
    `/api/protected/posts/${postId}/comments`,
    {
      text,
      parent_id: parentId ?? null,
      reply_to_comment_id: replyToCommentId ?? null,
    }
  );

  return data;
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment, { postId, parentId }) => {
      if (!parentId) {
        queryClient.setQueryData<InfiniteData<PaginatedData<PostComment>>>(
          ["comments", postId],
          (data) => {
            const first = data?.pages[0];
            if (!data || !first) return data;

            return {
              ...data,
              pages: [
                {
                  ...first,
                  results: [newComment, ...first.results],
                  count: first.count + 1,
                },
                ...data.pages.slice(1),
              ],
            };
          }
        );
        return;
      }

      queryClient.setQueryData<InfiniteData<PaginatedData<PostComment>>>(
        ["comment-replies", postId, parentId],
        (data) => {
          const first = data?.pages[0];
          if (!data || !first) return data;

          return {
            ...data,
            pages: [
              {
                ...first,
                results: [...first.results, newComment],
                count: first.count + 1,
              },
              ...data.pages.slice(1),
            ],
          };
        }
      );

      queryClient.setQueryData<InfiniteData<PaginatedData<PostComment>>>(
        ["comments", postId],
        (data) => {
          if (!data) return data;

          return {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              results: page.results.map((c) =>
                c.id === parentId
                  ? { ...c, replies_count: c.replies_count + 1 }
                  : c
              ),
            })),
          };
        }
      );
    },
  });
};
