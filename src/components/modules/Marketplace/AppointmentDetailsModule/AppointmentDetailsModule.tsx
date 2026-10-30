"use client";

import React from "react";
import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import AppointmentDetailsContent from "./AppointmentDetailsContent";

type AppointmentDetailsModuleProps = {
  appointment: Appointment;
};

const AppointmentDetailsModule = ({ appointment }: AppointmentDetailsModuleProps) => {
  return (
    <MainLayout showHeader={false} title="Detalii rezervare">
      <AppointmentDetailsContent appointment={appointment} />
    </MainLayout>
  );
};

export default AppointmentDetailsModule;
