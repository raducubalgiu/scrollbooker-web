import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 10;

const fetchExplorePosts = async ({
  pageParam,
  selectedBusinessTypes,
}: {
  pageParam: number;
  selectedBusinessTypes: Set<number>;
}) => {
  const businessTypeIds = Array.from(selectedBusinessTypes).join(",");

  const { data } = await axios.get<PaginatedData<Post>>(
    `/api/posts?page=${pageParam}&limit=${PAGE_LIMIT}&businessTypeIds=${businessTypeIds}`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteExplorePosts = (selectedBusinessTypes: Set<number>) => {
  const queryKeyFilter = Array.from(selectedBusinessTypes).sort();

  return useInfiniteQuery({
    queryKey: ["explorePosts", queryKeyFilter],
    queryFn: ({ pageParam = 1 }) =>
      fetchExplorePosts({ pageParam, selectedBusinessTypes }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
