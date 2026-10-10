import { PaginatedData } from "@/components/core/Table/Table";
import {
  Profession,
  ProfessionCreateOrUpdate,
  ProfessionWithBusinessTypes,
} from "@/ts/models/nomenclatures/profession/ProfessionType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PROFESSION_PATH = "/api/protected/professions";

type GetAllProfessionsType = {
  page: number;
  limit: number;
  all?: boolean;
};

type GetAllProfessionsWithBusinessTypesParams = {
  page: number;
  limit: number;
};

type UpdateProfessionParams = {
  id: string;
  data: ProfessionCreateOrUpdate;
};

type AttachDetachProfessionBusinessTypeParams = {
  professionId: number;
  businessTypeId: number;
};

export const useAllProfessions = ({
  page,
  limit,
  all = true,
}: GetAllProfessionsType) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<Profession>
      >(`${PROFESSION_PATH}?page=${page}&limit=${limit}&all=${all}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["professions", page, limit, all],
    queryFn: doRequest,
  });
};

export const useAllProfessionsWithBusinessTypes = ({
  page,
  limit,
}: GetAllProfessionsWithBusinessTypesParams) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<ProfessionWithBusinessTypes>
      >(`${PROFESSION_PATH}/with-business-types?page=${page}&limit=${limit}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["professions-with-business-types", page, limit],
    queryFn: doRequest,
  });
};

type GetProfessionsByBusinessTypeParams = {
  businessTypeId: number | null | undefined;
  isEnabled: boolean;
};

export const useGetProfessionsByBusinessType = ({
  businessTypeId,
  isEnabled,
}: GetProfessionsByBusinessTypeParams) => {
  const doRequest = () =>
    axios
      .get<
        Profession[]
      >(`/api/protected/business-types/${businessTypeId}/professions`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["professions-by-business-type", businessTypeId],
    queryFn: doRequest,
    enabled: isEnabled && !!businessTypeId,
  });
};

export const useCreateProfession = () => {
  const queryClient = useQueryClient();

  const doRequest = (payload: ProfessionCreateOrUpdate): Promise<Profession> =>
    axios.post(PROFESSION_PATH, payload).then((response) => response.data);

  return useMutation<Profession, Error, ProfessionCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};

export const useUpdateProfession = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    id,
    data,
  }: UpdateProfessionParams): Promise<Profession> =>
    axios.put(`${PROFESSION_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<Profession, Error, UpdateProfessionParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};

export const useAttachProfessionBusinessType = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    professionId,
    businessTypeId,
  }: AttachDetachProfessionBusinessTypeParams): Promise<void> =>
    axios
      .post(`${PROFESSION_PATH}/${professionId}/business-types/${businessTypeId}`)
      .then((res) => res.data);

  return useMutation<void, Error, AttachDetachProfessionBusinessTypeParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professions-with-business-types"],
      });
    },
  });
};

export const useDetachProfessionBusinessType = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    professionId,
    businessTypeId,
  }: AttachDetachProfessionBusinessTypeParams): Promise<void> =>
    axios
      .delete(`${PROFESSION_PATH}/${professionId}/business-types/${businessTypeId}`)
      .then((res) => res.data);

  return useMutation<void, Error, AttachDetachProfessionBusinessTypeParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professions-with-business-types"],
      });
    },
  });
};

export const useDeleteProfession = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${PROFESSION_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professions"] });
    },
  });
};
