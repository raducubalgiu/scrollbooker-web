import { PaginatedData } from "@/components/core/Table/Table";
import { SearchState } from "@/components/modules/Marketplace/SearchModule/SearchModule";
import { BusinessSheet } from "@/ts/models/booking/business/search/BusinessSheet";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LIMIT = 10;

type FetchLocationsArgs = {
  pageParam: number;
  searchState: SearchState;
};

const fetchLocations = async ({
  pageParam,
  searchState,
}: FetchLocationsArgs) => {
  const payload = {
    bbox: searchState.bbox,
    zoom: searchState.zoom,
    business_domain_id: searchState.businessDomainId,
    service_domain_id: searchState.serviceDomainId,
    service_id: searchState.serviceId,
    subfilter_ids: searchState.subfilterIds,
    start_date: searchState.startDate,
    start_time: searchState.startTime,
    end_time: searchState.endTime,
    has_discount: searchState.hasDiscount,
    max_price: searchState.maxPrice,
    sort: searchState.sort,
    page: pageParam,
    limit: PAGE_LIMIT,
  };

  const { data } = await axios.post<PaginatedData<BusinessSheet>>(
    "/api/businesses/locations",
    payload
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
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, p) => sum + (p.results?.length || 0),
        0
      );
      return totalFetched < (lastPage.count || 0)
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};
