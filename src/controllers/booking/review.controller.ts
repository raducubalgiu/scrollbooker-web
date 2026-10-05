import { PaginatedData } from "@/components/core/Table/Table";
import {
  Review,
  ReviewCreate,
  ReviewUpdate,
} from "@/ts/models/booking/review/Review";
import { ReviewsSummary } from "@/ts/models/booking/review/ReviewsSummaryType";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const REVIEWS_PATH = "/api/protected/reviews";

type UserReviewsParams = {
  businessId: number;
  employeeId: number | null;
  selectedRatings?: Set<number>;
};

type FetchReviewsParams = {
  pageParam: number;
  businessId: number;
  employeeId: number | null;
  selectedRatings: Set<number> | undefined;
};

const fetchReviews = async ({
  pageParam,
  businessId,
  employeeId,
  selectedRatings,
}: FetchReviewsParams) => {
  const ratingsArray = selectedRatings
    ? [...selectedRatings].filter((n) => typeof n === "number")
    : [];

  const ratingsParamValue =
    ratingsArray.length > 0 ? ratingsArray.join(",") : undefined;

  const queryParams: Record<string, any> = {
    page: pageParam,
    limit: 20,
    ratings: ratingsParamValue,
  };

  if (employeeId !== null && employeeId !== undefined) {
    queryParams.employeeId = employeeId;
  }

  const { data } = await axios.get<PaginatedData<Review>>(
    `/api/protected/businesses/${businessId}/reviews`,
    { params: queryParams }
  );

  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteReviews = ({
  businessId,
  employeeId,
  selectedRatings,
}: UserReviewsParams) => {
  const serializedRatings = selectedRatings
    ? [...selectedRatings].sort((a, b) => a - b).join(",")
    : "";

  return useInfiniteQuery({
    queryKey: ["reviews", businessId, employeeId, serializedRatings],
    queryFn: ({ pageParam }) =>
      fetchReviews({
        pageParam: pageParam as number,
        businessId,
        employeeId: employeeId,
        selectedRatings,
      }),
    initialPageParam: 1,
    enabled: !!businessId,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};

export type GetReviewsSummaryParams = {
  businessId: number;
  employeeId: number | null;
};

export const useGetReviewsSummary = ({
  businessId,
  employeeId,
}: GetReviewsSummaryParams) => {
  const doRequest = async () => {
    const queryParams: Record<string, any> = {};

    if (employeeId !== null && employeeId !== undefined) {
      queryParams.employeeId = employeeId;
    }

    const response = await axios.get<ReviewsSummary>(
      `/api/protected/businesses/${businessId}/reviews-summary`,
      { params: queryParams }
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["reviews-summary", businessId, employeeId],
    queryFn: doRequest,
    enabled: !!businessId,
  });
};

export const useCreateReview = (appointmentId: number) => {
  const doRequest = (payload: ReviewCreate): Promise<Review> =>
    axios
      .post(
        `/api/protected/appointments/${appointmentId}/create-review`,
        payload
      )
      .then((response) => response.data);

  return useMutation<Review, Error, ReviewCreate>({
    mutationFn: doRequest,
  });
};

interface UpdateReviewParams {
  reviewId: number;
  payload: ReviewUpdate;
}

export const useUpdateReview = () => {
  const doRequest = ({
    reviewId,
    payload,
  }: UpdateReviewParams): Promise<Review> =>
    axios
      .put<Review>(`${REVIEWS_PATH}/${reviewId}`, payload)
      .then((response) => response.data);

  return useMutation<Review, Error, UpdateReviewParams>({
    mutationFn: doRequest,
  });
};

export const useDeleteReview = () => {
  const doRequest = (reviewId: number): Promise<void> =>
    axios.delete(`${REVIEWS_PATH}/${reviewId}`).then(() => undefined);

  return useMutation<void, Error, number>({
    mutationFn: doRequest,
  });
};
