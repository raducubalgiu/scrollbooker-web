import { PaginatedData } from "@/components/core/Table/Table";
import { SearchState } from "@/components/modules/Marketplace/SearchModule/SearchModule";
import { BusinessSheet } from "@/ts/models/booking/business/search/BusinessSheet";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 10;

const fetchLocations = async ({
  pageParam,
  searchState,
}: {
  pageParam: number;
  searchState: SearchState;
}) => {
  const {
    bbox,
    zoom,
    businessDomainId,
    serviceDomainId,
    serviceId,
    subfilterIds,
    startDate,
    startTime,
    endTime,
    hasDiscount,
    maxPrice,
  } = searchState || {};
  const { data } = await axios.get<PaginatedData<BusinessSheet>>(
    `/api/businesses/locations?zoom=${zoom}&businessDomain=${businessDomainId}&serviceDomain=${serviceDomainId}&service=${serviceId}&subfilterIds=${subfilterIds.join(",")}&startDate=${startDate}&startTime=${startTime}&endTime=${endTime}&hasDiscount=${hasDiscount}&maxPrice=${maxPrice}&page=${pageParam}&limit=${PAGE_LIMIT}`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteBusinessLocations = (searchState: SearchState) => {
  return useInfiniteQuery({
    queryKey: ["businessLocations", searchState],
    queryFn: ({ pageParam = 1 }) => fetchLocations({ pageParam, searchState }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
