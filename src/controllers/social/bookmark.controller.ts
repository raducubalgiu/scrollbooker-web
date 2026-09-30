import { PaginatedData } from "@/components/core/Table/Table";
import { Post } from "@/ts/models/social/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GetAllUserBookmarksParams = {
  userId: number;
  page: number;
  limit: number;
};

export const useGetAllUserBookmarks = ({
  userId,
  page,
  limit,
}: GetAllUserBookmarksParams) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<Post>
      >(`/api/protected/users/${userId}/bookmark-posts?page${page}&limit=${limit}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["user-bookmarks"],
    queryFn: doRequest,
  });
};
