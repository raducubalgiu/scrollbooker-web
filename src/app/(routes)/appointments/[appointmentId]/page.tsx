import AppointmentDetailsModule from "@/components/modules/Marketplace/AppointmentDetailsModule/AppointmentDetailsModule";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { get } from "@/utils/requests";
import React from "react";

interface AppointmentPageProps {
  params: {
    appointmentId: string;
  };
}

export default async function AppointmentPage({
  params,
}: AppointmentPageProps) {
  const appointmentId = Number(params.appointmentId);

  if (Number.isNaN(appointmentId)) {
    return <div>Invalid params</div>;
  }

  const appointment = (
    await get<Appointment>({
      url: `/appointments/${appointmentId}`,
    })
  ).data;

  if (!appointment) {
    return <>Not Found</>;
  }

  return <AppointmentDetailsModule appointment={appointment} />;
}
