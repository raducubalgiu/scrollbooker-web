import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 10;

type FetchBusinessEmployeesType = {
  pageParam: number;
  businessOwnerId: number | undefined;
};

const fetchBusinessEmployees = async ({
  pageParam,
  businessOwnerId,
}: FetchBusinessEmployeesType) => {
  const { data } = await axios.get<PaginatedData<BusinessEmployee>>(
    `/api/employees?businessOwnerId=${businessOwnerId}&page=${pageParam}&limit=${PAGE_LIMIT}`
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
