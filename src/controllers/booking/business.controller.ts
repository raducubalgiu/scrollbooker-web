import { BusinessDetails } from "@/ts/models/booking/business/BusinessDetails";
import { BusinessAddress } from "@/ts/models/booking/business/BusinessAddress";
import { UnapprovedBusinessResponse } from "@/ts/models/booking/business/UnapprovedBusinessResponse";
import { BusinessMarker } from "@/ts/models/booking/business/search/BusinessMarker";
import { BusinessSheet } from "@/ts/models/booking/business/search/BusinessSheet";
import { BusinessMapRequest } from "@/ts/models/booking/business/search/BusinessMapCombined";
import type { SearchState } from "@/components/modules/Marketplace/SearchModule/SearchModule";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const BUSINESS_PATH = "/api/protected/businesses";
const UNAPPROVED_BUSINESSES_LIMIT = 20;
const BUSINESS_LOCATIONS_LIMIT = 10;

type PaginatedResponse<T> = {
  count: number;
  results: T[];
};

const buildMapRequest = (searchState: SearchState): BusinessMapRequest => ({
  bbox: searchState.bbox!,
  zoom: searchState.zoom ?? 12,
  max_markers: 400,
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
  user_location: searchState.userLocation,
});

export const useGetMyBusinessDetails = () => {
  const doRequest = () =>
    axios
      .get<BusinessDetails>(`${BUSINESS_PATH}/my-business-details`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["my-business-details"],
    queryFn: doRequest,
  });
};

export const useGetUnapprovedBusinesses = () => {
  return useInfiniteQuery({
    queryKey: ["unapproved-businesses"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<
        PaginatedResponse<UnapprovedBusinessResponse>
      >(`${BUSINESS_PATH}/unapproved-businesses`, {
        params: { page: pageParam, limit: UNAPPROVED_BUSINESSES_LIMIT },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((page) => page.results).length;
      return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};

export const useApproveBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      await axios.post(`/api/protected/users/${userId}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unapproved-businesses"] });
    },
  });
};

export const useGetBusinessMarkers = (searchState: SearchState) => {
  return useQuery({
    queryKey: [
      "business-markers",
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
      searchState.sort,
      searchState.userLocation?.lat,
      searchState.userLocation?.lng,
    ],
    queryFn: async () => {
      const response = await axios.post<BusinessMarker[]>(
        `${BUSINESS_PATH}/markers`,
        buildMapRequest(searchState)
      );
      return response.data;
    },
    enabled: !!searchState.bbox,
  });
};

export const useGetBusinessLocations = (searchState: SearchState) => {
  return useInfiniteQuery({
    queryKey: ["business-locations", searchState],
    queryFn: async ({ pageParam }) => {
      const response = await axios.post<PaginatedResponse<BusinessSheet>>(
        `${BUSINESS_PATH}/locations`,
        buildMapRequest(searchState),
        { params: { page: pageParam, limit: BUSINESS_LOCATIONS_LIMIT } }
      );
      return { ...response.data, page: pageParam };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.flatMap((page) => page.results).length;
      return totalFetched < lastPage.count ? lastPage.page + 1 : undefined;
    },
    enabled: !!searchState.bbox,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useSearchBusinessAddress = (query: string) => {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ["business-address", trimmed],
    queryFn: async () => {
      const response = await axios.get<BusinessAddress[]>(
        "/api/protected/places",
        { params: { query: trimmed } }
      );
      return response.data;
    },
    enabled: trimmed.length >= 2,
    staleTime: 10000 * 60,
  });
};

interface UpdateBusinessGalleryParams {
  businessId: string | number;
  photos: File[];
  existingThumbnailUrls: string[];
}

export const useUpdateBusinessGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      businessId,
      photos,
      existingThumbnailUrls,
    }: UpdateBusinessGalleryParams): Promise<void> => {
      if (!businessId) throw new Error("Business ID este obligatoriu.");

      const formData = new FormData();
      photos.forEach((photo) => formData.append("photos", photo));

      formData.append("existing_urls", JSON.stringify(existingThumbnailUrls));

      await axios.patch(`${BUSINESS_PATH}/${businessId}/gallery`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-business-details"] });
    },
  });
};
