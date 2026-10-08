import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { POST_QUERY_KEYS } from "@/utils/postCache";

const POSTS_PATH = "/api/protected/posts";
const PAGE_LIMIT = 20;

export const useBookmarkPost = () => {
  return useMutation({
    mutationFn: (postId: number) =>
      axios.post(`${POSTS_PATH}/${postId}/bookmark-posts`),
  });
};

export const useUnbookmarkPost = () => {
  return useMutation({
    mutationFn: (postId: number) =>
      axios.delete(`${POSTS_PATH}/${postId}/bookmark-posts`),
  });
};

const fetchUserBookmarkedPosts = async ({
  userId,
  pageParam,
}: {
  userId: number;
  pageParam: number;
}) => {
  const { data } = await axios.get<PaginatedData<Post>>(
    `/api/protected/users/${userId}/bookmark-posts?page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteUserBookmarkedPosts = ({
  userId,
}: {
  userId: number;
}) => {
  return useInfiniteQuery({
    queryKey: POST_QUERY_KEYS.userBookmarkedPosts,
    queryFn: ({ pageParam = 1 }) =>
      fetchUserBookmarkedPosts({ pageParam, userId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
