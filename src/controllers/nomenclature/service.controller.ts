import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type GetMySelectedServicesParams = { businessId: string };
type UpdateMySelectedServicesParams = {
  businessId: string;
  data: { service_ids: number[] };
};

export const useGetMySelectedServices = ({
  businessId,
}: GetMySelectedServicesParams) => {
  const doRequest = () =>
    axios
      .get<
        SelectedServiceDomainWithServices[]
      >(`/api/protected/businesses/${businessId}/service-domains`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["my-selected-services", businessId],
    queryFn: doRequest,
    enabled: businessId !== "undefined" && businessId !== "null",
  });
};

export const useUpdateMySelectedServices = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    businessId,
    data,
  }: UpdateMySelectedServicesParams): Promise<
    SelectedServiceDomainWithServices[]
  > =>
    axios
      .put(`/api/protected/businesses/${businessId}/update-services`, data)
      .then((res) => res.data);

  return useMutation<
    SelectedServiceDomainWithServices[],
    Error,
    UpdateMySelectedServicesParams
  >({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-selected-services"] });
    },
  });
};
