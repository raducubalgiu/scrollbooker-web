import { Instance } from "../lib/instance";

import { AxiosResponse } from "axios";

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

export type PatchRequestParams<T> = BaseRequestParams & {
  data: T;
};

export type DeleteRequestParams = BaseRequestParams;

export const get = async <T>({
  url,
}: GetRequestParams): Promise<AxiosResponse<T>> => {
  const instance = await Instance();
  return instance.get<T>(url);
};

export const post = async <T, K>({
  url,
  data,
}: PostRequestParams<T>): Promise<AxiosResponse<K>> => {
  const instance = await Instance();
  return instance.post<K>(url, data);
};

export const put = async <T, K>({
  url,
  data,
}: PutRequestParams<T>): Promise<AxiosResponse<K>> => {
  const instance = await Instance();
  return instance.put<K>(url, data);
};

export const patch = async <T, K>({
  url,
  data,
}: PatchRequestParams<T>): Promise<AxiosResponse<K>> => {
  const instance = await Instance();
  return instance.patch<K>(url, data);
};

export const deleteRequest = async <T>({
  url,
}: DeleteRequestParams): Promise<AxiosResponse<T>> => {
  const instance = await Instance();
  return instance.delete<T>(url);
};
