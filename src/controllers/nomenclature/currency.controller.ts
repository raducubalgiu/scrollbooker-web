import { PaginatedData } from "@/components/core/Table/Table";
import {
  Currency,
  CurrencyCreateOrUpdate,
} from "@/ts/models/nomenclatures/currency/Currency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CURRENCY_PATH = "/api/protected/currencies";

type GetAllCurrenciesType = {
  page: number;
  limit: number;
};

type UpdateCurrencyParams = {
  id: string;
  data: CurrencyCreateOrUpdate;
};

export const useAllCurrencies = ({ page, limit }: GetAllCurrenciesType) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<Currency>
      >(`${CURRENCY_PATH}?page=${page}&limit=${limit}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["currencies", page, limit],
    queryFn: doRequest,
  });
};

export const useCreateCurrency = () => {
  const queryClient = useQueryClient();

  const doRequest = (payload: CurrencyCreateOrUpdate): Promise<Currency> =>
    axios.post(CURRENCY_PATH, payload).then((response) => response.data);

  return useMutation<Currency, Error, CurrencyCreateOrUpdate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
  });
};

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  const doRequest = ({ id, data }: UpdateCurrencyParams): Promise<Currency> =>
    axios.put(`${CURRENCY_PATH}/${id}`, data).then((res) => res.data);

  return useMutation<Currency, Error, UpdateCurrencyParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
  });
};

export const useDeleteCurrency = () => {
  const queryClient = useQueryClient();

  const doRequest = (id: string): Promise<void> =>
    axios.delete(`${CURRENCY_PATH}/${id}`).then((res) => res.data);

  return useMutation<void, Error, string>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
  });
};
