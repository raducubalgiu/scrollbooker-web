import { PaginatedData } from "@/components/core/Table/Table";
import { PostComment } from "@/ts/models/social/PostComment";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

type FetchCommentRepliesParams = {
  pageParam: number;
  postId?: number;
  parentId?: number;
};

const fetchCommentReplies = async ({
  pageParam,
  postId,
  parentId,
}: FetchCommentRepliesParams) => {
  const { data } = await axios.get<PaginatedData<PostComment>>(
    `/api/comments/replies?postId=${postId}&parentId=${parentId}&page=${pageParam}&limit=${PAGE_LIMIT}`
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
