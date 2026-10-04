import { PaginatedData } from "@/components/core/Table/Table";
import {
  Appointment,
  AppointmentCancel,
} from "@/ts/models/booking/appointment/Appointment";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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

interface CancelAppointmentParams {
  appointmentId: number;
  payload: AppointmentCancel;
}

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  const doRequest = ({
    appointmentId,
    payload,
  }: CancelAppointmentParams): Promise<Appointment> =>
    axios
      .put<Appointment>(
        `${APPOINTMENTS_PATH}/${appointmentId}/cancel-appointment`,
        payload
      )
      .then((response) => response.data);

  return useMutation<Appointment, Error, CancelAppointmentParams>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments-me"] });
    },
  });
};
