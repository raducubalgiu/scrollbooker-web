import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

const fetchExplorePosts = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Post>>(
    `/api/explore?page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteExplorePosts = () => {
  return useInfiniteQuery({
    queryKey: ["explorePosts"],
    queryFn: ({ pageParam = 1 }) => fetchExplorePosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
