import { BusinessDetails } from "@/ts/models/booking/business/BusinessDetails";
import { BusinessAddress } from "@/ts/models/booking/business/BusinessAddress";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BUSINESS_PATH = "/api/protected/businesses";

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
