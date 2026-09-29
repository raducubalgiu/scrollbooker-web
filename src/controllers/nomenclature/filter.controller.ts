import { PaginatedData } from "@/components/core/Table/Table";
import {
  Filter,
  FilterCreateOrUpdate,
} from "@/ts/models/nomenclatures/filter/FilterType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const FILTER_PATH = "/api/protected/filters";

type GetAllFiltersType = {
  page: number;
  limit: number;
};

type UpdateFilterParams = {
  id: string;
  data: FilterCreateOrUpdate;
};

export const useAllFilters = ({ page, limit }: GetAllFiltersType) => {
  const doRequest = () =>
    axios
      .get<PaginatedData<Filter>>(`${FILTER_PATH}?page=${page}&limit=${limit}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["filters", page, limit],
    queryFn: doRequest,
  });
};

export const useCreateFilter = () => {
  const queryClient = useQueryClient();

  const doRequest = (payload: FilterCreateOrUpdate): Promise<Filter> =>
    axios.post(FILTER_PATH, payload).then((response) => response.data);

  return useMutation<Filter, Error, FilterCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filters"] });
    },
  });
};

export const useUpdateFilter = () => {
  const queryClient = useQueryClient();

  const doRequest = ({ id, data }: UpdateFilterParams): Promise<Filter> =>
    axios.put(`${FILTER_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<Filter, Error, UpdateFilterParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filters"] });
    },
  });
};

export const useDeleteFilter = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${FILTER_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filters"] });
    },
  });
};
