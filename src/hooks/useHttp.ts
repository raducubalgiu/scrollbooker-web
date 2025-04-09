import {
	UseMutationOptions,
	UseMutationResult,
	UseQueryOptions,
	UseQueryResult,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig, Method } from "axios";

type HTTPMethod = "GET" | "POST";

type ParamsType = Record<string, string | number | boolean | undefined>;
type BodyType = Record<string, unknown>;

type CustomQueryProps<TData> = {
	key: string | (string | number | boolean | undefined)[];
	method?: HTTPMethod;
	url: string;
	params?: ParamsType;
	body?: BodyType;
	axiosConfig?: AxiosRequestConfig;
	options?: Omit<
		UseQueryOptions<TData, Error, TData, unknown[]>,
		"queryKey" | "queryFn"
	>;
};

export function useCustomQuery<TData>({
	key,
	method = "GET",
	url,
	params,
	body,
	axiosConfig,
	options = {},
}: CustomQueryProps<TData>): UseQueryResult<TData, Error> {
	const queryKey: unknown[] = Array.isArray(key) ? key : [key];

	const queryFn = async (): Promise<TData> => {
		const config: AxiosRequestConfig = {
			...axiosConfig,
			params: method === "GET" ? params : undefined,
		};

		const response =
			method === "GET"
				? await axios.get<TData>(url, config)
				: await axios.post<TData>(url, body, config);

		return response.data;
	};

	return useQuery<TData, Error, TData, unknown[]>({
		queryKey,
		queryFn,
		...options,
	});
}

type HTTPMutationMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type MutationParams<TBody, TResponse> = {
	key: string | unknown[];
	method?: HTTPMutationMethod;
	url: string;
	axiosConfig?: AxiosRequestConfig;
	options?: Omit<
		UseMutationOptions<TResponse, Error, TBody, unknown>,
		"mutationFn"
	>;
};

export function useMutate<TBody = unknown, TResponse = unknown>({
	key,
	method = "POST",
	url,
	axiosConfig,
	options = {},
}: MutationParams<TBody, TResponse>): UseMutationResult<
	TResponse,
	Error,
	TBody,
	unknown
> {
	const mutationFn = async (data: TBody): Promise<TResponse> => {
		const config: AxiosRequestConfig = {
			method: method as Method,
			url,
			data,
			...axiosConfig,
		};

		if (method !== "GET" && data !== undefined) {
			config.data = data;
		}

		const response = await axios.request<TResponse>(config);
		return response.data;
	};

	return useMutation<TResponse, Error, TBody, unknown>({
		mutationKey: Array.isArray(key) ? key : [key],
		mutationFn,
		...options,
	});
}
