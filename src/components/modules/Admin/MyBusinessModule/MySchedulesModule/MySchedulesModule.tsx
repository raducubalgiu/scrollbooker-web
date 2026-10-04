"use client";

import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { SchedulesForm } from "./SchedulesForm";

type SchedulesProps = { data: Schedule[] };

export default function MySchedulesModule({ data }: SchedulesProps) {
  return (
    <MainLayout
      title="Programul de lucru"
      hideAction
      sx={{ bgcolor: "background.paper", height: "100%" }}
    >
      <SchedulesForm initialSchedules={data} />
    </MainLayout>
  );
}
