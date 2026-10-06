import { PaginatedData } from "@/components/core/Table/Table";
import { PostComment } from "@/ts/models/social/PostComment";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

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
