import { PaginatedData } from "@/components/core/Table/Table";
import { Review } from "@/ts/models/booking/review/Review";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 20;

const fetchReviews = async ({
  pageParam,
  userId,
  selectedRatings,
}: {
  pageParam: number;
  userId: number | undefined;
  selectedRatings?: Set<number>;
}) => {
  const ratingsArray = selectedRatings
    ? [...selectedRatings].filter((n) => typeof n === "number")
    : [];
  const ratingsParam =
    ratingsArray.length > 0
      ? `&ratings=${encodeURIComponent(ratingsArray.join(","))}`
      : "";

  const { data } = await axios.get<PaginatedData<Review>>(
    `/api/social/reviews/written?userId=${userId}&page=${pageParam}&limit=${PAGE_LIMIT}${ratingsParam}`
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteReviews = (
  userId?: number,
  selectedRatings?: Set<number>
) => {
  const serializedRatings = selectedRatings
    ? [...selectedRatings].sort((a, b) => a - b).join(",")
    : "";

  return useInfiniteQuery({
    queryKey: ["reviews", userId, serializedRatings],
    queryFn: ({ pageParam = 1 }) =>
      fetchReviews({
        pageParam,
        userId,
        selectedRatings: selectedRatings ?? undefined,
      }),
    initialPageParam: 1,
    enabled: !!userId,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
