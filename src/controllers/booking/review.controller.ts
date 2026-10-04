import {
  Review,
  ReviewCreate,
  ReviewUpdate,
} from "@/ts/models/booking/review/Review";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const REVIEWS_PATH = "/api/protected/reviews";

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
