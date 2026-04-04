import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { SearchState } from "@/components/modules/Marketplace/SearchModule/SearchModule";

const fetchMarkers = async (searchState: SearchState) => {
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
  };

  const { data } = await axios.post("/api/businesses/markers", payload);
  return data;
};

export const useBusinessMarkers = (searchState: SearchState) => {
  return useQuery({
    queryKey: [
      "businessMarkers",
      searchState.businessDomainId,
      searchState.serviceDomainId,
      searchState.serviceId,
      searchState.subfilterIds.join(","),
      searchState.startDate,
      searchState.startTime,
      searchState.endTime,
      searchState.hasDiscount,
      searchState.maxPrice,
      searchState.zoom,
      searchState.bbox?.min_lng,
      searchState.bbox?.min_lat,
      searchState.bbox?.max_lng,
      searchState.bbox?.max_lat,
    ],
    queryFn: () => fetchMarkers(searchState),
    enabled: !!searchState.bbox,
  });
};
