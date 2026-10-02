import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

type useGetAllEmployeesByOwner = {
  businessOwnerId: number;
  isEnabled: boolean;
};

export const useGetAllEmployeesByOwner = ({
  businessOwnerId,
  isEnabled = true,
}: useGetAllEmployeesByOwner) => {
  const doRequest = () =>
    axios
      .get<
        BusinessEmployee[]
      >(`/api/protected/businesses/owner/${businessOwnerId}/employees`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["employees", businessOwnerId],
    queryFn: doRequest,
    enabled: isEnabled,
  });
};

type FetchBusinessEmployeesType = {
  pageParam: number;
  businessOwnerId: number | undefined;
};

const fetchBusinessEmployees = async ({
  pageParam,
  businessOwnerId,
}: FetchBusinessEmployeesType) => {
  const { data } = await axios.get<PaginatedData<BusinessEmployee>>(
    `/api/protected/businesses/owner/${businessOwnerId}/employees?page=${pageParam}&limit=10`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteEmployees = (businessOwnerId?: number) => {
  return useInfiniteQuery({
    queryKey: ["business-employees", businessOwnerId],
    queryFn: ({ pageParam = 1 }) =>
      fetchBusinessEmployees({ pageParam, businessOwnerId }),
    initialPageParam: 1,
    enabled: !!businessOwnerId,
    staleTime: 2 * 60 * 1000, // 5 minutes
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
