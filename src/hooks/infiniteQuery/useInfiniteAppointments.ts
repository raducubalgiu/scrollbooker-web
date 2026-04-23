import { PaginatedData } from "@/components/core/Table/Table";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAppointments = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Appointment>>(
    `/api/appointments/me?page=${pageParam}&limit=10`
  );
  return {
    ...data,
    page: pageParam,
  };
};

export const useInfiniteAppointments = () => {
  return useInfiniteQuery({
    queryKey: ["appointments-me"],
    queryFn: fetchAppointments,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.results.length < 10) return undefined;

      // Altfel, returnăm numărul paginii următoare
      return lastPage.page + 1;
      // const totalFetched = pages.flatMap((p) => p.results).length;
      // return totalFetched < lastPage.count ? pages.length + 1 : undefined;
    },
  });
};
