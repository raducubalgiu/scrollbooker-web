import { BusinessDetails } from "@/ts/models/booking/business/BusinessDetails";
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
