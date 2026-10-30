import { PaginatedData } from "@/components/core/Table/Table";
import {
  BusinessClient,
  BusinessClientCreate,
} from "@/ts/models/booking/businessClient/BusinessClient";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

type GetBusinessClientsParams = {
  businessId: number;
  query?: string;
  page?: number;
  limit?: number;
  isEnabled?: boolean;
};

export const useGetBusinessClients = ({
  businessId,
  query,
  page = 1,
  limit = 20,
  isEnabled = true,
}: GetBusinessClientsParams) => {
  const doRequest = () => {
    const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (query && query.trim().length > 0) {
      searchParams.append("query", query.trim());
    }

    return axios
      .get<PaginatedData<BusinessClient>>(
        `/api/protected/businesses/${businessId}/clients?${searchParams.toString()}`
      )
      .then((response) => response.data);
  };

  return useQuery({
    queryKey: ["business-clients", businessId, query, page, limit],
    queryFn: doRequest,
    enabled: isEnabled && !!businessId,
  });
};

type GetInfiniteBusinessClientsParams = {
  businessId: number;
  query?: string;
  limit?: number;
  isEnabled?: boolean;
};

export const useInfiniteBusinessClients = ({
  businessId,
  query,
  limit = 20,
  isEnabled = true,
}: GetInfiniteBusinessClientsParams) => {
  const trimmedQuery = query?.trim() ?? "";

  return useInfiniteQuery({
    queryKey: ["business-clients", "infinite", businessId, trimmedQuery, limit],
    queryFn: ({ pageParam }) => {
      const searchParams = new URLSearchParams({
        page: String(pageParam),
        limit: String(limit),
      });

      if (trimmedQuery.length > 0) searchParams.append("query", trimmedQuery);

      return axios
        .get<PaginatedData<BusinessClient>>(
          `/api/protected/businesses/${businessId}/clients?${searchParams.toString()}`
        )
        .then((response) => response.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((page) => page.results).length;
      return totalFetched < lastPage.count && lastPage.results.length > 0
        ? pages.length + 1
        : undefined;
    },
    enabled: isEnabled && !!businessId,
  });
};

type CreateBusinessClientParams = {
  businessId: number;
  data: BusinessClientCreate;
};

export const useCreateBusinessClient = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    businessId,
    data,
  }: CreateBusinessClientParams): Promise<BusinessClient> =>
    axios
      .post(`/api/protected/businesses/${businessId}/clients`, data)
      .then((res) => res.data);

  return useMutation<BusinessClient, Error, CreateBusinessClientParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-clients"] });
    },
  });
};
