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
      url: "/api/appointments/block",
      options: {
        onSuccess: async () => {
          onBlockSuccess();
        },
      },
    });

  const { mutate: handleOwnClient, isPending: isLoadingOwnClient } =
    useMutate<AppointmentOwnClientCreate>({
      key: ["own-client-appointments"],
      url: "/api/appointments/own-client",
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
