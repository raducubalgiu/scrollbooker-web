import { DashboardBooking } from "@/ts/models/dashboard/DashboardBooking";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DASHBOARD_PATH = "/api/protected/dashboard";

export type GetDashboardBookingsParams = {
  startDate: string;
  endDate: string;
};

export const useGetDashboardBookings = ({
  startDate,
  endDate,
}: GetDashboardBookingsParams) => {
  const doRequest = () =>
    axios
      .get<DashboardBooking>(
        `${DASHBOARD_PATH}?start_date=${startDate}&end_date=${endDate}`
      )
      .then((response) => response.data);

  return useQuery({
    queryKey: ["dashboard-bookings", startDate, endDate],
    queryFn: doRequest,
    enabled: Boolean(startDate && endDate),
  });
};
