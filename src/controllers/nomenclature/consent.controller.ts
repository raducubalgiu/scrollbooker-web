import {
  Consent,
  ConsentCreateOrUpdate,
} from "@/ts/models/nomenclatures/consent/Consent";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CONSENT_PATH = "/api/protected/consents";

type UpdateConsentParams = {
  id: string;
  data: ConsentCreateOrUpdate;
};

type GetConsentByNameParams = {
  consentName: string;
  isEnabled: boolean;
};

export const useAllConsents = () => {
  const doRequest = () =>
    axios.get<Consent[]>(CONSENT_PATH).then((response) => response.data);

  return useQuery({
    queryKey: ["consents"],
    queryFn: doRequest,
  });
};

export const useGetConsentByName = ({
  consentName,
  isEnabled,
}: GetConsentByNameParams) => {
  const doRequest = () =>
    axios
      .get<Consent>(`${CONSENT_PATH}/${consentName}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["consents", "by-name", consentName],
    queryFn: doRequest,
    enabled: !!consentName && isEnabled,
  });
};

export const useCreateConsent = () => {
  const queryClient = useQueryClient();

  const doRequest = (payload: ConsentCreateOrUpdate): Promise<Consent> =>
    axios.post(CONSENT_PATH, payload).then((response) => response.data);

  return useMutation<Consent, Error, ConsentCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
  });
};

export const useUpdateConsent = () => {
  const queryClient = useQueryClient();

  const doRequest = ({ id, data }: UpdateConsentParams): Promise<Consent> =>
    axios.put(`${CONSENT_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<Consent, Error, UpdateConsentParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
  });
};

export const useDeleteConsent = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${CONSENT_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
  });
};
