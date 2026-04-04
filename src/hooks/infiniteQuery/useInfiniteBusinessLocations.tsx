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
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((p) => p.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
