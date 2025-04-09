import { AxiosResponse } from "axios";
import { Instance } from "../lib/instance";

type BaseRequestParams = {
	url: string;
};

export type GetRequestParams = BaseRequestParams;

export type PostRequestParams<T> = BaseRequestParams & {
	data: T;
};

export type PutRequestParams<T> = BaseRequestParams & {
	data: T;
};

export type DeleteRequestParams = BaseRequestParams;

export const get = async <T>({
	url,
}: GetRequestParams): Promise<AxiosResponse<T>> =>
	Instance().then(instance => instance.get(url));

export const post = async <T, K>({
	url,
	data,
}: PostRequestParams<T>): Promise<AxiosResponse<K>> =>
	Instance().then(instance => instance.post(url, data));

export const put = async <T, K>({
	url,
	data,
}: PutRequestParams<T>): Promise<AxiosResponse<K>> =>
	Instance().then(instance => instance.put(url, data));

export const deleteRequest = async <T>({
	url,
}: DeleteRequestParams): Promise<AxiosResponse<T>> =>
	Instance().then(instance => instance.delete(url));
