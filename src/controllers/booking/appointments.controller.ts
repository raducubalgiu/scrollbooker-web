import { PaginatedData } from "@/components/core/Table/Table";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const APPOINTMENTS_PATH = "/api/protected/appointments";

const fetchAppointments = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get<PaginatedData<Appointment>>(
    `${APPOINTMENTS_PATH}/me?page=${pageParam}&limit=10`
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
      return lastPage.page + 1;
    },
  });
};
