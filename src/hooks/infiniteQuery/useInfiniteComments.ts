import { PaginatedData } from "@/components/core/Table/Table";
import { PostComment } from "@/ts/models/social/PostComment";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

type FetchCommentsParams = {
  pageParam: number;
  postId?: number;
};

const fetchComments = async ({ pageParam, postId }: FetchCommentsParams) => {
  const { data } = await axios.get<PaginatedData<PostComment>>(
    `/api/comments?postId=${postId}&page=${pageParam}&limit=${PAGE_LIMIT}`
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
