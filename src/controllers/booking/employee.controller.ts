import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { useQuery } from "@tanstack/react-query";
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
