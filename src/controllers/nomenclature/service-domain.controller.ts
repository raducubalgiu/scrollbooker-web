import { PaginatedData } from "@/components/core/Table/Table";
import {
  ServiceDomain,
  ServiceDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const SERVICE_DOMAIN_PATH = "/api/protected/service-domains";

type GetAllServiceDomainsType = {
  page: number;
  limit: number;
  all: boolean;
};

type UpdateServiceDomainsParams = {
  id: string;
  data: ServiceDomainCreateOrUpdate;
};

export const useAllServiceDomains = ({
  page,
  limit,
  all,
}: GetAllServiceDomainsType) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<ServiceDomain>
      >(`${SERVICE_DOMAIN_PATH}?page=${page}&limit=${limit}&all=${all}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["service-domains", page, limit, all],
    queryFn: doRequest,
  });
};

export const useCreateServiceDomain = () => {
  const queryClient = useQueryClient();

  const doRequest = (
    payload: ServiceDomainCreateOrUpdate
  ): Promise<ServiceDomain> =>
    axios.post(SERVICE_DOMAIN_PATH, payload).then((response) => response.data);

  return useMutation<ServiceDomain, Error, ServiceDomainCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-domains"] });
    },
  });
};

export const useUpdateServiceDomain = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    id,
    data,
  }: UpdateServiceDomainsParams): Promise<ServiceDomain> =>
    axios.put(`${SERVICE_DOMAIN_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<ServiceDomain, Error, UpdateServiceDomainsParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-domains"] });
    },
  });
};

export const useDeleteServiceDomain = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${SERVICE_DOMAIN_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-domains"] });
    },
  });
};
