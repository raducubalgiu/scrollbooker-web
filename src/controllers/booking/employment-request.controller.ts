import { EmploymentRequestStatusEnum } from "@/ts/enums/EmploymentRequestStatusEnum";
import {
  EmploymentRequest,
  EmploymentRequestCreate,
} from "@/ts/models/booking/employmentRequest/EmploymentRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const EMPLOYMENT_REQUEST_PATH = "/api/protected/employment-requests";

type GetUserEmploymentRequestsParams = {
  userId: number;
  isEnabled: boolean;
};

export const useGetUserEmploymentRequests = ({
  userId,
  isEnabled,
}: GetUserEmploymentRequestsParams) => {
  const doRequest = () =>
    axios
      .get<
        EmploymentRequest[]
      >(`/api/protected/users/${userId}/employment-requests`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["employment-requests", userId],
    queryFn: doRequest,
    enabled: isEnabled,
  });
};

export const useCreateEmploymentRequest = () => {
  const queryClient = useQueryClient();

  const doRequest = (payload: EmploymentRequestCreate): Promise<void> =>
    axios
      .post(EMPLOYMENT_REQUEST_PATH, payload)
      .then((response) => response.data);

  return useMutation<void, Error, EmploymentRequestCreate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employment-requests"] });
    },
  });
};

export const useCancelEmploymentRequest = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios
      .delete(`${EMPLOYMENT_REQUEST_PATH}/${id}/cancel`)
      .then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employment-requests"] });
    },
  });
};

export const useRespondEmploymentRequest = (id: string) => {
  const queryClient = useQueryClient();

  const doRequest = (payload: EmploymentRequestStatusEnum): Promise<void> =>
    axios
      .put(`/${EMPLOYMENT_REQUEST_PATH}/${id}`, payload)
      .then((response) => response.data);

  return useMutation<void, Error, EmploymentRequestStatusEnum>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employment-requests"] });
    },
  });
};
