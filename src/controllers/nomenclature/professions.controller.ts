import { PaginatedData } from "@/components/core/Table/Table";
import {
  Profession,
  ProfessionCreateOrUpdate,
} from "@/ts/models/nomenclatures/profession/ProfessionType";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PROFESSION_PATH = "/api/protected/professions";

type GetAllProfessionsType = {
  page: number;
  limit: number;
  all?: boolean;
};

type UpdateProfessionParams = {
  id: string;
  data: ProfessionCreateOrUpdate;
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
