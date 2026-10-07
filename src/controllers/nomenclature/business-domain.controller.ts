import {
  BusinessDomain,
  BusinessDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BUSINESS_DOMAIN_PATH = "/api/protected/business-domains";

type AllGetBusinessDomainsParams = {
  all: boolean;
};

export const useGetAllBusinessDomains = ({
  all,
}: AllGetBusinessDomainsParams) => {
  const doRequest = () =>
    axios
      .get<BusinessDomain[]>(`${BUSINESS_DOMAIN_PATH}?all=${all}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["business-domains", all],
    queryFn: doRequest,
  });
};

export const useCreateBusinessDomain = () => {
  const queryClient = useQueryClient();

  const doRequest = (
    payload: BusinessDomainCreateOrUpdate
  ): Promise<BusinessDomain> =>
    axios.post(BUSINESS_DOMAIN_PATH, payload).then((response) => response.data);

  return useMutation<BusinessDomain, Error, BusinessDomainCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-domains"] });
    },
  });
};

type UpdateBusinessDomainsParams = {
  id: string;
  data: BusinessDomainCreateOrUpdate;
};

export const useUpdateBusinessDomain = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    id,
    data,
  }: UpdateBusinessDomainsParams): Promise<BusinessDomain> =>
    axios.put(`${BUSINESS_DOMAIN_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<BusinessDomain, Error, UpdateBusinessDomainsParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-domains"] });
    },
  });
};

export const useDeleteBusinessDomain = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${BUSINESS_DOMAIN_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-domains"] });
    },
  });
};
