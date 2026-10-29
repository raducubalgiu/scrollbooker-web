"use client";

import { useMutate } from "@/hooks/useHttp";
import {
  AppointmentBlockCreate,
  AppointmentOwnClientCreate,
} from "@/ts/models/booking/appointment/Appointment";

type UseCalendarAppointmentMutationsParams = {
  onBlockSuccess: () => void;
  onOwnClientSuccess: () => void;
};

export const useCalendarAppointmentMutations = ({
  onBlockSuccess,
  onOwnClientSuccess,
}: UseCalendarAppointmentMutationsParams) => {
  const { mutate: handleBlock, isPending: isLoadingBlock } =
    useMutate<AppointmentBlockCreate>({
      key: ["block-appointments"],
      url: "/api/protected/appointments/create-block-appointments",
      options: {
        onSuccess: async () => {
          onBlockSuccess();
        },
      },
    });

  const { mutate: handleOwnClient, isPending: isLoadingOwnClient } =
    useMutate<AppointmentOwnClientCreate>({
      key: ["own-client-appointments"],
      url: "/api/protected/appointments/create-own-client-appointment",
      options: {
        onSuccess: async () => {
          onOwnClientSuccess();
        },
      },
    });

  return {
    handleBlock,
    isLoadingBlock,
    handleOwnClient,
    isLoadingOwnClient,
  };
};
