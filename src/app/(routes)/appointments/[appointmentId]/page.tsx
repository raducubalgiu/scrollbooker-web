import AppointmentDetailsModule from "@/components/modules/Marketplace/AppointmentDetailsModule/AppointmentDetailsModule";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { get } from "@/utils/requests";
import React from "react";

interface AppointmentPageProps {
  params: Promise<{
    appointmentId: string;
  }>;
}

export default async function AppointmentPage({
  params,
}: AppointmentPageProps) {
  const { appointmentId } = await params;

  if (!appointmentId) {
    throw new Error("Appointment Id is invalid");
  }

  const appointment = (
    await get<Appointment>({
      url: `/appointments/${appointmentId}`,
    })
  ).data;

  if (!appointment) {
    throw new Error("An error occured when fetching appointment");
  }

  return <AppointmentDetailsModule appointment={appointment} />;
}
