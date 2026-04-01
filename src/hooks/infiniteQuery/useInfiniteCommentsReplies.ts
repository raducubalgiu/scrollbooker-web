import { PaginatedData } from "@/components/core/Table/Table";
import { PostComment } from "@/ts/models/social/PostComment";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 5;

const fetchReplies = async ({
  pageParam,
  postId,
  commentId,
}: {
  pageParam: number;
  postId: number | undefined;
  commentId: number | undefined;
}) => {
  const { data } = await axios.get<PaginatedData<PostComment>>(
    `/api/comments/replies?postId=${postId}&commentId=${commentId}&page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteCommentsReplies = (
  shouldFetchReplies: boolean,
  postId?: number,
  commentId?: number
) => {
  return useInfiniteQuery({
    queryKey: ["comment-replies", postId, commentId],
    queryFn: ({ pageParam = 1 }) =>
      fetchReplies({ pageParam, postId, commentId }),
    initialPageParam: 1,
    enabled: !!postId && !!commentId && shouldFetchReplies,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
