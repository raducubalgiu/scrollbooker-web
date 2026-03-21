import Modal from "@/components/core/Modal/Modal";
import { useCustomQuery } from "@/hooks/useHttp";
import { ScheduleResponse } from "@/ts/models/booking/schedule/ScheduleType";
import React from "react";

type ScheduleModalProps = {
  open: boolean;
  userId: number;
  handleClose: () => void;
};

const ScheduleModal = ({ userId, open, handleClose }: ScheduleModalProps) => {
  const { data, isLoading } = useCustomQuery<ScheduleResponse>({
    url: `/api/schedules?userId=${userId}`,
    key: ["user-schedule", userId],
    options: {
      enabled: open,
    },
  });

  return (
    <Modal open={open} handleClose={handleClose} title="Programul de lucru">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data?.map((schedule) => (
            <li key={schedule.id}>
              {schedule.day_of_week}: {schedule.start_time} -{" "}
              {schedule.end_time}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default ScheduleModal;
