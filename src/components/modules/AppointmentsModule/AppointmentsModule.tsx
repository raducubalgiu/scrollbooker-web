"use client";

import { PaginatedData } from "@/components/core/Table/Table";
import { useCustomQuery } from "@/hooks/useHttp";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";
import React from "react";
import AppointmentItem from "./AppointmentItem";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

const AppointmentsModule = () => {
  const { data, isLoading } = useCustomQuery<
    PaginatedData<AppointmentResponse>
  >({
    key: ["appointments"],
    url: "/api/appointments",
    params: { page: 1, limit: 10, asCustomer: true },
  });

  console.log("Appointments data:", data);

  return (
    <MainLayout title="Programările mele" hideAction>
      {isLoading && <p>Loading...</p>}
      {data && (
        <>
          {data.results?.map((appointment) => (
            <AppointmentItem key={appointment.id} appointment={appointment} />
          ))}
        </>
      )}
    </MainLayout>
  );
};

export default AppointmentsModule;
