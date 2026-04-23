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

  return <>{appointmentId}</>;
}
