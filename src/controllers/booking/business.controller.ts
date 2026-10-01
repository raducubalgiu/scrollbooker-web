import { BusinessDetails } from "@/ts/models/booking/business/BusinessDetails";
import { BusinessAddress } from "@/ts/models/booking/business/BusinessAddress";
import { UnapprovedBusinessResponse } from "@/ts/models/booking/business/UnapprovedBusinessResponse";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const BUSINESS_PATH = "/api/protected/businesses";
const UNAPPROVED_BUSINESSES_LIMIT = 20;

type PaginatedResponse<T> = {
  count: number;
  results: T[];
};

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

// Oglindește searchBusinessAddress din iOS (BusinessApiService) — backend-ul
// e endpoint-ul Google Places (/places, min_length=2 pe query), nu unul sub
// /businesses, dar îl ținem aici ca și pe iOS: e folosit doar din fluxul de
// colectare a adresei unui business, nu dintr-un context de căutare generică.
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
