import { PaginatedData } from "@/components/core/Table/Table";
import {
  SubFilter,
  SubFilterCreateOrUpdate,
} from "@/ts/models/nomenclatures/subFilter/SubFilter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const FILTERS_BASE_PATH = "/api/protected/filters";
const SUB_FILTER_PATH = "/api/protected/sub-filters";

type GetAllSubFiltersType = {
  page: number;
  limit: number;
  filterId?: string;
};

type UpdateSubFilterParams = {
  id: string;
  data: SubFilterCreateOrUpdate;
};

export const useAllSubFilters = ({
  page,
  limit,
  filterId,
}: GetAllSubFiltersType) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<SubFilter>
      >(`${FILTERS_BASE_PATH}/${filterId}/sub-filters?page=${page}&limit=${limit}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["sub-filters", filterId, page, limit],
    queryFn: doRequest,
    enabled: !!filterId,
  });
};

export const useCreateSubFilter = () => {
  const queryClient = useQueryClient();

  const doRequest = (payload: SubFilterCreateOrUpdate): Promise<SubFilter> =>
    axios.post(SUB_FILTER_PATH, payload).then((response) => response.data);

  return useMutation<SubFilter, Error, SubFilterCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sub-filters"] });
      queryClient.invalidateQueries({ queryKey: ["filters"] });
    },
  });
};

export const useUpdateSubFilter = () => {
  const queryClient = useQueryClient();

  const doRequest = ({ id, data }: UpdateSubFilterParams): Promise<SubFilter> =>
    axios.put(`${SUB_FILTER_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<SubFilter, Error, UpdateSubFilterParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sub-filters"] });
      queryClient.invalidateQueries({ queryKey: ["filters"] });
    },
  });
};

export const useDeleteSubFilter = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${SUB_FILTER_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sub-filters"] });
      queryClient.invalidateQueries({ queryKey: ["filters"] });
    },
  });
};
