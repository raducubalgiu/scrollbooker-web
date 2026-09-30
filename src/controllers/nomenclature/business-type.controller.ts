import { PaginatedData } from "@/components/core/Table/Table";
import {
  BusinessType,
  BusinessTypeCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessType/BusinessType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BUSINESS_TYPE_PATH = "/api/protected/business-types";

type GetGetAllBusinessTypesTypePaginated = {
  page: number;
  limit: number;
  all: boolean;
};

type UpdateBusinessTypeParams = {
  id: string;
  data: BusinessTypeCreateOrUpdate;
};

export const useGetAllBusinessTypes = () => {
  const doRequest = () =>
    axios
      .get<BusinessType[]>(BUSINESS_TYPE_PATH)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["business-types"],
    queryFn: doRequest,
  });
};

export const useGetAllBusinessTypesPaginated = ({
  page,
  limit,
  all,
}: GetGetAllBusinessTypesTypePaginated) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<BusinessType>
      >(`${BUSINESS_TYPE_PATH}?page=${page}&limit=${limit}&all=${all}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["business-types", page, limit, all],
    queryFn: doRequest,
  });
};

export const useCreateBusinessType = () => {
  const queryClient = useQueryClient();

  const doRequest = (
    payload: BusinessTypeCreateOrUpdate
  ): Promise<BusinessType> =>
    axios.post(BUSINESS_TYPE_PATH, payload).then((response) => response.data);

  return useMutation<BusinessType, Error, BusinessTypeCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-types"] });
    },
  });
};

export const useUpdateBusinessType = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    id,
    data,
  }: UpdateBusinessTypeParams): Promise<BusinessType> =>
    axios.put(`${BUSINESS_TYPE_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<BusinessType, Error, UpdateBusinessTypeParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-types"] });
    },
  });
};

export const useDeleteBusinessType = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${BUSINESS_TYPE_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-types"] });
    },
  });
};
